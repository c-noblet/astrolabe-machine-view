<template>
  <b-form>
    <b-form-group
      label="Saisissez votre mot de passe:"
      label-for="oldPassword"
    >
      <b-form-input
        id="oldPassword"
        v-model="oldPassword"
        type="password"
        required
        placeholder=""
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Saisissez votre nouveau mot de passe:"
      label-for="newPassword"
    >
      <b-form-input
        id="newPassword"
        class="mb-2"
        v-model="password1"
        @input="comparePassword()"
        type="password"
        required
        placeholder=""
      ></b-form-input>
      <b-form-input
        v-model="password2"
        @input="comparePassword()"
        type="password"
        required
        placeholder=""
      ></b-form-input>
    </b-form-group>

    <b-alert v-show="warning" variant="warning" show dismissible>
      Les champs de nouveau mot de passe ne sont pas identiques.
    </b-alert>

    <b-button type="button" v-on:click="onSubmit()" variant="primary"><b-spinner ref="spinner" small type="grow"></b-spinner> Sauvergarder</b-button>
  </b-form>
</template>
<script>
export default {
  props: {
    apiToken: String
  },
  data() {
    return {
      password1: '',
      password2: '',
      oldPassword: '',
      warning: false
    }
  },
  methods: {
    comparePassword: function () {
      if(this.password1 !== this.password2){
        this.warning = true
      }else{
        this.warning = false
      }
    },
    onSubmit: function () {
      if(this.password1 !== this.password2){
        this.warning = true
      }else{
        this.$refs['spinner'].style.display = 'inline-block'
        const formData = new FormData();
        formData.append('password', this.oldPassword)
        formData.append('newpassword', this.password1)
        fetch('http://localhost:8000/api/user/changepassword', {
          method: 'POST',
          headers: {
          'X-Auth-Token': this.apiToken
          },
          body: formData
        })
        .then((results) => results.json())
        .then(data => {
          console.log(data)
          if(typeof data.erreur !== 'undefined'){
            alert(data.erreur)
          }else{
            this.$emit('closeModal', true)
          }
          this.$refs['spinner'].style.display = ''
        }).catch(function(err){
          alert(err)
        })
      }
    }
  }
}
</script>