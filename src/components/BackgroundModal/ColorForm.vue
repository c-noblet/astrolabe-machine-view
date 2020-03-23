<template>
  <b-form-group
    label="Entrez la couleur au format RGB:"
    label-for="bg-r"
  >
    <b-form-input
      id="bg-r"
      v-model="background.red"
      type="text"
      required
      placeholder="Rouge"
      @input="updateValue(background)"
    ></b-form-input>
    <b-form-input
      id="bg-g"
      v-model="background.green"
      type="text"
      required
      placeholder="Vert"
      @input="updateValue(background)"
    ></b-form-input>
    <b-form-input
      id="bg-b"
      v-model="background.blue"
      type="text"
      required
      placeholder="Bleu"
      @change="updateValue(background)"
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