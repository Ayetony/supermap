<template>
  <div>
    <ul v-for="rect in getRects" :key="rect.equip_uniq_num" :style="{left: rect.left+'px',top: rect.top+'px'}"
        class="pane">
      <li>设备状态:</li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;PM2.5<a>{{ getMarkerById(rect.equip_uniq_num).env.pm25 }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;温度<a>{{ getMarkerById(rect.equip_uniq_num).equip_uniq_num }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;湿度<a>{{ getMarkerById(rect.equip_uniq_num).env.humidity }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;风速风向<a>{{ getMarkerById(rect.equip_uniq_num).env.wind }}</a>
      </li>
      <li>
        <div class="env-color"></div>&nbsp;降雨量<a>{{ getMarkerById(rect.equip_uniq_num).env.precipitation }}</a>
      </li>
      <span style="color: #04c5f6" @click="getEnvById(rect.equip_uniq_num)">更多详情</span>
    </ul>
  </div>
</template>

<script>
import ColorOption from '@/components/common/colorOption'
export default {
  name: "envToolPane",
  components:{
    ColorOption
  },
  props: {
    markerArr: {
      type: Array
    }
  },
  computed: {
    getRects() {
      return JSON.parse(this.$store.state.rectsJson)
    },
    getMarkerById() {
      return markerId => {
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
  },
  methods: {
    getEnvById(envId) {
      this.$emit('envMarkerEvent', envId)
      console.log(envId)
    }
  }
}
</script>

<style scoped>
.pane {
  margin-top: 45px;
  padding-top: 5px;
  list-style-type: none;
  text-align: left;
  background-color: #1c1717;
  opacity: 0.65;
  font-size: 8px;
  line-height: 18px;
  width: 110px;
  height: 135px;
  color: white;
  z-index: 2147483646;
  margin-left: 5px;
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
