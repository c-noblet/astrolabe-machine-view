<template>
	<section>
		<div ref="container" class="screen" :style="'background:'+background">

			<CircleButton :setBackground="setBackground"/>

			<b-modal ref="edit-modal-veille" id="edit-modal-veille" hide-footer>
				<b-form>
					<b-form-group
					label="Couleur"
					label-for="edit-color">
						<b-form-input
						id="edit-color"
						v-model="modal.color"
						type="text"
						required
						placeholder="Entrer la couleur de fond"
						></b-form-input>
					</b-form-group>

					<b-form-group
					label="Entrez l'URL:"
					label-for="edit-url">
						<b-form-input
						id="edit-url"
						v-model="modal.url"
						type="text"
						required
						placeholder="Entrer l'URL"
						></b-form-input>
					</b-form-group>

					<b-button type="button" class="mr-3" v-on:click="onSubmit(modal.id)" variant="primary">Sauvegarder la couleur </b-button>
				</b-form>
			</b-modal>
		</div>
		<div ref="loader" class="loader">
			<div>
				<b-spinner class="text-primary" style="width: 15rem; height: 15rem;" label="Large Spinner"></b-spinner>
			</div>
		</div>
	</section>
</template>
<script>
	import options from '../../options.env'
	import CircleButton from './CircleButton'
	export default {
		name: 'Veille',
		data(){
			return{
				background: 'rgb(25,45,70)',
				modal: {
					id: Number,
					url: String
				},
			}
		},
		mounted: function () {
			this.getBackground()
		},
		methods: {
			showApp: function () {
				this.$refs['container'].style.display = 'block'
				this.$refs['loader'].style.display = 'none'
			},
			setBackground: function (background) {
				if(background == null){
					console.log('error')
				}else{
					if (background.picture != null) {
						let picUrl = background.picture.webkitRelativePath + background.picture.name
						this.background = "url('"+picUrl+"')"
						console.log(this.background)
					} else {
						const formData = new FormData();
						formData.append('color', background)
						fetch(options.API_BACKGROUND_URL, {
							method: 'PUT',
							body: formData
						})
						.then((results) => results.json())
						.then((data) => {
							console.log(data)
							this.background = data.color
						})
					}
				}
			},
			getBackground: function () {
				fetch(options.API_BACKGROUND_URL)
				.then((results) => results.json())
				.then(data => {
					if(data.color){
						this.background = data.color
					}else{
						this.background = "url('"+data.image+"')"
					}
				})
			},
			iframeState: function (id) {
				let win = this.windows.find(x => x.id === id)
				this.promiseArray.push(win.loaded)
				if(this.promiseArray.length === this.windows.length){
					Promise.all(this.promiseArray).then(this.showApp())
					}
			},
			onSubmit: function () {
				const formData = new FormData();
				formData.append('color', this.modal.color)
				formData.append('url', this.modal.url)
				console.log(formData)
				fetch(options.API_VEILLE, {
					method: 'POST',
					body: formData
				})
				.then((results) => results.json())
				.then(data => {
					if(typeof data.erreur !== 'undefined'){
						alert(data.erreur)
					}
				}).catch(function(err){
					alert(err)
				})
			}
		},
		components: {
			CircleButton
		}
	}
</script>
<style lang="scss">

</style>
