<template>
  <div class="window" :style="'width:'+width+'%;height:'+height+'%;left:'+posY+'%;top:'+posY+'%'">
    <div>
      <b-button variant="warning">Modifier</b-button>
      <iframe :src="url"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Window',
  props: {
    url: String,
    posY : Number,
    posX : Number,
    width : Number,
    height : Number
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