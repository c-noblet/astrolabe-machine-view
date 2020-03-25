<template>
  <b-form>
    <b-form-group
      label="Importer une image:"
      label-for="bg-pic"
      class="mt-3"
    >
      <b-form-file
        id="bg-pic"
        v-model="background"
        :state="Boolean(background)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-form-group>
    <b-button type="button" v-on:click="onSubmit()" variant="primary">Sauvegarder</b-button>
  </b-form>
</template>
<script>
import options from '../../../options.env'
export default {
  data() {
    return {
      background: null
    }
  },
  methods: {
    onSubmit: function () {
      const formData = new FormData()
      formData.append('image', this.background)
      fetch(options.API_BACKGROUND_URL, {
        method: 'PUT',
        body: formData
      })
      .then((results) => results.json())
      .then(data => {
        if(typeof data.error !== 'undefined'){
          alert(data.error)
        }else{
          this.$emit('backgroundUpdated', data)
        }
      }).catch(function(err){
        alert(err)
      })
    },
  }
}
</script>