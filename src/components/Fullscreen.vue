<template>
	<div>
		<iframe v-if="!yt" :src="url" frameborder="0"></iframe>
		<iframe
			v-if="yt"
			:src="'https://www.youtube.com/embed/'+playlistUrl+url+autoplay"
			frameborder="0"
			allow="autoplay; encrypted-media; picture-in-picture"
			allowfullscreen
		></iframe>
		<div v-if="yt" class="fullscreen"></div>
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
				yt: true,
				playlistUrl: "",
				autoplay: "?autoplay=1",
			}
		},
		created: function () {
			if (this.window.playlist) {
				// Si la fenêtre doit afficher une playlist YouTube
				this.playlistUrl = "videoseries?list=";
				this.autoplay = "&autoplay=1";
			}
		},
		mounted: function() {
			if(this.url.includes('://')){
				this.yt = false;
			}
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
		color: rgba(#3f51b5, 0.9);
		z-index: 99;
	}
	.fullscreen {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
</style>