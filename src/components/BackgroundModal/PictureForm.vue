<template>
  <b-form-group
    label="Importer une image:"
    label-for="bg-pic"
    class="mt-3"
  >
    <b-form-file
    id="bg-pic"
    v-model="background.picture"
    :state="Boolean(background.picture)"
    placeholder="Choose a file or drop it here..."
    drop-placeholder="Drop file here..."
    @input="updateValue(background.picture)"
  ></b-form-file>
  <div class="mt-3">Selected file: {{ background.picture ? background.picture.name : '' }}</div>
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