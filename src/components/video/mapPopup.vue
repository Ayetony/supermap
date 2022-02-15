<template>
  <div v-show="getVuexVisible" id="popup-window">
    <BasicPopupFrame/>
    <div style="margin-top: -60px;">
      <ul>
        <li name="isCamera"><p @click="handleTitle">视频监控</p></li>
        <li name="isEquip"><p id="mid" @click="handleTitle">设备信息</p></li>
        <li name="isWarn"><p @click="handleTitle">告警信息</p></li>
      </ul>
      <br/>
      <div v-show="showOfEquip" id="content">
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
        </p>
      </div>
      <div v-show="showOfWarn" id="warn">
        <el-table size="mini" style="width: 85%;line-height: 10px" height="280px"
                  :header-cell-style="{ background: '#1c1717'}"
                  :cell-style="{backgroundColor: '#1c1717',padding: '0',borderBottom: '0'}"
                  :data="warnList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
          <el-table-column label="告警时间" prop="warn_time" width="200">
          </el-table-column>
          <el-table-column  label="告警信息" width="350">
            <template slot-scope="scope">
              <p style="color: red">{{ scope.row.warn_detail }}</p>
            </template>
          </el-table-column>
          <el-table-column label="处理结果" width="80">
            <template slot-scope="scope">
              <span :style="{'color':scope.row.warn_handled?'green':'red'}">{{ scope.row.warn_handled?'已处理':'待处理' }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :pager-count="pageCount"
            mini
            background
            layout="total,prev, pager, next"
            :total="warnList.length">
        </el-pagination>
      </div>
      <div v-show="showOfCamera" style="margin-left: 100px" id="camera">
        摄像机
      </div>
    </div>
  </div>
</template>

<script>
import BasicPopupFrame from "@/components/common/basicPopupFrame";
export default {
  name: "mapPopup",
  components: {
    BasicPopupFrame
  },
  props: {
    markerArr: {
      type: Array,
      required: true
    },
    popupWindowDeviceId: {
      type: String,
      required: true
    },
    warnList:{
      type: Array
    }
  },
  data() {
    return {
      showOfWarn: false,
      showOfEquip: false,
      showOfCamera: false,
      clickedEle: null,
      currentPage:1,
      pageSize:5,
      pageCount:9
    }
  },
  computed: {
    getDeviceInfo() {
      if (this.markerArr) {
        return this.markerArr.filter((device) => {
          if (device.equip_uniq_num === this.popupWindowDeviceId)
            return device;
        })
      }
      return {};
    },
    getVuexVisible(){
      return this.$store.state.visible;
    }
  },
  methods: {
    handleTitle(event) {
      if (event.target === this.clickedEle) {
        return
      }
      //历史状态和背景色修改
      this.clickedEle.parentNode.style.backgroundColor = '#e7e7e8';
      // 背景色切换
      const titleName = event.target.parentNode.getAttribute('name')
      if (titleName === 'isWarn') {
        this.showOfWarn = true
        this.showOfCamera = false
        this.showOfEquip = false
        event.target.parentNode.style.backgroundColor = 'red';
      } else if (titleName === 'isEquip') {
        this.showOfEquip = true;
        this.showOfCamera = false;
        this.showOfWarn = false;
        event.target.parentNode.style.backgroundColor = 'green';
      } else if (titleName === 'isCamera') {
        this.showOfCamera = true;
        this.showOfWarn = false;
        this.showOfEquip = false;
        event.target.parentNode.style.backgroundColor = 'green';
      }
      // 字体颜色切换
      this.clickedEle.style.color = "black";
      event.target.style.color = "white";
      this.clickedEle = event.target;
    }
  },
  mounted() {
    this.clickedEle = document.getElementById("mid");
    this.clickedEle.parentNode.style.backgroundColor = "green"
    this.showOfEquip = true
    this.clickedEle.style.color = "white"
  }
}
</script>

<style scoped>
#popup-window {
  height: 460px;
  width: 50%;
  opacity: 0.89;
  background: #1c1717;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483647;
  margin-left: -5%;
}

li {
  float: left;
  font-size: 12px;
  font-weight: bolder;
  line-height: 0;
  background-color: #e7e7e8;
  border-right: 1px #445dd7 solid;
  color: #131212;
  list-style-type: none;
  width: 31.5%;
  height: 30px;
}

#content {
  clear: left;
  line-height: 25px;
  font-size: 12px;
  color: #e7e7e8;
  margin-top: -100px;
  margin-left: 5%;;
  width: 95%;
  text-align: left;
  height: 360px;
  columns: 90px 3;
}

#warn, #camera {
  font-size: 12px;
  color: #e7e7e8;
  margin-top: -135px;
  margin-left: 21px;
  width: 95%;
  text-align: left;
  height: 320px;
}

#warn{
  margin-left: 5%;
  text-align: left;
}

li > p {
  width: 100%;
  height: 30px;
  padding: 10px;
  text-align: center;
  margin-top: 5px;
  margin-left: -10.5px;
}
.el-table{
  background-color: #1c1717;
}
</style>
