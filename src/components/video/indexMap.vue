<template>
  <div>
    <ParkQuery :pageList="markerArr" @deviceInfo="showDeviceInfo" :showConditionDesc="false"
               @deviceMarker="showDeviceMarkerLocation"/>
    <MapPopup :markerArr="markerArr" :popupWindowDeviceId="popupWindowDeviceId" :warnList="warnList"/>
    <Locator :columnName="currentColumn" :iconColor="iconColor" :markerArr="markerArr"
             @deviceMarkerEvent="getMarkerDeviceId" @popupVisibleEvent="showDeviceInfo"/>
  </div>
</template>

<script>
import ParkQuery from "@/components/common/parkQuery";
import MapPopup from "@/components/video/mapPopup"
import Locator from '@/components/common/locator'

export default {
  name: 'Index',
  components: {
    Locator,
    ParkQuery,
    MapPopup
  },
  data() {
    return {
      currentColumn: 'videoClear',
      iconColor: {
        warnColor: '#ff0000',
        onlineColor: '#0868e5'
      },
      popupWindowDeviceId: '',
      markerArr: [
        {
          name: "植物园",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM003",
          points: [-3222.966523, 1988.32375],
          online_status: true
        },
        {
          name: "野猪林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM002",
          points: [-3095.994378, 4093.623593],
          online_status: false
        },
        {
          name: "快活林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM004",
          points: [-4289.35579, 4676.159877],
          online_status: true
        }, {
          name: "十字坡",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM001",
          points: [-3625.636987, 5403.489374],
          online_status: false
        },
        {
          name: "狮子楼",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM005",
          points: [-3995.455468, 6356.389942],
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
    //框图 via device id
    showDeviceInfo(deviceId) {
      document.getElementById(deviceId).style.border = "";
      this.visible = true;
      this.$store.commit("getVisible", this.visible)
      this.popupWindowDeviceId = deviceId;
    },
    //弹出指定deviceId marker location
    showDeviceMarkerLocation(deviceId) {
      if(this.$store.state.visible) {
        this.$store.commit("getVisible", false)
      }
      let _this = this;
      this.markerArr.filter((equip) => {
        if (equip.equip_uniq_num === deviceId) {
          let domMarker = document.getElementById(equip.equip_uniq_num);
          if(document.getElementById(equip.equip_uniq_num).style.border === ""){
            domMarker.style.border = "3px " + (equip.online_status ? _this.iconColor.onlineColor : _this.iconColor.warnColor).toString() + " dashed"
          }else {
            document.getElementById(equip.equip_uniq_num).style.border = "";
          }
        }
      })
    },
    getMarkerDeviceId(deviceId) {
      this.popupWindowDeviceId = deviceId;
    },
    clearNextInit() {
      //默认关闭popup
      if(this.$store.state.visible){
        this.$store.commit('getVisible', false)
      }
      //清理上一次marker然后初始化
      for (let clearMapKey in this.$store.state.clearMap) {
        if (!this.$store.state.clearMap[clearMapKey]) {
          if (!clearMapKey === this.$store.state.clearMap.videoClear) {
            this.$store.commit('get' + clearMapKey.slice(0, 1).toUpperCase() + clearMapKey.slice(1), true)
          }
        }
      }
    }
  },
  mounted() {
    this.clearNextInit()
    if (this.$store.state.clearMap.videoClear) {
      this.$store.commit('getVideoClear', false);
    }
  },
  beforeDestroy() {
    this.markerArr.forEach((marker) => {
      marker.marker.remove();
    })
  }
}
</script>

<style scoped>
</style>
