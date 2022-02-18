<template>
  <div class="env-color" :style="{backgroundColor: color,marginTop: marginTop}"></div>
</template>

<script>
export default {
  name: "colorOption",
  props:['color','marginTop'],
}
</script>

<style scoped>
.env-color {
  float: left;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  /*background-color: #15d81d;*/
  padding: 0;
  /*margin-top: 0px;*/
  /*background-color: #ff0000;*/
  /*#15d81d*/
}
</style>
