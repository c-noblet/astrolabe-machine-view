<template>
  <div>
  <Window :url="'https://www.lastrolabe.org/'"/>
  </div>
</template>
<script>
  import Window from './Window.vue'
export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    Window,
  }
}
</script>
<style lang="scss">
  
</style>
