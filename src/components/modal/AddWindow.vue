<template>
  <b-form>
    <b-form-group
      label="Entrez l'URL:"
      label-for="add-url"
    >
      <b-form-input
        id="add-url"
        v-model="modal.url"
        type="text"
        required
        placeholder="Entrer l'URL"
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Dimension:" label-for="edit-width" class="form-inline">
      <div class="d-flex justify-content-between">
        <b-form-input
          id="add-width"
          v-model="modal.width"
          required
          placeholder="Entrer la longueur"
        ></b-form-input>
        <b-form-input
          id="add-height"
          v-model="modal.height"
          required
          placeholder="Entrer la hauteur"
        ></b-form-input>
      </div>
    </b-form-group>

    <b-form-group label="Position:" label-for="edit-pos-x" class="form-inline">
      <div class="d-flex justify-content-between">
        <b-form-input
          id="add-pos-x"
          v-model="modal.posX"
          required
          placeholder="Entrer la longueur"
        ></b-form-input>
        <b-form-input
          id="add-pos-y"
          v-model="modal.posY"
          required
          placeholder="Entrer la hauteur"
        ></b-form-input>
      </div>
    </b-form-group>
    
    <b-button type="button" v-on:click="onSubmit()" variant="primary">Ajouter</b-button>
  </b-form>
</template>
<script>
import options from '../../../options.env'
export default {
  props: {
    apiToken: String,
  },
  data() {
    return {
      modal: {
        url: '',
        width: '',
        height: '',
        posX: '',
        posY: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      const formData = new FormData();
      formData.append('url', this.modal.url)
      formData.append('width', this.modal.width)
      formData.append('height', this.modal.height)
      formData.append('posX', this.modal.posX)
      formData.append('posY', this.modal.posY)
      formData.append('youtube', false)
      formData.append('playlist', false)
      formData.append('veille', false)
      fetch(options.API_WINDOW_URL, {
        method: 'POST',
        headers: {
          'X-Auth-Token': this.apiToken
        },
        body: formData
      })
      .then((results) => results.json())
      .then(data => {
        if(typeof data.erreur !== 'undefined'){
          alert(data.erreur)
        }else{
          this.$emit('windowAdded', data)
          this.$emit('closeModal', true)
        }
      }).catch(function(err){
        alert(err)
      })
    }
  }
}
</script>