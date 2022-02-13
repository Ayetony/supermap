<template>
  <div>
    <ParkQuery :page-list="markerArr" :park-show="parkShow" @deviceInfo="showDeviceInfo"
               @deviceMarker="showDeviceMarker"/>
    <div v-show="visible" id="popup-window">
      <h2 style="color: #0868e5;float: right;height: 5px;margin-top: -30px">
        <button @click="visible = false">关闭</button>
      </h2>
      <h5 style="color: #0868e5;margin-top: -60px;padding-top: 5px;">详细信息</h5>
      <div style="margin-top: -20px">
        <ul style="margin-left: -5%">
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
          告警信息
        </div>
        <div v-show="showOfCamera" id="camera">
          摄像机
        </div>
      </div>
    </div>
    <div id="map">
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import ParkQuery from "@/components/ParkQuery";

export default {
  name: 'Index',
  components: {
    ParkQuery
  },
  data() {
    return {
      iconColor: {
        warnColor: '#d32828',
        onlineColor: '#0868e5'
      },
      parkShow: false,
      redIcon: L.icon({
        iconUrl: require('../assets/warn-red-camera.png'),//marker图片地址
        iconSize: [57, 71],//marker宽高
        iconAnchor: [28.5, 71]//marker中心点位置
      }),
      token: "pk.eyJ1IjoibWlhb2RheWUiLCJhIjoiY2t6Z25hMnpmM3F3bjJvcHZ0MGtrczlwMSJ9.85LKKEVoAWrXdZXIh9Vfcw",
      visible: false,
      popupWindowDeviceId: '',
      statePopup: {
        isWarn: false,
        isCamera: false,
        isEquip: false
      },
      showOfWarn: false,
      showOfEquip: false,
      showOfCamera: false,
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
          points: [51.49, -0.06]
        }
      ],
      clickedEle: null,
      currentPage: 1,
      pagesize: 10,
      userList: [
        {
          warn_time: new Date().getDay(),
          warn_detail: "告警信息触发",
          warn_handled: true
        },
        {
          warn_time: new Date().getDay(),
          warn_detail: "告警信息触发",
          warn_handled: false
        },
        {
          warn_time: new Date().getDay(),
          warn_detail: "告警信息触发",
          warn_handled: false
        }
      ]
    }
  },
  computed: {
    getDeviceInfo() {
      return this.markerArr.filter((device) => {
        if (device.equip_uniq_num === this.popupWindowDeviceId)
          return device;
      })
    }
  },
  methods: {
    leafletInit() {
      // 定位
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: this.token
      }).addTo(map);
      const _this = this
      // 巡游取点
      // this.travelBounds(map)
      //遍历绑定定位点的marker事件
      this.markerArr.forEach((equip) => {
        let marker;
        if (equip.online_status) {
          marker = L.marker(equip.points, {icon: _this.divIconEngine(L, this.iconColor.onlineColor, equip)}).addTo(map);
        } else {
          marker = L.marker(equip.points, {icon: _this.divIconEngine(L, this.iconColor.warnColor, equip)}).addTo(map);
        }
        equip.marker = marker
        marker.on('click', () => {
          this.popupWindowDeviceId = equip.equip_uniq_num;
          _this.showPopup(map, equip)
        })
      })
      //画圆
      const circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#0090ff',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(map);
      //画线
      L.polyline([[51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]], {color: 'red'}).addTo(map)
      circle.bindPopup("伦敦植物园");
    },
    //展示device
    showDeviceInfo(deviceId) {
      document.getElementById(deviceId).style.border="";
      this.visible = true;
      this.popupWindowDeviceId = deviceId;
    },
    //弹出指定deviceId marker
    showDeviceMarker(deviceId) {
      this.visible = false
      let _this = this;
      this.markerArr.filter((equip) => {
        if (equip.equip_uniq_num === deviceId) {
          let domMarker = document.getElementById(equip.equip_uniq_num);
          // domMarker.style.border = '3px red dashed'
          domMarker.style.border = "3px " + (equip.online_status ? _this.iconColor.onlineColor : _this.iconColor.warnColor).toString() + " dashed"
        }
      })
    },
    //巡游取坐标
    travelBounds(map) {
      const popup = L.popup();

      function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
      }

      map.on('click', onMapClick);
    },
    showPopup(map, equip) {
      this.visible = !this.visible
      document.getElementById(equip.equip_uniq_num).style.border="";
      if (!this.parkShow && this.visible) {
        this.parkShow = true
      }
      console.log(equip)
      // equip.marker.setIcon(this.redIcon)
    },
    // font 图标加 div 样式
    divIconEngine(L, iconColor, equip) {
      return L.divIcon({
        className: 'custom-div-icon',
        html: "<div style='width: 20px;background: " + iconColor + ";color: white;border-radius: 100%;font-size: 14px;'>○</div>" +
            "<div style='width: 1px;height: 42px;border-left:solid 2px " + iconColor + ";margin-left: 9px;'></div>" +
            "<i id='" + equip.equip_uniq_num + "' style='font-size:45px;color: " + iconColor + ";margin-top: -10px' class='el-icon-video-camera'></i>" +
            "<p style='margin-top: -10px;width:50px;font-weight: bold;color:" + iconColor + "'>" + equip.name + "</p>",
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });
    },
    handleTitle(event) {
      if (event.target === this.clickedEle) {
        return
      }
      //历史状态和背景色修改
      this.clickedEle.parentNode.style.backgroundColor = '#e7e7e8';
      const preTitleName = event.target.parentNode.getAttribute('name')
      console.log('preTitleName', this.statePopup[preTitleName])
      this.statePopup[preTitleName] = false;

      // 背景色切换
      const titleName = event.target.parentNode.getAttribute('name')
      console.log(this.statePopup[titleName])
      this.statePopup[titleName] = true
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
    },
    // 告警信息分页,初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    // http 请求
    handleUserList() {
      // this.$http.get('http://localhost:3000/userList').then(res => {  //这是从本地请求的数据接口，
      //   this.userList = res.body
      // })
    }
  },
  mounted() {
    this.leafletInit()
    this.clickedEle = document.getElementById("mid");
    this.clickedEle.parentNode.style.backgroundColor = "green"
    this.showOfEquip = true
    this.clickedEle.style.color = "white"
  }
}
</script>

<style scoped>
#map {
  position: absolute;
  margin-left: -15px;
  margin-top: -17px;
  width: 100%;
  height: 900px;
}

#popup-window {
  height: 460px;
  width: 39%;
  opacity: 0.89;
  background: #1c1717;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483647;
}

li {
  float: left;
  font-size: 12px;
  font-weight: bolder;
  line-height: 0;
  /*margin-left: -10px;*/
  margin-top: -20px;
  background-color: #e7e7e8;
  color: #131212;
  border-left: 1px black solid;
  list-style-type: none;
  width: 33.1%;
}

#content {
  clear: left;
  line-height: 25px;
  font-size: 12px;
  color: #e7e7e8;
  margin-top: -100px;
  margin-left: 21px;
  width: 95%;
  text-align: left;
  height: 320px;
  columns: 90px 3;
  position: fixed;
}

#content > p {
  margin: 0;
}

#warn, #camera {
  clear: left;
  line-height: 25px;
  font-size: 12px;
  color: #e7e7e8;
  margin-top: -100px;
  margin-left: 21px;
  width: 95%;
  text-align: left;
  height: 320px;
  position: fixed;
}

li > p {
  width: 100%;
  height: 100%;
  padding: 5px;
}

</style>
