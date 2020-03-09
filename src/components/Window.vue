<template>
  <div>
  <iframe :src = "url"> </iframe>
  </div>
</template>

<script>
export default {
    name: 'Window',
  props: {
    url: String,
    posY : Number,
    posX : Number,
    Long : Number,
    Lag : Number
  }
}
</script>
