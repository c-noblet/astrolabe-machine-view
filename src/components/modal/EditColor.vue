<template>
  <b-form>
    <b-form-group
      label="Choisissez une couleur:"
      label-for="bg-color"
    >
      <input
        id="bg-color"
        type="color"
        required
        class="w-25 form-control"
        v-model="background"
      />
    </b-form-group>
    <b-button type="button" v-on:click="onSubmit()" variant="primary"><b-spinner ref="spinner" small type="grow"></b-spinner> Sauvegarder</b-button>
  </b-form>
</template>
<script>
import options from '../../../options.env'
export default {
  props: {
    apiToken: String,
    color: String
  },
  data() {
    return {
      background: this.color
    }
  },
  methods: {
    onSubmit: function () {
      this.$refs['spinner'].style.display = 'inline-block'
      const formData = new FormData()
      formData.append('color', this.background.toString())
      formData.append('veille', this.$route.fullPath.includes('veille').toString())
      fetch(options.API_BACKGROUND_URL, {
        method: 'POST',
        headers: {
          'X-Auth-Token': this.apiToken
        },
        body: formData
      })
      .then((results) => results.json())
      .then((data) => {
        this.$emit('backgroundUpdated', data)
        this.$emit('closeModal', true)
        this.$refs['spinner'].style.display = ''
      })
    }
  }
}
</script>