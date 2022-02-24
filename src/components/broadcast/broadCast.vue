<template>
  <div>
    <ParkQuery :pageList="markerArr"
               @deviceInfo="showSpeakerDetail"
               @deviceMarker="showDeviceMarkerLocation"/>
    <BroadCastPopup :markerArr="markerArr"
                    :popupVisibleDeviceId="popupVisibleDeviceId"/>
    <Locator :columnName="currentColumn"
             :iconColor="iconColor"
             :markerArr="markerArr"
             @closeSpeakerPane="closeSpeakerPane"/>
    <BroadCastPane @deviceInfo="showSpeakerDetail" ref="speaker"  :markerArr="markerArr"/>

  </div>
</template>
<script>
import L from 'leaflet'
import ParkQuery from '@/components/common/parkQuery'
import Locator from '@/components/common/locator'
import BroadCastPane from '@/components/broadcast/broadCastPane'
import BroadCastPopup from '@/components/broadcast/broadCastMapPopup'

export default {
  name: "BroadCast",
  components: {
    ParkQuery,
    Locator,
    BroadCastPopup,
    BroadCastPane
  },
  data() {
    return {
      currentColumn: 'broadCastClear',
      popupVisibleDeviceId: '',
      showOfSpeaker: false,
      iconColor: {
        warnColor: '#ff0000',
        onlineColor: '#0868e5',
      },
      markerArr: [
        {
          name: "植物园",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM003",
          points: [-3584.083394, 3589.714763],
          online_status: true,
          volume: 0.2,
        },
        {
          name: "灵隐寺",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM002",
          points: [-4341.123579, 2310.478384],
          online_status: false,
          volume: 0.21,
        },
        {
          name: "清波门",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM004",
          points: [-4080.075239, 3898.645997],
          online_status: true,
          volume: 0.9
        },
        {
          name: "牡丹亭",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM001",
          points: [-3262.123774, 4816.737412],
          online_status: false,
          volume: 0.9

        },
        {
          name: "秋鸣山",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM005",
          points: [-4519.506611, 3406.754093],
          online_status: true,
          volume: 0.88
        }
      ]
    }
  },
  methods: {
    speakerNextTick() {
      const _this = this
      this.$nextTick(() => {
        this.$refs.speaker.initSpeakerPane(_this.showOfSpeaker);
      })
    },
    showSpeakerDetail(deviceId) {
      if (!this.$store.state.visible) {
        this.$store.commit("getVisible", true)
      }
      this.popupVisibleDeviceId = deviceId
    },
    closeSpeakerPane() {
      if (this.showOfSpeaker) {
        this.showOfSpeaker = false;
      }
      this.speakerNextTick();
    },
    showDeviceMarkerLocation(deviceId) {
      //避免定位图片被遮罩
      if (!this.$store.state.visible) {
        this.$store.commit("getVisible", false)
      }
      let _this = this;
      this.markerArr.filter((equip) => {
        if (equip.equip_uniq_num === deviceId) {
          const domMarker = L.DomUtil.get(equip.equip_uniq_num);
          if (document.getElementById(equip.equip_uniq_num).style.border === "") {
            domMarker.style.border = "3px " + (equip.online_status ? _this.iconColor.onlineColor : _this.iconColor.warnColor).toString() + " dashed"
          } else {
            document.getElementById(equip.equip_uniq_num).style.border = "";
          }
        }
      })
    },
    clearNextInit() {
      //清理上一次marker然后初始化
      for (let clearMapKey in this.$store.state.clearMap) {
        if (!this.$store.state.clearMap[clearMapKey]) {
          if (!clearMapKey === this.$store.state.clearMap.envClear) {
            this.$store.commit('get' + clearMapKey.slice(0, 1).toUpperCase() + clearMapKey.slice(1), true)
          }
        }
      }
    }
  },
  mounted() {
    this.clearNextInit();
    if (!this.$store.state.parkShow) {
      this.$store.commit('getParkShow', true);
    }
    if (this.$store.state.visible) {
      this.$store.commit('getVisible', false);
    }
    if (this.$store.state.clearMap.envClear) {
      this.$store.commit('getBroadCastClear', false)
    }
    // 理论上可以直接自定义事件
    const _this = this
    this.$bus.on('broadCastMarkerEvent', function (equip_uniq_num) {
      _this.showSpeakerDetail(equip_uniq_num);
    })
  },
  beforeDestroy() {
    this.$bus.off('broadCastMarkerEvent')
  }
}
</script>

<style scoped>

</style>
