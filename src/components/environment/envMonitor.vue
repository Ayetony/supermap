<template>
  <div>
    <ParkQuery :pageList="markerArr" :showConditionDesc="true" @deviceInfo="showDeviceInfo"
               @deviceMarker="showDeviceMarkerLocation"/>
    <EnvMapPopup :markerArr="markerArr" :popupVisibleDeviceId="popupVisibleDeviceId"/>
    <Locator v-if="rects" :columnName="currentColumn" :icon-color="iconColor" :marker-arr="markerArr"/>
    <EnvToolPane v-for="rect in markerArr"
                 :key="rect.equip_uniq_num"
                 :equipInfo="getEquipInfoById(rect.equip_uniq_num)"
                 :equip_uniq_num="rect.equip_uniq_num"
                 :precipitation="getEquipInfoById(rect.equip_uniq_num).env.precipitation"
                 :humidity="getEquipInfoById(rect.equip_uniq_num).env.humidity"
                 :temperature="getEquipInfoById(rect.equip_uniq_num).env.temperature"
                 :PM25="getEquipInfoById(rect.equip_uniq_num).env.pm25"
                 :wind="getEquipInfoById(rect.equip_uniq_num).env.wind"
                 @envMarkerEvent="showDeviceInfo"/>
  </div>
</template>
<script>
import Locator from '@/components/common/locator'
import EnvToolPane from "@/components/environment/envToolPane";
import ParkQuery from '@/components/video/parkQuery'
import EnvMapPopup from "@/components/environment/envMapPopup";
import L from "leaflet"

export default {
  name: "envMonitor",
  components: {
    Locator,
    EnvToolPane,
    ParkQuery,
    EnvMapPopup
  },
  data() {
    return {
      currentColumn: 'envClear',
      popupVisibleDeviceId: '',
      rects:[],
      iconColor: {
        warnColor: '#ff0000',
        onlineColor: '#0868e5',
      },
      markerArr: [
        {
          name: "env-植物园",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM003",
          points: [51.5, -0.09],
          online_status: true,
          env: {
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          },
          envRealTime: [
            {
              statusName: 'PM2.5',
              value: 26,
              unitName: '颗粒物',
              range: '0~500',
              status: 0,
            },
            {
              statusName: '温度',
              value: 35,
              unitName: '°C',
              range: '-10~40',
              status: 1
            },
            {
              statusName: '湿度',
              value: 60,
              unitName: '%RH',
              range: '0～1000',
              status: 2,
            },
            {
              statusName: '降雨量',
              value: 50,
              unitName: '毫米',
              range: '0～100',
              status: 1,
            },
            {
              statusName: '风速',
              value: '东北风一级',
              unitName: '级数',
              range: '0～30',
              status: 0,
            }
          ]
        },
        {
          name: "env-野猪林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM002",
          points: [51.5, -0.19],
          online_status: false,
          env: {
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          },
          envRealTime: [
            {
              statusName: 'PM2.5',
              value: 26,
              unitName: '颗粒物',
              range: '0~500',
              status: 0,
            },
            {
              statusName: '温度',
              value: 35,
              unitName: '°C',
              range: '-10~40',
              status: 1
            },
            {
              statusName: '湿度',
              value: 60,
              unitName: '%RH',
              range: '0～1000',
              status: 1,
            },
            {
              statusName: '降雨量',
              value: 50,
              unitName: '毫米',
              range: '0～100',
              status: 2,
            },
            {
              statusName: '风速',
              value: '东北风一级',
              unitName: '级数',
              range: '0～30',
              status: 0,
            }
          ]

        },
        {
          name: "env-快活林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM004",
          points: [51.50, -0.14],
          online_status: true,
          env: {
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          },
          envRealTime: [
            {
              statusName: 'PM2.5',
              value: 26,
              unitName: '颗粒物',
              range: '0~500',
              status: 0,
            },
            {
              statusName: '温度',
              value: 35,
              unitName: '°C',
              range: '-10~40',
              status: 1
            },
            {
              statusName: '湿度',
              value: 60,
              unitName: '%RH',
              range: '0～1000',
              status: 2,
            },
            {
              statusName: '降雨量',
              value: 50,
              unitName: '毫米',
              range: '0～100',
              status: 2,
            },
            {
              statusName: '风速',
              value: '东北风一级',
              unitName: '级数',
              range: '0～30',
              status: 0,
            }
          ]

        }, {
          name: "env-十字坡",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM001",
          points: [51.52, -0.124],
          online_status: false,
          env: {
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          },
          envRealTime: [
            {
              statusName: 'PM2.5',
              value: 26,
              unitName: '颗粒物',
              range: '0~500',
              status: 0,
            },
            {
              statusName: '温度',
              value: 35,
              unitName: '°C',
              range: '-10~40',
              status: 1
            },
            {
              statusName: '湿度',
              value: 60,
              unitName: '%RH',
              range: '0～1000',
              status: 2,
            },
            {
              statusName: '降雨量',
              value: 50,
              unitName: '毫米',
              range: '0～100',
              status: 0,
            },
            {
              statusName: '风速',
              value: '东北风一级',
              unitName: '级数',
              range: '0～30',
              status: 0,
            }
          ]

        },
        {
          name: "env-狮子楼",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM005",
          points: [51.49, -0.06],
          online_status: true,
          env: {
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          },
          envRealTime: [
            {
              statusName: 'PM2.5',
              value: 26,
              unitName: '颗粒物',
              range: '0~500',
              status: 0,
            },
            {
              statusName: '温度',
              value: 35,
              unitName: '°C',
              range: '-10~40',
              status: 1
            },
            {
              statusName: '湿度',
              value: 60,
              unitName: '%RH',
              range: '0～1000',
              status: 2,
            },
            {
              statusName: '降雨量',
              value: 50,
              unitName: '毫米',
              range: '0～100',
              status: 2,
            },
            {
              statusName: '风速',
              value: '东北风一级',
              unitName: '级数',
              range: '0～30',
              status: 0,
            }
          ]

        }
      ],
    }
  },
  methods: {
    clearNextInit() {
      //清理上一次marker然后初始化
      for (let clearMapKey in this.$store.state.clearMap) {
        if (!this.$store.state.clearMap[clearMapKey]) {
          if (!clearMapKey === this.$store.state.clearMap.envClear) {
            this.$store.commit('get' + clearMapKey.slice(0, 1).toUpperCase() + clearMapKey.slice(1), true)
          }
        }
      }
    },
    //弹出指定deviceId marker info
    showDeviceInfo(deviceId) {
      if (!this.$store.state.visible) {
        this.$store.commit("getVisible", true)
      }
      this.popupVisibleDeviceId = deviceId
    },
    //弹出指定deviceId marker location
    showDeviceMarkerLocation(deviceId) {
      if (!this.$store.state.visible) {
        this.$store.commit("getVisible", false)
      }
      this.markerArr.filter((equip) => {
        if (equip.equip_uniq_num === deviceId) {
          const domMarker = L.DomUtil.get(equip.equip_uniq_num).parentElement;
          domMarker.style.border = "3px " + (equip.online_status ? this.iconColor.onlineColor : this.iconColor.warnColor) + " dashed"
        }
      })
    },
    getEquipInfoById(markerId) {
      const markers = this.markerArr.filter((marker) => {
        if (marker.equip_uniq_num === markerId) {
          return marker;
        }
      })
      return markers[0];
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
      this.$store.commit('getEnvClear', false)
    }
  },
  beforeDestroy() {
    if (this.$store.state.parkShow) {
      this.$store.commit('getParkShow', false);
    }
    this.markerArr.forEach((marker) => {
      marker.marker.remove();
    })
  }
}
</script>

<style scoped>

</style>
