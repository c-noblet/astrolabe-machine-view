<template>
	<div>
		<iframe :src="url" frameborder="0"></iframe>
		<router-link :to="'/'+url1+url2"><font-awesome-icon size="3x" icon="arrow-left" /></router-link>
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
				url1: '',
				url2: '',
			}
		},
		mounted: function() {
			if(this.$route.fullPath.includes('edit')){
				this.url1 = 'edit/'
			}else{
				this.url1 = ''
			}
			if(this.$route.fullPath.includes('home')){
				this.url2 = 'home/'
			}else{
				this.url2 = 'veille'
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
		color: rgba(#000, 0.5)
	}
</style>