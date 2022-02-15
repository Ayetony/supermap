<template>
  <div v-show="true">
    <ul>
      <li>PM2.5<a>{{ equip.env.pm25 }}</a></li>
      <li>温度<a>{{ equip.env.pm25 }}</a></li>
      <li>湿度<a>{{ equip.env.pm25 }}</a></li>
      <li>风速风向<a>{{ equip.env.pm25 }}</a></li>
      <li>降雨量<a>{{ equip.env.pm25 }}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "envToolPane",
  props: {
    equip: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
ul{
  text-align: left;
  background-color: #1c1717;
  opacity: 0.35;
  font-size: 12px;
  line-height: 12px;
  width: 120px;
  height: 140px;
  top: 271px;
  list-style-image: url("");
  /*right: 698px;*/
  /*bottom: 69px;*/
  /*left: 258px;*/
  z-index: 2147483647;
  position: fixed;
}
a{
  text-align: ;
}
</style>
