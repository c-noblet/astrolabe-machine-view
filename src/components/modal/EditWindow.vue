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

    <b-form-checkbox
      v-if="modal.youtube"
      id="checkbox-playlist"
      class="mb-2"
      v-model="modal.playlist"
      name="checkbox-playlist"
      :value="true"
      :unchecked-value="false"
    >
      Playlist YouTube
    </b-form-checkbox>

    <b-form-group label="Dimension:" label-for="edit-width" class="form-inline">
      <div class="d-flex justify-content-between">
        <b-form-input
          id="edit-width"
          v-model="modal.width"
          required
          placeholder="Horizontale"
        ></b-form-input>
        <b-form-input
          id="edit-height"
          v-model="modal.height"
          required
          placeholder="Verticale"
        ></b-form-input>
      </div>
    </b-form-group>

    <b-form-group label="Position:" label-for="edit-pos-x" class="form-inline">
      <div class="d-flex justify-content-between">
        <b-form-input
          id="edit-pos-x"
          v-model="modal.posX"
          required
          placeholder="Position X"
        ></b-form-input>
        <b-form-input
          id="edit-pos-y"
          v-model="modal.posY"
          required
          placeholder="Position Y"
        ></b-form-input>
      </div>
    </b-form-group>

    <b-button type="button" class="mr-3" v-on:click="onSubmit()" variant="primary">Sauvegarder</b-button>
    <b-button type="button" v-on:click="deleteWindow()" variant="danger">Supprimer</b-button>
  </b-form>
</template>
<script>
import options from '../../../options.env'
export default {
  props: {
    apiToken: String,
    windowId: String,
    windows: Array
  },
  data() {
    return {
      modal: {
        id: '',
        url: '',
        width: '',
        height: '',
        posX: '',
        posY: '',
        youtube: false,
        playlist: false
      }
    }
  },
  mounted: function () {
    for (let i = 0; i < this.windows.length; i++) {
      if(this.windows[i].id === parseInt(this.windowId)){
        this.modal = this.windows[i]
      }
    }
  },
  methods: {
    onSubmit: function (){
      const formData = JSON.stringify({
        url: this.modal.url,
        width: this.modal.width.toString(),
        height: this.modal.height.toString(),
        posX: this.modal.posX.toString(),
        posY: this.modal.posY.toString(),
        youtube: this.modal.youtube.toString(),
        playlist: this.modal.veille.toString(),
        veille: this.$route.fullPath.includes('veille').toString()
      });
      fetch(options.API_WINDOW_URL+this.modal.id, {
        method: 'PUT',
        headers: {
          'X-Auth-Token': this.apiToken
        },
        body: formData
      })
      .then((results) => results.json())
      .then(data => {
        if(typeof data.error !== 'undefined'){
          alert(data.error)
        }else{
          this.$emit('closeModal', true)
        }
      }).catch(function(err){
        alert(err)
      })
    },
    deleteWindow: function () {
      //const myHeaders = new Headers();
     //myHeaders.append("Access-Control-Allow-Origin", "*")
      //myHeaders.append('X-Auth-Token', this.apiToken)
      fetch(options.API_WINDOW_URL+this.modal.id, {
        method: 'DELETE',
        headers: {
          'X-Auth-Token': this.apiToken
        }
      })
      .then((results) => results.json())
      .then(data => {
        if(typeof data.erreur !== 'undefined'){
          alert(data.erreur)
        }else{
          for (let i = 0; i < this.windows.length; i++) {
            if(this.windows[i].id === this.modal.id){
              this.windows.splice(i, 1);
            }
          }
          this.$emit('closeModal', true)
        }
      }).catch(function(err){
        alert(err)
      })
    }
  }
}
</script>