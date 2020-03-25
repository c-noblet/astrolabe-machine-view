<template>
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
    @input="backgroundUpdate"
  ></b-form-file>
  <div class="mt-3">Selected file: {{ background ? background.name : '' }}</div>
  </b-form-group>
</template>
<script>
export default {
  props: {
    bg: String
  },
  data() {
    return {
      background: null
    }
  },
  mounted: function(){
    if(this.bg.substring(0,1) !== '#'){
      this.background = this.bg
      this.$refs['bg-pic'].value = this.bg
    }
  },
  methods: {
    backgroundUpdate: function() {
      this.$emit('backgroundUpdate', this.background)
    }
  }
}
</script>