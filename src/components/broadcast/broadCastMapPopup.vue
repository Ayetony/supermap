<template>
  <div v-show="getVuexVisible" class="broadCastPopup">
    <BasicPopupFrame/>
    <div>
      <div class="content">
        <p v-for="equip_info in getDeviceInfo" :key="equip_info.equip_uniq_num">
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
          设备名称：{{ equip_info.name }}<br/>

        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BasicPopupFrame from "@/components/common/basicPopupFrame";
export default {
  name: "broadCastPopup",
  components: {
    BasicPopupFrame
  },
  props: {
    markerArr: {
      type: Array
    },
    popupVisibleDeviceId: {
      type: String
    }
  },
  data() {
    return {
      defaultBackgroundColor: '#a7acc5',
      defaultColor: '#151010',
      equipBackgroundColor: '',
      equipColor: '',
      realTimeBackgroundColor: 'green',
      realTimeColor: 'white'
    }
  },
  computed: {
    getVuexVisible() {
      return this.$store.state.visible;
    },
    getDeviceInfo() {
      if (this.popupVisibleDeviceId) {
        return this.markerArr.filter((marker) => {
          if (marker.equip_uniq_num === this.popupVisibleDeviceId) {
            return marker;
          }
        })
      }
      return {};
    }
  }
}
</script>

<style scoped>
.broadCastPopup {
  height: 380px;
  width: 45%;
  opacity: 0.89;
  background: #3e3e41;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483647;
}
div > p {
  margin-top: -30px;
  padding: 45px;
  font-size: 12px;
  color: #e7e7e8;
  line-height: 30px;
  text-align: left;
  columns: 90px 3;
}
.content{
  border-top: #445dd7 1px solid;
  margin-top: -60px;
}
</style>
