<template>
	<div
		:ref="'window-'+window.id"
		class="window"
		:style="'width:'+window.width+'%;height:'+window.height+'%;left:'+window.posX+'%;top:'+window.posY+'%'"
	>
		<div>
			<iframe
				v-show="window.youtube"
				:src="'https://www.youtube.com/embed/'+playlistUrl+window.url+autoplay"
				frameborder="0"
				allow="autoplay; encrypted-media; picture-in-picture"
				allowfullscreen
			></iframe>
			<iframe v-show="!window.youtube" :src="window.url" frameborder="0"></iframe>
			<router-link
				v-show="!window.youtube"
				class="fullscreen"
        :editMode="editMode"
				:to="{ name: 'Fullscreen', params: { url: window.url, typeWindow: window.veille }}"
			></router-link>
			<router-link
				class="btn btn-warning"
				v-show="editMode"
				:to="{ name: 'EditWindow', params: { windowId: window.id.toString()}}"
				squared
				v-b-modal.modal
			>Modifier</router-link>
		</div>
	</div>
</template>
<script>
export default {
	name: "Window",
	props: {
		window: Object,
		editMode: Boolean,
    typeWindow: Boolean
	},
	data() {
		return {
			playlistUrl: "",
			autoplay: "?autoplay=1",
			veilleUrl: ""
		};
  },
  // Lors de la création du Composant
	created: function() {
		if (this.window.playlist) {
      // Si la fenêtre doit afficher une playlist YouTube
			this.playlistUrl = "videoseries?list=";
			this.autoplay = "&autoplay=1";
		}
		if (this.$route.fullPath.includes("veille")) {
      // Si on est mode veille on change les liens
			this.veilleUrl = "Veille";
		}
	}
};
</script>
<style lang="scss" scoped>
	.window {
		position: absolute;
		& iframe {
			width: 100%;
			height: 100%;
		}
		& div {
			position: relative;
			width: 100%;
			height: 100%;
		}
		& .btn {
			position: absolute;
			top: 0;
			right: 0;
			border-radius: 0 !important;
		}
		& .fullscreen {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
	}
</style>
