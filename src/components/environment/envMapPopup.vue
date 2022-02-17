<template>
  <div v-show="getVuexVisible" class="envPopup">
    <BasicPopupFrame/>
    <div>
      <ul>
        <li>视频监控</li>
        <li>设备信息</li>
      </ul>
      <div v-show="showOfEquip" id="equip">
        <p style="margin-top: 0" v-for="equip_info in getDeviceInfo" :key="equip_info.equip_uniq_num">
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
        </p>
      </div>
      <div v-show="showOfRealTime" id="realtime">
        <p style="margin-top: 0" v-for="equip_info in getDeviceInfo" :key="equip_info.equip_uniq_num">
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BasicPopupFrame from "@/components/common/basicPopupFrame";
export default {
  name: "envMapPopup",
  components:{
    BasicPopupFrame
  },
  props:{
    markerArr:{
      type: Array
    }
  },
  data(){
    return {
      showOfEquip: true,
      showOfRealTime: false
    }
  },
  computed:{
    getVuexVisible(){
      return this.$store.state.visible;
    },
    getDeviceInfo() {
      return this.markerArr;
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.envPopup {
  height: 460px;
  width: 50%;
  opacity: 0.89;
  background: #1c1717;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483648;
  margin-left: -5%;
}
</style>
