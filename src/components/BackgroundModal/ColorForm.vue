<template>
  <b-form-group
    label="Entrez la couleur:"
    label-for="bg-color"
  >
    <b-form-input
      id="bg-color"
      v-model="background.color"
      type="text"
      required
      placeholder="#ffffff"
      @input="updateValue(background)"
    ></b-form-input>
  </b-form-group>
</template>
<script>
export default {
  props: {
    bg: Object
  },
  data() {
    return {
      background: this.bg
    }
  },
  methods: {
    updateValue: function (value) {
      console.log('emit')
      this.$parent.$emit('backgroundUpdate', value);
    }
  }
}
</script>