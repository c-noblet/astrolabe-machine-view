<template>
	<section :style="'background:'+background" v-on:click="activite">
		<div ref="container" class="screen">
			<ul>
				<li v-for="(item) in windows" :key="item.id">
					<Window 
						:window="item" 
						:editMode="editMode" 
						@iframeLoaded="iframesState($event)" 
					/>
				</li>
			</ul>
			<CircleButton
				v-if="editMode"
				:bg="background"
				:editMode="editMode"
				@openModal="modalName = $event"
			/>
			<Modal
				:apiToken="apiToken"
				:windows="windows"
				:bg="background"
				:tempsVeille="tempsVeille"
				@windowAdded="pushNewWindow($event)"
				@backgroundUpdated="reloadBackground($event)"
				@tempsVeilleUpdated="tempsVeilleUpdated($event)"
			/>
		</div>
	</section>
</template>
<script>
import options from "../../options.env";
import Window from "./Window";
import CircleButton from "./CircleButton";
import Modal from "./Modal";
export default {
	name: "Veille",
	props: {
		editMode: Boolean,
		state: Boolean,
		apiToken: String,
		tempsVeille: Array,
	},
	
	data() {
		return {
			background: "",
			windows: []
		};
	},
	// Lors de la création du DOM
	mounted: function() {
		// On récupère le fond d'écran
		this.getBackground();
		// On récupère les fenêtres
		this.getWindows();
	},
	methods: {
		// Ajoute une fenêtre dans la listes locales de fenêtres
		pushNewWindow(window) {
			this.windows.push(window);
		},
		// Recharge le fond d'écran
		reloadBackground: function(background) {
			if (typeof background === "string") {
				document.location.reload();
			} else {
				this.background = background.color;
			}
		},
		// Récupère le fond d'écran
		getBackground: function() {
			fetch(options.API_BACKGROUND_VEILLE_URL)
				.then(results => results.json())
				.then(data => {
					if (data.color) {
						this.background = data.color;
					}
				})
				.catch(() => {
					this.background =	"url('" +	options.API_BACKGROUND_VEILLE_URL + "');background-position:center;background-size:100% 100%;background-repeat:no-repeat;";
				});
		},
		// Récupère les fenêtres
		getWindows: function() {
			fetch(options.API_VEILLE_URL)
				.then(results => results.json())
				.then(data => {
					if (typeof data.erreur !== "undefined") {
						alert(data.erreur);
					} else {
						this.windows = data;
					}
				})
				.catch(function(err) {
					alert(err);
				});
		},
		activite: function () {
			if (this.$route.fullPath.includes('/veille') && !this.$route.fullPath.includes('/edit')){ 
				//on ne fait pas un push normal car la function lancementBoucleVeille() ne sera pas appeler
				document.location.href = "/home"
			}
		},
		/*calculPosAutreWindows: function(laWindow) {
			for (let index in this.windows ){

				if ( this.windows[index] !== laWindow) {

					let laWindowTop = laWindow.posY
					let laWindowBottom = laWindow.posY + laWindow.height
					let itemTop = this.windows[index].posY
					let itemBottom = this.windows[index].posY + this.windows[index].height
					let orientationH = null 

					// Définie le côté de la window non modifié à adapter
					if (laWindow.posX < this.windows[index].posX) {
						orientationH = "left";
					} else {
						orientationH = "right";
					}

					// Si la fenêtre modifié passe par sa droite sur une fenêtre non modifié
					if (
						this.windows[index].posX + this.windows[index].width >=
						laWindow.posX
					) {
						// Si les traits horizontaux des fenêtres sont en conflits sur la même ligne
						if (itemTop < laWindowBottom && itemBottom > laWindowTop) {
							// Alors on modifie la taille la fenêtre non modifié
							this.windows[index].width = 100 - laWindow.width;
							// Si la fenêtre non modifié est à gauche
							if (orientationH === "left") {
								// On redéfinie sa position
								this.windows[index].posX = laWindow.width + laWindow.posX;
							} else {
								// On redéfinie sa position sa position afin de s'aligner avec la fenêtre modifié
								laWindow.posX = 100 - laWindow.width;
							}
						}
					}
				}
			}
		}*/
	},
	components: {
		Window,
		CircleButton,
		Modal
	}
};
</script>
<style lang="scss">
</style>
