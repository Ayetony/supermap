<template>
  <div v-show="getVuexVisible" class="envPopup">
    <BasicPopupFrame/>
    <div class="content">
      <ul>
        <li :style="{backgroundColor: realTimeBackgroundColor, color: realTimeColor}" @click="handleRealTime">
          <p>实时信息</p></li>
        <li :style="{backgroundColor: equipBackgroundColor, color: equipColor}" @click="handleEquip"><p>设备信息</p></li>
        <li></li>
      </ul>
      <div v-show="showOfEquip">
        <p v-for="equip_info in getDeviceInfo" :key="equip_info.equip_uniq_num">
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
        </p>
      </div>
      <div v-show="showOfRealTime" class="realtime">
        <p>
          <el-table :cell-style="{backgroundColor: '#151010'}" :data="getRealTimeInfo"
                    :header-cell-style="{background: '#151010',lineHeight: '8px'}"
                    size="mini"
                    style="width: 100%;background: #151010;color: #b2b2b2">
            <el-table-column label="项目" prop="statusName" width="100">
            </el-table-column>
            <el-table-column label="数值" prop="value" width="100">
            </el-table-column>
            <el-table-column label="单位" prop="unitName" width="100">
            </el-table-column>
            <el-table-column label="范围" prop="range" width="100">
            </el-table-column>
            <el-table-column label="状态" prop="status" width="100">
              <template slot-scope="scope">
                <ColorOption color="#15d81d" marginTop="3px" v-if="+scope.row.status === 0"/>
                <ColorOption color="#ff0000" marginTop="3px" v-if="+scope.row.status === 2"/>
                <ColorOption color="#FF7200" marginTop="3px" v-if="+scope.row.status === 1"/>
              </template>
            </el-table-column>
          </el-table>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BasicPopupFrame from "@/components/common/basicPopupFrame";
import ColorOption from "@/components/common/colorOption"
export default {
  name: "envMapPopup",
  components: {
    BasicPopupFrame,
    ColorOption
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
      showOfEquip: false,
      showOfRealTime: true,
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
    },
    getRealTimeInfo() {
      if (this.popupVisibleDeviceId && this.showOfRealTime) {
        const realtimeArr = this.markerArr.filter((marker) => {
          if (marker.equip_uniq_num === this.popupVisibleDeviceId) {
            return marker;
          }
        })
        return realtimeArr[0].envRealTime;
      }
      return []
    }
  },
  methods: {
    handleRealTime() {
      this.showOfEquip = false;
      this.equipBackgroundColor = this.defaultColor.backgroundColor;
      this.equipColor = this.defaultColor.color;
      this.showOfRealTime = true;
      this.realTimeBackgroundColor = 'green';
      this.realTimeColor = 'white';
    },
    handleEquip() {
      this.showOfRealTime = false
      this.realTimeBackgroundColor = this.defaultColor.backgroundColor;
      this.realTimeColor = this.defaultColor.color;
      this.showOfEquip = true;
      this.equipBackgroundColor = 'green';
      this.equipColor = 'white';
    }
  }
}
</script>

<style scoped>
.envPopup {
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
.content {
  margin-top: -65px;
}
li {
  font-size: 12px;
  font-weight: bold;
  line-height: 0;
  background-color: #a7acc5;
  border-right: 1px #445dd7 solid;
  color: #151010;
  list-style-type: none;
  height: 30px;
  width: 30%;
  float: left;
}

ul{
  text-align: center;
  margin-left:3.3%!important;
}

li > p {
  width: 100%;
  height: 20px;
  padding: 10px;
  text-align: center;
  margin-top: 5px;
  margin-left: -10px;
}
div > p {
  padding: 45px;
  font-size: 12px;
  color: #e7e7e8;
  line-height: 25px;
  text-align: left;
}
</style>
