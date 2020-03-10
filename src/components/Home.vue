<template>
  <div>
    <ul>
      <li v-for="(item) in windows" :key="item.index">
        <Window 
          :index="item.index"
          :url="item.url"
          :width="item.width"
          :height="item.height"
          :posX="item.posX"
          :posY="item.posY"
          :editModal="editModal"
        />
      </li>
    </ul>
    <AddButton />
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

        <b-button type="button" v-on:click="onSubmit(modal.index)" variant="primary">Sauvegarder</b-button>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import Window from './Window.vue'
import AddButton from './AddButton.vue'
export default {
  name: 'Home',
  data () {
    return {
      modal: {
        index: Number,
        url: String,
        width: Number,
        height: Number,
        posX: Number,
        posY: Number
      },
      windows: [
        { 
          index: 0,
          url: 'http://www.lastrolabe.org/',
          width: 50,
          height: 50,
          posX: 0,
          posY: 0 
        },
        { 
          index: 1,
          url: 'http://www.lastrolabe.org/',
          width: 50,
          height: 50,
          posX: 50,
          posY: 25  
        },
        { 
          index: 2,
          url: 'http://www.lastrolabe.org/',
          width: 50,
          height: 50,
          posX: 0,
          posY: 50  
        }
      ]
    }
  },
  methods: {
    editModal: function (window) {
      this.modal = window
    },
    onSubmit: function (index){
      this.windows[index].url = this.modal.url
      this.windows[index].width = parseInt(this.modal.width)
      this.windows[index].height = parseInt(this.modal.height)
      this.windows[index].posX = parseInt(this.modal.posX)
      this.windows[index].posY = parseInt(this.modal.posY)
      this.$refs['edit-modal'].hide()

      this.calculPosAutreWindows(this.windows[index])

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
    Window, AddButton
  }
}
</script>
<style lang="scss">
  
</style>
