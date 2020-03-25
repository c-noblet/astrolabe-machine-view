<template>
  <div :ref="'window-'+window.id" class="window" :style="'width:'+window.width+'%;height:'+window.height+'%;left:'+window.posX+'%;top:'+window.posY+'%'">
    <div>
      <iframe :id="'iframe-'+window.id" :ref="'iframe-'+window.id" :src="window.url" frameBorder="0"></iframe>
      <router-link class="fullscreen" :to="{ name: 'Fullscreen', params: { url: window.url}}"></router-link>
      <router-link class="btn btn-warning" v-if="editMode" :to="{ name: 'EditWindow', params: { windowId: window.id.toString()}}" squared v-b-modal.modal>Modifier</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Window',
  props: {
    window: Object,
    editMode: Boolean
  },
  mounted: function () {
    this.$refs['iframe-'+this.window.id].onload = this.$emit('iframeLoaded', this.window.id)
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
    & .btn {
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0 !important;
    }
    & .fullscreen {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
</style>
