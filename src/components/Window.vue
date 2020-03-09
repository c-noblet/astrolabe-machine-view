<template>
  <div class="window" :style="'width:'+width+'%;height:'+height+'%;left:'+posX+'%;top:'+posY+'%'">
    <div>
      <b-button v-b-modal.edit-modal v-on:click="editModal(window)" variant="warning">Modifier</b-button>
      <iframe :src="url"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Window',
  props: {
    index: Number,
    url: String,
    width : Number,
    height : Number,
    posX : Number,
    posY : Number,
    editModal: Function
  },
  data () {
    return {
      window: {
        index: this.index,
        url: this.url,
        width : this.width,
        height : this.height,
        posX : this.posX,
        posY : this.posY
      }
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
  }
</style>