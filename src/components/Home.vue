<template>
  <section>
    <div ref="container" class="screen" :style="'background:'+background">
      <ul>
        <li v-for="(item) in windows" :key="item.id">
          <Window 
            :window="item"
            :editModal="editModal"
            :iframeState="iframeState"
          />
        </li>
      </ul>
      <CircleButton :setBackground="setBackground"/>
      <b-modal ref="edit-modal" id="edit-modal" hide-footer>
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

          <b-form-group label="Dimension:" label-for="edit-width" class="form-inline">
            <b-form-input
              id="edit-width"
              v-model="modal.width"
              required
              placeholder="Entrer la longueur"
            ></b-form-input>
            <b-form-input
              id="edit-height"
              v-model="modal.height"
              required
              placeholder="Entrer la hauteur"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Position:" label-for="edit-pos-x" class="form-inline">
            <b-form-input
              id="edit-pos-x"
              v-model="modal.posX"
              required
              placeholder="Entrer la longueur"
            ></b-form-input>
            <b-form-input
              id="edit-pos-y"
              v-model="modal.posY"
              required
              placeholder="Entrer la hauteur"
            ></b-form-input>
          </b-form-group>

          <b-button type="button" class="mr-3" v-on:click="onSubmit(modal.id)" variant="primary">Sauvegarder</b-button>
          <b-button type="button" v-on:click="deleteWindow(modal.id)" variant="danger">Supprimer</b-button>
        </b-form>
      </b-modal>
    </div>
    <div ref="loader" class="loader">
      <div>
        <b-spinner class="text-primary" style="width: 15rem; height: 15rem;" label="Large Spinner"></b-spinner>
      </div>
    </div>
  </section>
</template>
<script>
import options from '../../options.env'
import Window from './Window'
import CircleButton from './CircleButton'
export default {
  name: 'Home',
  data () {
    return {
      background: 'rgb(25,45,70)',
      modal: {
        id: Number,
        url: String,
        width: Number,
        height: Number,
        posX: Number,
        posY: Number,
        loaded: Boolean
      },
      windows: Array,
      promiseArray: []
    }
  },
  mounted: function () {
    this.getWindows()
    this.getBackground()
  },
  methods: {
    showApp: function () {
      this.$refs['container'].style.display = 'block'
      this.$refs['loader'].style.display = 'none'
    },
    setBackground: function (background) {
      if(background == null){
        console.log('error')
      }else{
        if (background.picture != null) {
          let picUrl = background.picture.webkitRelativePath + background.picture.name
          this.background = "url('"+picUrl+"')"
          console.log(this.background)
        } else {
          const formData = new FormData();
          formData.append('color', background)
          fetch(options.API_BACKGROUND_URL, {
            method: 'PUT',
            body: formData
          })
          .then((results) => results.json())
          .then((data) => {
            console.log(data)
            this.background = data.color
          })
        }
      }
    },
    getBackground: function () {
      fetch(options.API_BACKGROUND_URL)
      .then((results) => results.json())
      .then(data => {
        if(data.color){
          this.background = data.color
        }else{
          this.background = "url('"+data.image+"')"
        }
      })
    },
    iframeState: function (id) {
      let win = this.windows.find(x => x.id === id)
      this.promiseArray.push(win.loaded)
      if(this.promiseArray.length === this.windows.length){
        Promise.all(this.promiseArray).then(this.showApp())
      }
    },
    getWindows: function () {
      fetch(options.API_WINDOW_URL)
      .then((results) => results.json())
      .then(data => {
        if(typeof data.erreur !== 'undefined'){
          alert(data.erreur)
        }else{
          this.windows = data
          for (let i = 0; i < this.windows.length; i++) {
            this.windows[i].loaded = false
          }
        }
      }).catch(function(err){
        alert(err)
      })
    },
    editModal: function (window) {
      this.modal = window
    },
    deleteWindow: function (id) {
      for (let i = 0; i < this.windows.length; i++) {
        if(this.windows[i].id === id){
          const formData = new FormData();
          formData.append('id', this.windows[i].id)
          fetch(options.API_WINDOW_URL+this.windows[i].id, {
            method: 'DELETE',
            body: formData
          })
          .then((results) => results.json())
          .then(data => {
            if(typeof data.erreur !== 'undefined'){
              alert(data.erreur)
            }else{
              this.windows.splice(i, 1);
              this.$refs['edit-modal'].hide()
              console.log(data)
            }
          }).catch(function(err){
            alert(err)
          })
        }
      }
    },
    onSubmit: function (id){
      for (let i = 0; i < this.windows.length; i++) {
        if(this.windows[i].id === id){
          const formData = new FormData();
          formData.append('url', this.windows[i].url)
          formData.append('width', parseInt(this.windows[i].width))
          formData.append('height', parseInt(this.windows[i].height))
          formData.append('posX', parseInt(this.windows[i].posX))
          formData.append('posY', parseInt(this.windows[i].posY))
          fetch(options.API_WINDOW_URL+this.windows[i].id, {
            method: 'PUT',
            body: formData
          })
          .then((results) => results.json())
          .then(data => {
            if(typeof data.error !== 'undefined'){
              alert(data.error)
            }else{
              this.windows[i].url = this.modal.url
              this.windows[i].width = parseInt(this.modal.width)
              this.windows[i].height = parseInt(this.modal.height)
              this.windows[i].posX = parseInt(this.modal.posX)
              this.windows[i].posY = parseInt(this.modal.posY)
              this.$refs['edit-modal'].hide()
              console.log(data)
            }
          }).catch(function(err){
            alert(err)
          })
        }
      }
      this.$refs['edit-modal'].hide()
      //this.calculPosAutreWindows(this.windows[id])

    },
    calculPosAutreWindows: function(laWindow) {
      for (let index in this.windows ){
        
        if ( this.windows[index] !== laWindow) {

          let laWindowTop = laWindow.posY
          let laWindowBottom = laWindow.posY + laWindow.height
          let itemTop = this.windows[index].posY
          let itemBottom = this.windows[index].posY + this.windows[index].height
          let orientationH = null 

          // Définie le côté de la window non modifié à adapter
          if(laWindow.posX < this.windows[index].posX){
            orientationH = 'left'
          }else{
            orientationH = 'right'
          }

          
          // Si la fenêtre modifié passe par sa droite sur une fenêtre non modifié
          if((this.windows[index].posX + this.windows[index].width) >= laWindow.posX){
            // Si les traits horizontaux des fenêtres sont en conflits sur la même ligne
            if(itemTop < laWindowBottom && itemBottom > laWindowTop){
              // Alors on modifie la taille la fenêtre non modifié
              this.windows[index].width = 100 - laWindow.width
              // Si la fenêtre non modifié est à gauche
              if(orientationH === 'left'){
                // On redéfinie sa position
                this.windows[index].posX = laWindow.width + laWindow.posX
              }else{
                // On redéfinie sa position sa position afin de s'aligner avec la fenêtre modifié
                laWindow.posX = 100 - laWindow.width
              }
            }
          }
        } 
      }
    }
  },
  components: {
    Window, CircleButton
  }
}
</script>
<style lang="scss">
  
</style>
