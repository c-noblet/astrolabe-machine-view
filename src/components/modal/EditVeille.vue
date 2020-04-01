<template>
  <b-form>
    <div v-for="(item) in tempsVeilles" :key="item.id">
      <b-form-group v-if="item.is_actif"
      label="Choisissez le temps de veille actif:"
      label-for="selc_Vactif"
        >

        <!-- JR A supprimer test 
          <p style="display: none;"> {{selected= item.label}} </p>
          
          <p style="display: none;"> {{test(item.label)}} </p>
        -->

        <select 
          id="selc_Vactif"
          v-model="selected"
          class="w-25 
                form-control
                style_form"
          required
            >
          <option value="temps_normal">Défault</option>
          <option value="temps_media">Média</option>
        </select>

      </b-form-group>
    </div>

    <div v-for="(item) in tempsVeilles" :key="item.id">
      <b-form-group v-if="item.label == 'temps_normal'"
      label="Durée par défault avant la mise en veille"
      label-for="inp_tempD"
      >
        <input
          v-if="selected == 'temps_normal'"
          id="inp_tempD"
          class="w-25 
                form-control 
                style_form
                actif"
          type="number"
          v-model="item.temps"
        />
        <input
          v-else
          id="inp_tempD"
          class="w-25 
                form-control 
                style_form
                non-actif"
          type="number"
          v-model="item.temps"
          disabled 
        />
        Minute(s) 
      </b-form-group>

      <b-form-group v-if="item.label == 'temps_media'"
      label="Durée si média avant la mise en veille"
      label-for="inp_tempM"
      >
        <input
          v-if="selected == 'temps_media'"
          id="inp_tempM"
          class="w-25 
                form-control 
                style_form
                actif"
          type="number"
          v-model="item.temps"
          />
        <input
          v-else
          id="inp_tempM"
          class="w-25 
                form-control 
                style_form
                non-actif"
          type="number"
          v-model="item.temps"
          disabled 
          />
        Minute(s)
      </b-form-group> 
    </div>

    <b-button type="button" v-on:click="onSubmit()" variant="primary"><b-spinner ref="spinner" small type="grow"></b-spinner> Sauvegarder</b-button>
  </b-form>
</template>
<script>
import options from '../../../options.env'
export default {
  props: {
    apiToken: String
  },
  data() {
    return {
      selected: '',
      tempsVeilles: Object,
    }
  },
  mounted: function () {
    this.getTempsVeille()
  },
  methods: {
    test(label){
      // JR a supprimer /!\
      this.selected = label
      console.log(this.selected)
    },
    getTempsVeille: function () {
      fetch(options.API_TEMPS_VEILLE)
      .then((results) => results.json())
      .then(data => {
        if(typeof data.erreur !== 'undefined'){
          alert(data.erreur)
        }else{
          this.tempsVeilles = data
          console.log(this.tempsVeilles)
        }
      }).catch(function(err){
        alert(err)
      })
    },
    onSubmit: function () {
      this.$refs['spinner'].style.display = 'inline-block'
      const formData = new FormData()

      for (let i = 0; i < this.tempsVeilles.length; i++ ){
      formData.append('label', this.tempsVeilles.label)
      formData.append('temps', this.tempsVeilles.temps)
      formData.append('is_actif', this.tempsVeilles.is_actif)
      }

      fetch(options.API_TEMPS_VEILLE, {
        method: 'PUT',
        headers: {
          'X-Auth-Token': this.apiToken
        },
        body: formData
      })
      .then((results) => results.json())
      .then((data) => {
        console.log(data)
        this.$emit('closeModal', true)
        this.$refs['spinner'].style.display = ''
      })
    }
  }
}
</script>
<style lang="scss" scoped>

  .style_form{
    display: inline;
    text-align: right; 
    margin-right: 2px; 
    margin-bottom: 7px
  }
  .actif{
    background-color: #D0F5BD;
  }
  .non-actif{
    background-color: #F5CABD;
  }

</style>
