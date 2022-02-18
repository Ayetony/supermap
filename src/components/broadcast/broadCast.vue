<template>
  <div>
    <ParkQuery :pageList="markerArr" :showConditionDesc="true" @deviceInfo="showDeviceInfo" @deviceMarker="showDeviceMarkerLocation"/>
    <Locator :columnName="currentColumn" :icon-color="iconColor" :marker-arr="markerArr"/>
  </div>
</template>
<script>
import ParkQuery from '@/components/video/parkQuery'
import Locator from '@/components/common/locator'
export default {
  name: "BroadCast",
  components:{
    ParkQuery,
    Locator
  },
  data(){
    return {
      currentColumn: 'broadCastClear',
      iconColor: {
        warnColor: '#ff0000',
        onlineColor: '#0868e5',
      },
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
        },
        {
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
      ]
    }
  },
  methods:{
    showDeviceInfo(){},
    showDeviceMarkerLocation(){}
  }
}
</script>

<style scoped>

</style>
