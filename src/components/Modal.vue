<template>
  <b-modal ref="modal" id="modal" hide-footer @hidden="closeModal()">
    <b-nav v-if="navs" class="mb-3" tabs fill>
      <b-nav-item :active="choice1.active" :to="choice1.url">{{ choice1.name }}</b-nav-item>
      <b-nav-item :active="choice2.active" :to="choice2.url">{{ choice2.name }}</b-nav-item>
    </b-nav>
    <router-view 
      :apiToken="apiToken"
      :windows="windows"
      :tempsVeille="tempsVeille"
      :color="bg"
      @closeModal="closeModal()"
      @windowAdded="windowAdded($event)"
      @backgroundUpdated="backgroundUpdated($event)"
      @tempsVeilleUpdated="tempsVeilleUpdated($event)"
    ></router-view>
  </b-modal>
</template>
<script>
export default {
  props:{
    apiToken: String,
    windows: Array,
    bg: String,
    tempsVeille: Array
  },
  data() {
    return {
      navs: false,
      choice1: {
        title: '',
        url: '',
        active: false
      },
      choice2: {
        title: '',
        url: '',
        active: false
      },
    }
  },
  methods: {
    closeModal: function () {
      if(this.$route.fullPath.includes('veille')){
        this.$router.push('/edit/veille');
      }else{
        this.$router.push('/edit/home');
      }
      
      this.$refs['modal'].hide()
    },
    // Déclenche un évenement d'ajout de fenêtre
		windowAdded: function(window) {
			this.$emit("windowAdded", window);
    },
    // Déclenche un évenement de mise à jour du fond d'écran
    backgroundUpdated: function (background) {
      this.$emit('backgroundUpdated', background)
    },
    tempsVeilleUpdated: function (temps) {
      this.$emit("tempsVeilleUpdated", temps);
    }
  },
  // Avant la mise à jour du Composant, affiche le bon header en fonction de la modale affichée
	beforeUpdate: function() {
		if (this.$route.fullPath.includes("/modal/edit-color")) {
			this.navs = true;
			this.choice1 = {
				name: "Couleur",
				url: { name: "EditColor", params: { color: this.bg } },
				active: true
			};
			this.choice2 = {
				name: "Fond d'écran",
				url: "edit-picture",
				active: false
			};
		} else if (this.$route.fullPath.includes("/modal/edit-picture")) {
			this.navs = true;
			this.choice1 = {
				name: "Couleur",
				url: { name: "EditColor", params: { color: this.bg } },
				active: false
			};
			this.choice2 = {
				name: "Fond d'écran",
				url: "edit-picture",
				active: true
			};
		} else if (this.$route.fullPath.includes("/modal/add-window")) {
			this.navs = true;
			this.choice1 = {
				name: "Fenêtre simple",
				url: "add-window",
				active: true
			};
			this.choice2 = {
				name: "Fenêtre Youtube",
				url: "add-yt-window",
				active: false
			};
		} else if (this.$route.fullPath.includes("/modal/add-yt-window")) {
			this.navs = true;
			this.choice1 = {
				name: "Fenêtre simple",
				url: "add-window",
				active: false
			};
			this.choice2 = {
				name: "Fenêtre Youtube",
				url: "add-yt-window",
				active: true
			};
		} else {
			this.navs = false;
			this.choice1 = { name: "", url: "", active: false };
			this.choice2 = { name: "", url: "", active: false };
		}
	}
};
</script>