<template>
	<div>
		<iframe :src="url" frameborder="0"></iframe>
		<router-link class="btn btn-primary" :to="urlRetour">Retour</router-link>
	</div>
</template>
<script>
	export default {
		name: "Fullscreen",
		props: {
			url: String,
			editMode: Boolean,
			typeWindow: Boolean
		},
		data() {
			return {
				urlRetour: ''
			}
		},
		mounted: function() {
			this.choixUrl();
		},
		methods: {
			choixUrl: function () {
				if (this.editMode) {
					if (this.typeWindow) {
						this.urlRetour = '/edit/veille'
					} else {
						this.urlRetour = '/edit/home'
					}
				} else {
					this.urlRetour = '/home'
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	iframe {
		width: 100vw;
		height: 100vh;
	}
	a {
		position: absolute;
		top: 15px;
		left: 15px;
	}
</style>