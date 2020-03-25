<template>
  <b-form-group
    label="Choisissez une couleur:"
    label-for="bg-color"
  >
    <b-form-input
      ref="bg-color"
      id="bg-color"
      type="color"
      required
      placeholder="#ffffff"
      class="w-25 form-control"
      @change="$emit('backgroundUpdate',this.$refs['bg-color'].value)"
    ></b-form-input>
  </b-form-group>
</template>
<script>
export default {
  props: {
    bg: String
  },
  data(){
    return {
      background: this.bg
    }
  },
  mounted: function(){
    this.$refs['bg-color'].value = this.background
  }
}
</script>