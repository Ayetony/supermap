<template>
  <div>
    <ul v-for="rect in getRects" :key="rect.equip_uniq_num" :style="{left: rect.left+'px',
    right: rect.right+'px',
    top: rect.top+'px',
    bottom: rect.bottom+'px'}" class="pane">
    hello
<!--      <li v-if="getMarker(rect.equip_uniq_num).equip_uniq_num === rect.equip_uniq_num">设备状态:</li>-->
<!--      <li>-->
<!--        <div class="env-color"></div>&nbsp;PM2.5<a>{{ getMarker(rect.equip_uniq_num).env.pm25 }}</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <div class="env-color"></div>&nbsp;温度<a>{{ getMarker(rect.equip_uniq_num).env.temperature }}</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <div class="env-color"></div>&nbsp;湿度<a>{{ getMarker(rect.equip_uniq_num).env.humidity }}</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <div class="env-color"></div>&nbsp;风速风向<a>{{ getMarker(rect.equip_uniq_num).env.wind }}</a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <div class="env-color"></div>&nbsp;降雨量<a>{{ getMarker(rect.equip_uniq_num).env.precipitation }}</a>-->
<!--      </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: "envToolPane",
  props: {
    markerArr: {
      type: Array
    }
  },
  computed: {
    getRects() {
      return this.$store.state.rects;
    },
    getMarker() {
      return function (markerId) {
        const markers = this.markerArr.filter((marker) => {
          if (marker.equip_uniq_num === markerId) {
            return marker;
          }
        })
        return markers[0];
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.pane {
  margin-top: -5px;
  padding-top: 5px;
  list-style-type: none;
  text-align: left;
  background-color: #1c1717;
  opacity: 0.65;
  font-size: 8px;
  line-height: 18px;
  width: 110px;
  height: 120px;
  color: white;
  z-index: 2147483647;
  position: fixed;
}

li {
  margin-left: -35px;
}

a {
  margin-left: 10px;
}

.env-color {
  float: left;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: #15d81d;
  padding: 0;
  /*margin-top: 0px;*/
  /*background-color: #ff0000;*/
  /*#15d81d*/
}
</style>
