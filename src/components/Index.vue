<template>
  <div>
    <div v-show="visible" id="popup-window">
      <h2 style="color: #0868e5;float: right"><button @click="visible = false">关闭</button></h2>
      <p style="color: #0868e5">详细信息</p>
      <div id="wrap">
        <div>
          <label>视频</label>
        </div>
        <div>
          <label>设备</label>
        </div>
        <div>
          <label>告警</label>
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
        [51.5, -0.09], [51.53, -0.19], [51.52, -0.14], [51.52, -0.124],[51.49, -0.06]
      ]
    }
  },
  methods: {
    leafletInit() {
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: this.token
      }).addTo(map);

      // icon
      const myIcon = L.icon({
        iconUrl: require('../assets/logo.png'),//marker图片地址
        iconSize: [57, 71],//marker宽高
        iconAnchor: [28.5, 71]//marker中心点位置
      });

      const lct = this

      this.markerArr.forEach((points) => {
        const marker = L.marker(points, {icon: myIcon}).addTo(map);
        marker.on('click', () => {
          lct.showPopup()
        })
      })

      // this.travelBounds(map);

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
    }
  },
  mounted() {
    this.leafletInit()
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
  border: #9b0a0a 1px solid;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483647;
  display: block;
}

#wrap {
  height: 500px;
  width: 800px;
  text-align: left;
  position: fixed;
  color: #8FB1DD;
}

#wrap div {
  float: left;
  width: 33%;
  border: 1px #06426e solid;
}
</style>
