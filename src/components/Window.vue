<template>
  <div :ref="'window-'+window.id" class="window" :style="'width:'+window.width+'%;height:'+window.height+'%;left:'+window.posX+'%;top:'+window.posY+'%'">
    <div>
      <iframe :id="'iframe-'+window.id" :ref="'iframe-'+window.id" :src="window.url" frameBorder="0"></iframe>
      <router-link :to="{ name: 'Fullscreen', params: { url: window.url}}" ></router-link>
      <b-button squared v-b-modal.edit-modal v-on:click="editModal(window)" variant="warning">Modifier</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Window',
  props: {
    window: Object,
    editModal: Function,
    iframeState: Function
  },
  mounted: function () {
    this.$refs['iframe-'+this.window.id].onload = this.getIframeState()
  },
  methods: {
    getIframeState: function () {
      console.log('test')
      this.window.loaded = Promise.resolve(true)
      
      this.iframeState(this.window.id)
    }
  }
}
</script>
<style lang="scss" scoped>
  .window{
    position: absolute;
    & iframe {
      width: 100%;
      height: 100%;
    }
    & div{
      position: relative;
      width: 100%;
      height: 100%;
    }
    & button {
      position: absolute;
      top: 0;
      right: 0;
    }
    & a {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
</style>
