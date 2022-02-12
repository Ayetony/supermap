<template>
  <div>
    <div v-show="visible" id="popup-window">
      <h2 style="color: #0868e5;float: right;height: 5px;margin-top: -10px">
        <button @click="visible = false">关闭</button>
      </h2>
      <p style="color: #0868e5;margin-top: -55px">详细信息</p>
      <div>
        <ul>
          <li><p @click="handleTitle">视频监控</p></li>
          <li><p id="mid" @click="handleTitle">设备信息</p></li>
          <li><p @click="handleTitle">告警信息</p></li>
        </ul>
        <br/>
        <div id="content">
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }}<br/>
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }} <br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }} <br/>
          设备名称：{{ equip_info.name }}<br/>
          设备安装区域：{{ equip_info.erectArea }}<br/>
          设备唯一识别编码：{{ equip_info.equip_uniq_num }} <br/>
        </div>
      </div>
    </div>
    <div id="map">
    </div>
  </div>
</template>

<script>
import L from 'leaflet'

export default {
  name: 'Index',
  data() {
    return {
      token: "pk.eyJ1IjoibWlhb2RheWUiLCJhIjoiY2t6Z25hMnpmM3F3bjJvcHZ0MGtrczlwMSJ9.85LKKEVoAWrXdZXIh9Vfcw",
      visible: false,
      markerArr: [
        [51.5, -0.09], [51.53, -0.19], [51.52, -0.14], [51.52, -0.124], [51.49, -0.06]
      ],
      equip_info: {
        name: "camera",
        erectArea: "本层",
        equip_uniq_num: "CP_R_BM003"
      },
      clickedEle: null
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
      // icon 标注
      const myIcon = L.icon({
        iconUrl: require('../assets/logo.png'),//marker图片地址
        iconSize: [57, 71],//marker宽高
        iconAnchor: [28.5, 71]//marker中心点位置
      });
      // 标注事件绑定
      const _this = this
      this.markerArr.forEach((points) => {
        const marker = L.marker(points, {icon: myIcon}).addTo(map);
        marker.on('click', () => {
          _this.showPopup()
        })
      })
      // 画圆
      const circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#0090ff',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(map);
      circle.bindPopup("伦敦植物园");
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
    showPopup() {
      this.visible = !this.visible
    },
    handleTitle(event) {
      this.clickedEle.style.color = "black";
      event.target.style.color = "white";
      this.clickedEle = event.target;
    }
  },
  mounted() {
    this.leafletInit()
    this.clickedEle = document.getElementById("mid");
    this.clickedEle.style.color = "white"
  }
}
</script>

<style scoped>
#map {
  overflow: hidden;
  position: absolute;
  padding: 0 24px 0 13px;
  margin: -19px 0 0 -8px;
  width: 86%;
  height: 93%;
}

#popup-window {
  height: 500px;
  width: 800px;
  opacity: 0.89;
  background: #1c1717;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483647;
  display: block;
}

li {
  float: left;
  font-size: 12px;
  line-height: 0;
  margin-left: -20px;
  margin-top: -20px;
  background: green;
  color: #131212;
  border-left: 1px black solid;
  list-style-type: none;
  width: 35%;
}

#content {
  clear: left;
  line-height: 25px;
  font-size: 13px;
  color: #e7e7e8;
  margin-top: -100px;
  margin-left: 21px;
  width: 95%;
  text-align: left;
  height: 320px;
  columns: 90px 3;
}

li > p {
  width: 100%;
  height: 100%;
}

</style>
