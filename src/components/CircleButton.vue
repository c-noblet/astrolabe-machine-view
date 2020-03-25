<template>
  <div>
    <div class="wrapper">
      <input class="hidden-trigger" id="toogle" type="checkbox">
      <label class="shadow circle" for="toogle">
        <span><font-awesome-icon icon="ellipsis-h"/></span>
      </label>
      
      <div class="subs">
        <button class="sub-circle">
          <input v-b-modal.add-modal class="hidden-sub-trigger" id="sub1" type="button" name="sub-circle" value="1"/>
          <label for="sub1"><span><font-awesome-icon icon="plus"/></span></label>
        </button>
        <button class="sub-circle">
          <input v-b-modal.bg-modal class="hidden-sub-trigger" id="sub2" type="button" name="sub-circle" value="1"/>
          <label for="sub2"><span><font-awesome-icon icon="paint-roller"/></span></label>
        </button>
        <button class="sub-circle">
          <!--<input to="/veille" class="hidden-sub-trigger" id="sub3" type="button" name="sub-circle" value="1"/>-->
          <router-link to="/veille"><span><font-awesome-icon icon="sync-alt"/></span></router-link>
        </button>
      </div>
    </div>

    <b-modal ref="add-modal" id="add-modal" hide-footer>
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
        </b-form-group>

        <b-form-group label="Position:" label-for="edit-pos-x" class="form-inline">
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
        </b-form-group>

        <b-button type="button" v-on:click="onSubmit()" variant="primary">Ajouter</b-button>
      </b-form>
    </b-modal>

    <b-modal ref="bg-modal" id="bg-modal" hide-footer>
      <div>
        <b-nav tabs fill>
          <b-nav-item to="/" active>Couleur</b-nav-item>
          <b-nav-item to="/picform">Image</b-nav-item>
        </b-nav>
      </div>
      <b-form>
        <router-view 
          :bg="bg"
          @backgroundUpdate="background = $event"
        ></router-view>
        <b-button type="button" v-on:click="setBackground(background)" variant="primary">Ajouter</b-button>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import options from '../../options.env'
export default {
  props: {
    bg: String,
    setBackground: Function
  },
  data() {
    return {
      modal: {
        url: 'http://www.lastrolabe.org/',
        width: '',
        height: '',
        posX: '',
        posY: ''
      },
      background: null
    }
  },
  mounted () {
    this.$on('backgroundUpdate', function (value){
      this.background = value
    })
  },
  methods: {
    onSubmit: function () {
      const formData = new FormData();
      formData.append('url', this.modal.url)
      formData.append('width', this.modal.width)
      formData.append('height', this.modal.height)
      formData.append('posX', this.modal.posX)
      formData.append('posY', this.modal.posY)
      console.log(formData)
      fetch(options.API_WINDOW_URL, {
        method: 'POST',
        body: formData
      })
      .then((results) => results.json())
      .then(data => {
        if(typeof data.erreur !== 'undefined'){
          alert(data.erreur)
        }else{
          //this.windows.push(data)
        }
      }).catch(function(err){
        alert(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$circle: #3F51B5;
$sub-circle: rgb(42, 77, 143);

//reset
button {
  border: none;
  outline: none;
}
.wrapper{
  position: absolute;
  bottom: 0px;
  right: 0px;
  transform: translate(-40%, -40%) scale(-1, 1);
  width: 60px;
  height: 60px;
}
  
.circle{
  display: table;
  position: relative;
  padding: 0;
  z-index: 98;
  margin: 0 auto;
  -webkit-box-shadow: 0 6px 10px 0 rgba(0,0,0,0.3);
  box-shadow: 0 6px 10px 0 rgba(0,0,0,0.3);
  border-radius: 50%;
  height: 60px;
  width: 60px;
  background-color: $circle;
  transition: 0.2s;
  text-align: center;
  color: white;
  & span {
    display: table-cell;
    vertical-align: middle;
  }
  &:active{
    transform: scale(0.90);
    box-shadow: 0 2px 15px 0 rgba(0,0,0,0.3);
  }
  &:hover{
    cursor: pointer;
    background-color: lighten($circle, 10%);
    box-shadow: 0 8px 15px 0 rgba(0,0,0,0.3);
  }

  img{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
    width: 30px;
    height: 30px;
    transition: 0.5s;
    transform: rotate(180deg);
  }
} 
.sub-circle{
  z-index: 0;
  position: absolute;
  height: 40px;
  width: 40px;
  overflow: hidden;
  border-radius: 50%;
  transition: 0.3s;
  transform: scale(0.5) ;
  opacity: 0;
  padding: 0;
  margin: 0;
  box-shadow: 0 6px 10px 0 rgba(0,0,0,0.3);
  label, a{
    display: table;
    background-color: $sub-circle;
    color: white;
    width: 100%;
    height: 100%;
    transition: 200ms;
    & span {
      display: table-cell;
      vertical-align: middle;
    }
    &:hover{
      cursor: pointer;
      background-color: lighten($circle, 10%);
    }
  }
}
.subs{
  left: -20px;
  top: -50px;
  width: 40px;
  height: 40px;
  text-align: center;
  z-index: 0;
  margin: 0 auto;
  position: relative;
} 
$transition: 0.1;
$transalteValue: 100;
$translate75: $transalteValue*0.75 ;
  

.hidden-sub-trigger{
  display: none;
  &:checked ~ label{
    background-color: lighten($circle, 10%);
  }
}  
.hidden-trigger{
  display: none;
  &:checked ~ .circle{
    transform: scale(0.90);
    cursor: pointer;
    background-color: lighten($circle, 10%);
    box-shadow: 0 8px 15px 0 rgba(0,0,0,0.1);
  }
  &:checked ~ .circle img{
    transform: rotate(45deg);
  }
  &:checked ~ .subs button:nth-of-type(1){
    transform: translate(0px, -$transalteValue + px) scale(1);
    opacity: 1;
    transition: $transition + s;
  }
  &:checked ~ .subs button:nth-of-type(2){
    transform: translate($translate75 + px, -$translate75 + px) scale(1);
    opacity: 1;
    transition: $transition * 2 + s;
  }
  &:checked ~ .subs button:nth-of-type(3){
    transform: translate($transalteValue + px, 0px) scale(1);
    opacity: 1;
    transition: $transition * 3 + s;
  }
  &:checked ~ .subs button:nth-of-type(4){
    transform: translate($translate75 + px, $translate75 + px) scale(1);
    opacity: 1;
    transition: $transition * 4 + s;
  }
  &:checked ~ .subs button:nth-of-type(5){
    transform: translate(0px, $transalteValue + px) scale(1);
    opacity: 1;
    transition: $transition * 5 + s;
  }  
  &:checked ~ .subs button:nth-of-type(6){
    transform: translate(-$translate75 + px, $translate75 + px) scale(1);
    opacity: 1;
    transition: $transition * 6 + s;
  }
  &:checked ~ .subs button:nth-of-type(7){
    transform: translate(-$transalteValue + px, 0px) scale(1);
    opacity: 1;
    transition: $transition * 7 + s;
  }
  &:checked ~ .subs button:nth-of-type(8){
    transform: translate(-$translate75 + px, -$translate75 + px) scale(1);
    opacity: 1;
    transition: $transition * 8 + s;
  }
}
</style>
