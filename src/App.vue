<template>
  <div id="app" 
    v-on:click="activite_detectee=true" 
    v-on:mousemove="activite_detectee=true"
  >
    <router-view
      :editMode="editMode"
      :state="state"
      :apiToken="apiToken"
    ></router-view>
    <b-modal ref="loginModal" id="loginModal" title="Modal with Popover" hide-footer>
      <b-form>
        <b-form-group
          label="Nom d'utilisateur:"
          label-for="input-username"
        >
          <b-form-input
            id="input-username"
            v-model="form.username"
            required
            placeholder="Nom d'utilisateur"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Mot de passe:" label-for="input-password">
          <b-form-input
            id="input-password"
            type="password"
            v-model="form.password"
            required
            placeholder="Mot de passe"
          ></b-form-input>
        </b-form-group>

        <b-button @click="onSubmit" variant="primary">Se connecter</b-button>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editMode: false,
      state: true,
      apiToken: '',
      activite_detectee: false,
      intervalle: 10000,
      form: {
        username: '',
        password: ''
      }
    }
  },
   mounted: function () {
    if(this.$route.fullPath.includes('/edit')){
      if(this.readCookie('apiToken') !== ''){
        this.editMode = true
        this.apiToken = this.readCookie('apiToken').toString()
        console.log('cookie',this.apiToken)
      }else{
        this.$refs['loginModal'].show()
      }
    }

    // On lance la fonction testerActivite() pour la première fois, au chargement de la page
    if (this.$route.fullPath.includes('/home')){ 
      this.lancementBoucleVeille()
    }
  },
  methods: {
    onSubmit: function () {
      const formData = new FormData();
      formData.append('username', this.form.username)
      formData.append('password', this.form.password)
      fetch('http://localhost:8000/api/user/login', {
          method: 'POST',
          body: formData
        })
        .then((results) => results.json())
        .then(data => {
          console.log(data)
          if(typeof data.erreur !== 'undefined'){
            alert(data.erreur)
          }else{
            this.apiToken = data.token.toString()
            this.writeCookie('apiToken', this.apiToken, 7)
            this.$refs['loginModal'].hide()
            document.location.reload();
          }
        }).catch(function(err){
          alert(err)
        })
    },
    // Ecrire un Cookie
    writeCookie: function (name, value, days) {
      let date, expires;
      if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
      }else{
        expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    },
    // Lire un Cookie
    readCookie: function(name) {
      let i, c, ca, nameEQ = name + "=";
      ca = document.cookie.split(';');
      for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
          c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length,c.length);
        }
      }
      return '';
    },
    lancementBoucleVeille: function() {
      console.log('lancementBoucleVeille')
      /*setTimeout(() => {
        console.log('10s')
      }, this.intervalle)*/

      setTimeout(() => {
        this.testerActivite()
      }, this.intervalle)
    },
    // On teste toutes les x secondes l'activité du visiteur via activite_detectee
    testerActivite: function() {
      console.log('testerActivite')
      
      // On teste la variable activite_detectee
      // Si une activité a été détectée [On réinitialise activite_detectee]
      if(this.activite_detectee) {
        this.activite_detectee = false

        // On relance la boucle au bout de 5s
        setTimeout(() => {
          this.relanceBoucleVeille()
        }, 5000)
      }
      // Si aucune activité n'a été détectée
      else {
        console.log('pas de mouvement')
        this.$router.push('/veille')
      }
    },
    relanceBoucleVeille: function() {
      console.log('relanceBoucleVeille')

      if(this.activite_detectee) {
        this.activite_detectee = false

        // On boucle toutes les 5s pour voir la detection du dernier evenement
        setTimeout(() => {
          this.relanceBoucleVeille()
        }, 5000)
      }
      else {
        // on relance la boucle 
        this.lancementBoucleVeille()
      }
    }
  }
}
</script>
