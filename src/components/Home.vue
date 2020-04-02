<template>
  <section :style="'background:'+background">
    <div ref="container" class="screen">
      <ul>
        <li v-for="(item) in windows" :key="item.id">
          <Window 
            :window="item"
            :editMode="editMode"
            @iframeLoaded="iframesState($event)"
          />
        </li>
      </ul>
      <CircleButton 
        v-if="editMode"
        :bg="background"
        :editMode="editMode"
        @openModal="modalName = $event"
      />
      <Modal 
        :apiToken="apiToken"
        :windows="windows"
        :bg="background"
        @windowAdded="pushNewWindow($event)"
        @backgroundUpdated="reloadBackground($event)"
      />
    </div>
  </section>
</template>
<script>
import options from '../../options.env'
import Window from './Window'
import CircleButton from './CircleButton'
import Modal from './Modal'
export default {
  name: 'Home',
  props: {
    editMode: Boolean,
    state: Boolean,
    apiToken: String
  },
  data () {
    return {
      background: '',
      modal: {
        id: Number,
        url: String,
        width: String,
        height: String,
        posX: String,
        posY: String,
        loaded: Boolean
      },
      windows: [],
    }
  },
  mounted: async function () {
    await this.getBackground()
    this.getWindows()
  },
  methods: {
    pushNewWindow(window){
      this.windows.push(window)
    },
    reloadBackground: function (background) {
      if(typeof background === 'string'){
        document.location.reload();
      }else{
        this.background = background.color
      }
    },
    getBackground: function () {
      fetch(options.API_BACKGROUND_URL)
      .then((results) => results.json())
      .then(data => {
        if(data.color){
          this.background = data.color
          //console.log(data.color)
          //console.log(data)
        }
      }).catch(() => {
        this.background = "url('"+options.API_BACKGROUND_URL+"');background-position:center;background-size:100% 100%;background-repeat:no-repeat;"
      })
    },
    getWindows: function () {
      fetch(options.API_WINDOW_URL)
      .then((results) => results.json())
      .then(data => {
        if(typeof data.erreur !== 'undefined'){
          alert(data.erreur)
        }else{
          this.windows = data
        }
      }).catch(function(err){
        alert(err)
      })
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
    Window, CircleButton, Modal
  }
}
</script>
<style lang="scss">
  
</style>
