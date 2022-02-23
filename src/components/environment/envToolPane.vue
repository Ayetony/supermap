<template>
  <div style="display: none" :id="equip_uniq_num">
    <ul style="padding-top: 5px;
  list-style-type: none;
  text-align: left;
  font-size: 12px;
  line-height: 18px;
  width: 110px;
  height: 135px;
  margin-left: 5px;position: relative">
      <li>设备状态:</li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;PM2.5<a>{{ this.PM25 }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;温度<a>{{ this.temperature }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;湿度<a>{{ this.humidity }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;风速风向<a>{{ this.wind }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;降雨量<a>{{ this.precipitation }}</a>
      </li>
      <span style="color: #04c5f6" :id="equip_uniq_num+'detail'">更多详情</span>
    </ul>
  </div>
</template>

<script>
import ColorOption from '@/components/common/colorOption'

export default {
  name: "envToolPane",
  components: {
    ColorOption
  },
  props: ['PM25', 'temperature', 'humidity', 'wind', 'precipitation', 'equip_uniq_num', 'equipInfo'],
  methods: {
    getEnvById(envId) {
      this.$emit('envMarkerEvent', envId)
    }
  }
}
</script>

<style scoped>
li{
margin-left: -35px;
}
li>a{
  margin-left: 10px;
  color: white;
}
</style>
