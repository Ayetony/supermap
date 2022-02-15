<template>
  <div>
    <ParkQuery :pageList="markerArr" @deviceInfo="showDeviceInfo"
               @deviceMarker="showDeviceMarker"/>
    <MapPopup :popupWindowDeviceId="popupWindowDeviceId" :markerArr="markerArr" :warnList="warnList"/>
    <Locator :markerArr="markerArr" @deviceMarkerEvent="getMarkerDeviceId" :iconColor="iconColor"/>
  </div>
</template>

<script>
import ParkQuery from "@/components/video/parkQuery";
import MapPopup from "@/components/video/mapPopup"
import Locator from '@/components/common/locator'

export default {
  name: 'Index',
  components: {
    Locator,
    ParkQuery, MapPopup
  },
  data() {
    return {
      iconColor: {
        warnColor: '#d32828',
        onlineColor: '#0868e5'
      },
      visible: false,
      popupWindowDeviceId: '',
      markerArr: [
        {
          name: "植物园",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM003",
          points: [51.5, -0.09],
          online_status: true
        },
        {
          name: "野猪林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM002",
          points: [51.53, -0.19],
          online_status: false
        },
        {
          name: "快活林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM004",
          points: [51.52, -0.14],
          online_status: true
        }, {
          name: "十字坡",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM001",
          points: [51.52, -0.124],
          online_status: false
        },
        {
          name: "狮子楼",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM005",
          points: [51.49, -0.06],
          online_status: true
        }
      ],
      warnList: [
        {
          warn_time: '2022/01/15 01:00:00',
          warn_detail: "告警信息触发",
          warn_handled: true
        },
        {
          warn_time: '2022/01/15 01:00:00',
          warn_detail: "告警信息触发",
          warn_handled: false
        },
        {
          warn_time: '2022/01/15 01:00:00',
          warn_detail: "告警信息触发",
          warn_handled: false
        },
        {
          warn_time: '2022/01/15 01:00:00',
          warn_detail: "告警信息触发",
          warn_handled: true
        },
        {
          warn_time: '2022/01/15 01:00:00',
          warn_detail: "告警信息触发",
          warn_handled: false
        },
        {
          warn_time: '2022/01/15 01:00:00',
          warn_detail: "告警信息触发",
          warn_handled: false
        },
        {
          warn_time: '2022/01/15 01:00:00',
          warn_detail: "告警信息触发",
          warn_handled: false
        },
        {
          warn_time: '2022/01/15 01:00:00',
          warn_detail: "告警信息触发",
          warn_handled: true
        },
        {
          warn_time: '2022/01/15 01:00:00',
          warn_detail: "告警信息触发",
          warn_handled: false
        }
      ]
    }
  },
  methods: {
    //展示device
    showDeviceInfo(deviceId) {
      document.getElementById(deviceId).style.border = "";
      this.visible = true;
      this.$store.commit("getVisible",this.visible)
      this.popupWindowDeviceId = deviceId;
    },
    //弹出指定deviceId marker
    showDeviceMarker(deviceId) {
      this.visible = false
      this.$store.commit("getVisible",this.visible)
      let _this = this;
      this.markerArr.filter((equip) => {
        if (equip.equip_uniq_num === deviceId) {
          let domMarker = document.getElementById(equip.equip_uniq_num);
          domMarker.style.border = "3px " + (equip.online_status ? _this.iconColor.onlineColor : _this.iconColor.warnColor).toString() + " dashed"
        }
      })
    },
    getMarkerDeviceId(deviceId){
      this.popupWindowDeviceId = deviceId;
    }
  },
  mounted() {
    this.$store.commit('getVideoClear', true)
  },
  watch:{
    '$store.state.visible'(newVal){
      this.visible = newVal
    },
    '$store.state.clearMap.videoClear'(newVal){
      console.log('marker remove',newVal)
      if(!newVal){
        if(this.$store.state.visible){
          this.$store.commit('getVisible', false)
        }
        this.markerArr.forEach((marker)=>{
          marker.marker.remove();
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
