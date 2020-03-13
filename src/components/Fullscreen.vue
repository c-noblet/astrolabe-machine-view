<template>
  <div>
    <iframe :src="url" frameborder="0"></iframe>
    <router-link class="btn btn-primary" to="/">Retour</router-link>
  </div>
</template>
<script>
export default {
  name: 'Fullscreen',
  props: {
    url: String
  }
}
</script>
<style lang="scss" scoped>
  iframe{
    width: 100vw;
    height: 100vh;
  }
  a {
      position: absolute;
      top: 15px;
      left: 15px;
    }
</style>