<template>
  <div id="app">
    <router-view
      :editMode="editMode"
      :state="state"
    ></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editMode: false,
      state: true
    }
  },
  mounted: function () {
    if(this.$route.fullPath.includes('/edit')){
      this.editMode = true
    }
  }
}
</script>
