<template>
  <b-form-group
    label="Choisissez une couleur:"
    label-for="bg-color"
  >
    <input
      ref="bg-color"
      id="bg-color"
      type="color"
      required
      placeholder="#ffffff"
      class="w-25 form-control"
      @input="backgroundUpdate"
    />
  </b-form-group>
</template>
<script>
export default {
  props: {
    bg: String
  },
  data() {
    return {
      background: ''
    }
  },
  mounted: function(){
    this.$refs['bg-color'].value = this.bg
  },
  methods: {
    backgroundUpdate: function(event) {
      this.background = event.target.value
      this.$emit('backgroundUpdate', this.background)
    }
  }
}
</script>