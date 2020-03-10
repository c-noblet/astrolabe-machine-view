<template>
  <div id="floating-btn" class="floating-btn">
    <button><font-awesome-icon icon="plus" v-on:click="addWindow()"/></button>
  </div>
</template>
<script>
export default {
  methods: {
    addWindow: function () {
      console.log('create window')
    }
  }
}
</script>
<style lang="scss" scoped>
  .floating-btn{
    position: absolute;
    z-index: 999;
    bottom: 30px;
    right: 60px;
    & button {
      border-radius: 50%;
      background-color: var(--warning);
      border: 0;
      width: 50px;
      height: 50px;
      line-height: 50px;
      vertical-align: middle;
      color: white;
      padding: 0;
      &:active {
        background-color: var(--cyan);
      }
    }
  }
</style>
