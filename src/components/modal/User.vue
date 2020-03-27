<template>
  <b-form>
    <b-form-group
      label="Entrez l'URL:"
      label-for="edit-url"
    >
      <b-form-input
        id="edit-url"
        v-model="modal.url"
        type="text"
        required
        placeholder="Entrer l'URL"
      ></b-form-input>
    </b-form-group>

    <b-button type="button" class="mr-3" v-on:click="onSubmit()" variant="primary">Sauvegarder</b-button>
  </b-form>
</template>
<script>
export default {
  data() {
    return {
      password1: '',
      password2: '',
      warning: false
    }
  },
  methods: {
    onSubmit: function () {
      if(this.password1 !== this.password2){
        this.warning = true
      }else{
        const formData = new FormData();
        formData.append('username', 'test')
        formData.append('password', 'test')
        /*const formData = JSON.stringify({
          "username": "test",
          "password": "test"
        })*/
        fetch('http://localhost:8000/api/user/login', {
          method: 'POST',
          body: formData
        })
        .then((results) => results.json())
        .then(data => {
          if(typeof data.erreur !== 'undefined'){
            alert(data.erreur)
          }else{
            this.apiToken = data.token.toString()
            this.writeCookie('apiToken', this.apiToken, 7)
            console.log('fetch',this.apiToken)
            this.$refs['loginModal'].hide()
            document.location.reload();
          }
        }).catch(function(err){
          alert(err)
        })
      }
    }
  }
}
</script>