<template>
  <div v-show="true">
    <ul  class="pane">
      <li>设备状态:</li>
      <span style="color: #04c5f6" @click="getEnvById(this.popupVisibleDeviceId)">更多详情</span>
    </ul>
  </div>
</template>

<script>
// import L from 'leaflet'
export default {
  name: "broadCastPane",
  components: {
  },
  data() {
    return {
      left: '',
      right: '',
      top: '',
      bottom: '',
      props:{
        popupVisibleDeviceId:{
          type: String
        }
      }
    }
  },
  methods: {
    getEnvById(equip_uniq_num) {
      console.log(equip_uniq_num)
      this.$emit('envMarkerEvent', equip_uniq_num)
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
  z-index: 2147483647;
  margin-left: 5px;
  position: fixed;
}
</style>
