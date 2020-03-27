<template>
  <div :ref="'window-'+window.id" class="window" :style="'width:'+window.width+'%;height:'+window.height+'%;left:'+window.posX+'%;top:'+window.posY+'%'">
    <div>
      <iframe v-if="window.youtube" :onload="iframeloaded()" :ref="'iframe-'+window.id" :src="'https://www.youtube.com/embed/'+playlistUrl+window.url+autoplay"  frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
      <iframe v-if="!window.youtube" :onload="iframeloaded()" :ref="'iframe-'+window.id" :src="window.url" frameborder="0"></iframe>
      <router-link v-if="!window.youtube" class="fullscreen" :to="{ name: 'Fullscreen', params: { url: window.url}}"></router-link>
      <router-link class="btn btn-warning" v-if="editMode" :to="{ name: 'EditWindow', params: { windowId: window.id.toString()}}" squared v-b-modal.modal>Modifier</router-link>
    </div><iframe width="560" height="315" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
</template>
<script>
export default {
  name: 'Window',
  props: {
    window: Object,
    editMode: Boolean,
  },
  data() {
    return {
      playlistUrl: '',
      autoplay: '?autoplay=1'
    }
  },
  created: function () {
    if(this.window.playlist){
      this.playlistUrl = 'videoseries?list='
      this.autoplay = '&autoplay=1'
    }
  },
  methods:{
    iframeloaded: function () {
      this.$emit('iframeLoaded', this.window.id)
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
