<template>
  <div id="app">
    <router-view
      :editMode="editMode"
    ></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editMode: false
    }
  },
  mounted: function () {
    if(this.$route.fullPath.includes('/edit')){
      this.editMode = true
    }
  }
}
</script>
