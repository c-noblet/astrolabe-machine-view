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
          width: 25,
          height: 50,
          posX: 0,
          posY: 0 
        },
        { 
          index: 1,
          url: 'http://www.lastrolabe.org/',
          width: 25,
          height: 40,
          posX: 25,
          posY: 60
        },
        { 
          index: 2,
          url: 'http://www.lastrolabe.org/',
          width: 25,
          height: 50,
          posX: 0,
          posY: 50  
        },
        { 
          index: 3,
          url: 'http://www.lastrolabe.org/',
          width: 25,
          height: 50,
          posX: 50,
          posY: 0  
        },
        { 
          index: 4,
          url: 'http://www.lastrolabe.org/',
          width: 25,
          height: 50,
          posX: 50,
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

      let enregistrementPosX = this.windows[index].posX
      let enregistrementWidth = this.windows[index].width
      // let enregistrementHeight = this.windows[index].height

      this.windows[index].url = this.modal.url
      this.windows[index].width = parseInt(this.modal.width)
      this.windows[index].height = parseInt(this.modal.height)
      this.windows[index].posX = parseInt(this.modal.posX)
      this.windows[index].posY = parseInt(this.modal.posY)
      this.$refs['edit-modal'].hide()

      this.calculPosAutreWindows(this.windows[index], enregistrementPosX, enregistrementWidth/*, enregistrementHeight*/)
      

    },
    calculPosAutreWindows: function(laWindow, posXBase, widthBase/*, heightBase*/) {

      // V1 pour conflit des iframes plus taille dynamique 

      for (let index in this.windows ){
        
        if ( this.windows[index] !== laWindow) {

          // variables utiles
          let laWindowTop = laWindow.posY
          let laWindowBottom = laWindow.posY + laWindow.height
          let itemTop = this.windows[index].posY
          let itemBottom = this.windows[index].posY + this.windows[index].height
          let orientationH = null 
          let choixOrientationH = null
          // let choixWidthTailleMax = null
          let annulationModif = false
          // max /!\
          //let widthMaxSiConflit = 100 //80

          //test /!\
          // largeur minimun pour une Window
          let widthMinSiConflit = 20

          // Définie le côté de la window non modifié à adapter
          if(laWindow.posX > this.windows[index].posX){
            orientationH = 'left'
          }else{
            orientationH = 'right'
          }

          // En fonction du coté de la fenetre non modifié on applique un if différent
          if(orientationH === 'left'){
            // fenetre non modifié à GAUCHE de laWindow
            choixOrientationH = (this.windows[index].posX + this.windows[index].width) >= laWindow.posX
           // choixWidthTailleMax = laWindow.width <= widthMaxSiConflit
          }else{
            // fenetre non modifié à DROITE de laWindow
            choixOrientationH = (laWindow.posX + laWindow.width) >= this.windows[index].posX
           // choixWidthTailleMax = (laWindow.posX + laWindow.width ) <= widthMaxSiConflit
          }

          if (laWindow.width > 100 ){
            annulationModif = true
          }
          
          // Si laWindow passe sur une fenêtre non modifié celon le coté "choixOrientationH"
          if(choixOrientationH){

            // if((this.windows[index].posX + this.windows[index].width) >= laWindow.posX){
            // if((laWindow.posX + laWindow.width) >= this.windows[index].posX){

            // Si les traits horizontaux des fenêtres sont en conflits sur la même ligne
            console.log(itemTop +"<"+ laWindowBottom +"&&"+ itemBottom +">"+ laWindowTop + this.windows[index].index)
            if(itemTop < laWindowBottom && itemBottom > laWindowTop){
              //console.log("conflit horizontaux = true ")

              // En plus du conflit, on ajoute un controle sur la largeur max de la fenetre pour éviter d'écraser la fenetre non modifier 
              /*if (choixWidthTailleMax) {*/

                // Si les deux windows prennent toute la largeur on modifie la taille la fenêtre non modifié 
                if (((laWindow.posX + laWindow.width) + this.windows[index].width) >= 100 ){
                  if (confirm("Attention, \n\nVotre action va diminuer la largeur d'une autre fenêtre ! \n\nContinuer ?")){
                    // Si la fenêtre non modifié est à droite 
                    if(orientationH === 'right'){
                      if ((100 - ( laWindow.width + laWindow.posX )) >= widthMinSiConflit ){
                         //console.log(orientationH)
                        this.windows[index].width = 100 - ( laWindow.width + laWindow.posX )
                        // On redéfinie sa position
                        this.windows[index].posX = laWindow.width + laWindow.posX                       
                      } else {
                        annulationModif = true
                      }
                    }else{
                      // On redéfinie sa position afin de s'aligner avec la fenêtre modifié
                      laWindow.posX = 100 - laWindow.width
                      // On change la largeur de la fenêtre non modifié 
                      if ( (laWindow.posX - this.windows[index].posX) >= widthMinSiConflit) {
                         //console.log(orientationH)
                      this.windows[index].width = laWindow.posX - this.windows[index].posX
                      } else {
                        annulationModif = true
                      }
                    }
                  } else {
                    annulationModif = true
                  }
                  // Sinon on garde la taille de la windows non modifier 
                }else{
                  // Si la fenêtre non modifié est à gauche
                  if(orientationH === 'right'){
                    //console.log('Si la fenêtre non modifié est à gauche')
                    // On redéfinie sa position
                    this.windows[index].posX = laWindow.width + laWindow.posX
                  }else{
                    // On redéfinie sa position sa position afin de s'aligner avec la fenêtre modifié
                    //console.log('Si la fenêtre non modifié est à droite')
                    laWindow.posX = 100 - laWindow.width
                  }
                  // on boucle sur la fonction pour faire bouger les autres Windows si besoin 
                  // this.calculPosAutreWindows(this.windows[index], this.windows[index].posX, this.windows[index].width/*, enregistrementHeight*/)
                  // this.onSubmit(this.windows[index])
                }
              /*}else{
                annulationModif = true
              }*/
            }
            // Si la posX + la largeur de laW est > 100
            else {
              if ( (laWindow.posX + laWindow.width ) > 100 ) {
                laWindow.posX = 100 - laWindow.width

                //console.log("laW est > 100 ")

                // this.calculPosAutreWindows(laWindow, laWindow.width/*, enregistrementHeight*/)
                // this.onSubmit(this.windows[index])
              }
            }
             //console.log("Aucun conflit")
          }

          if (annulationModif){
            alert("Erreur \n\nModification(s) annulée(s)")
              laWindow.width = widthBase
            if(orientationH === 'right'){
              laWindow.posX = posXBase
            }else{
              laWindow.posX = 100 - laWindow.width
            }
          }
        } 
      }

      console.log("fin methode")
      // v1 fin 
    }
  },
  components: {
    Window, AddButton
  }
}
</script>
<style lang="scss">
  
</style>
