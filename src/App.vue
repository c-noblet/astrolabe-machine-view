<template>
  <div id="app" style="background-color">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      background: {
        red: '',
        green: '',
        blue: ''
      }
    }
  },
}
</script>
