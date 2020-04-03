<template>
	<b-form>
		<b-form-group label="Choisisser une couleur:" label-for="bg-color">
			<input id="bg-color" type="color" required class="w-25 form-control" v-model="background" />
		</b-form-group>
		<b-button type="button" v-on:click="onSubmit()" variant="primary">
			<b-spinner ref="spinner" small type="grow"></b-spinner>Sauvegarder
		</b-button>
	</b-form>
</template>
<script>
import options from "../../../options.env";
export default {
	props: {
		apiToken: String,
		color: String
	},
	data() {
		return {
			background: this.color
		};
	},
	methods: {
		// Lors du form submit
		onSubmit: function() {
			// on affiche le loader dans le bouton
			this.$refs["spinner"].style.display = "inline-block";

			// On créé le body de la requête
			const formData = new FormData();
			formData.append("color", this.background.toString());
			formData.append(
				"veille",
				this.$route.fullPath.includes("veille").toString()
			);

			// On fait la requête
			fetch(options.API_BACKGROUND_URL, {
				method: "POST",
				headers: {
					"X-Auth-Token": this.apiToken
				},
				body: formData
			})
				.then(results => results.json())
				.then(data => {
					if (typeof data.erreur !== "undefined") {
						// En cas d'erreur on fait une alerte
						alert(data.erreur);
					} else {
						// Sinon on déclenche les évenements suite à la reception
						this.$emit("backgroundUpdated", data);
						this.$emit("closeModal", true);
					}
					// On enlève le loader
					this.$refs["spinner"].style.display = "";
				})
				.catch(function(err) {
					alert(err);
				});
		}
	}
};
</script>