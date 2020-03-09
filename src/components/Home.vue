<template>
  <div>
    <ul>
      <li v-for="(item, index) in windows" :key="index">
        <Window 
          :url="item.url"
          :width="item.width"
          :height="item.height"
          :posX="item.posX"
          :posY="item.posY"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import Window from './Window.vue'
export default {
  name: 'Home',
  data () {
    return {
      windows: [
        { 
          url: 'http://www.lastrolabe.org/',
          width: 50,
          height: 50,
          posX: 0,
          posY: 0 
        },
        { 
          url: 'http://www.lastrolabe.org/',
          width: 50,
          height: 50,
          posX: 50,
          posY: 50  
        }
      ]
    }
  },
  components: {
    Window,
  }
}
</script>
<style lang="scss">
  
</style>
