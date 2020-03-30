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
    <b-button type="button" v-on:click="onSubmit()" variant="primary"><b-spinner ref="spinner" small type="grow"></b-spinner> Sauvegarder</b-button>
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
      background: null
    }
  },
  methods: {
    onSubmit: function () {
      this.$refs['spinner'].style.display = 'inline-block'
      const formData = new FormData()
      formData.append('image', this.background)
      formData.append('veille', this.$route.fullPath.includes('veille').toString())
      fetch(options.API_BACKGROUND_URL, {
        method: 'POST',
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
          this.$emit('backgroundUpdated', options.API_BACKGROUND_URL)
        }
        this.$refs['spinner'].style.display = ''
      }).catch(function(err){
        alert(err)
      })
    },
  }
}
</script>