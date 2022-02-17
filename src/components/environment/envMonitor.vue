<template>
  <div>
    <ParkQuery :pageList="markerArr" :showConditionDesc="true"/>
    <Locator :marker-arr="markerArr" :icon-color="iconColor" :columnName="currentColumn"/>
    <EnvMapPopup :markerArr="markerArr"/>
    <EnvToolPane :markerArr="markerArr" @envMarkerEvent="showDeviceMarker"/>
  </div>
</template>
<script>
import Locator from '@/components/common/locator'
import EnvToolPane from "@/components/environment/envToolPane";
import ParkQuery from  '@/components/video/parkQuery'
import EnvMapPopup from "@/components/environment/envMapPopup";
export default {
  name: "envMonitor",
  components: {
    Locator,
    EnvToolPane,
    ParkQuery,
    EnvMapPopup
  },
  data(){
    return{
      currentColumn: 'envClear',
      iconColor: {
        warnColor: '#ff0000',
        onlineColor: '#0868e5',
        earlyWarningColor: 'orange'
      },
      markerArr: [
        {
          name: "env-植物园",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM003",
          points: [51.5, -0.09],
          online_status: true,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        },
        {
          name: "env-野猪林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM002",
          points: [51.5, -0.19],
          online_status: false,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        },
        {
          name: "env-快活林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM004",
          points: [51.50, -0.14],
          online_status: true,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        }, {
          name: "env-十字坡",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM001",
          points: [51.52, -0.124],
          online_status: false,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        },
        {
          name: "env-狮子楼",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM005",
          points: [51.49, -0.06],
          online_status: true,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        }
      ],
    }
  },
  methods:{
    clearNextInit(){
      //清理上一次marker然后初始化
      for (let clearMapKey in this.$store.state.clearMap) {
        if(!this.$store.state.clearMap[clearMapKey]){
          if(!clearMapKey === this.$store.state.clearMap.envClear) {
            this.$store.commit('get' + clearMapKey.slice(0, 1).toUpperCase() + clearMapKey.slice(1), true)
          }
        }
      }
    },
    //弹出指定deviceId marker
    showDeviceMarker(deviceId) {
      console.log(this.$store.state.visible)
      if(!this.$store.state.visible) {
        this.$store.commit("getVisible", true)
      }
      return deviceId;
    }

  },
  mounted() {
    this.clearNextInit();
    if(!this.$store.state.parkShow){
      this.$store.commit('getParkShow', true);
    }
    if(this.$store.state.clearMap.envClear){
      this.$store.commit('getEnvClear', false)
    }
  },
  beforeDestroy() {
    if (this.$store.state.parkShow) {
      this.$store.commit('getParkShow', false)
    }
    this.markerArr.forEach((marker) => {
      marker.marker.remove();
    })
  }
}
</script>

<style scoped>

</style>
