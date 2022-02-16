<template>
  <div id="map">
  </div>
</template>

<script>
import L from "leaflet";

export default {
  name: "locator",
  data() {
    return {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
          'contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      videoUrl: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      token: "pk.eyJ1IjoibWlhb2RheWUiLCJhIjoiY2t6Z25hMnpmM3F3bjJvcHZ0MGtrczlwMSJ9.85LKKEVoAWrXdZXIh9Vfcw",
      parkShow: false,
      rect:{
        left:'',
        right:'',
        top:'',
        bottom:'',
        equip_uniq_num:''
      }
    }
  },
  props: ['markerArr', 'iconColor','columnName'],
  methods: {
    leafletInit() {
      // 定位
      let map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer(this.videoUrl, {
        attribution: this.attribution,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: this.token
      }).addTo(map);
      const _this = this
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
          _this.showPopup(map, equip)
        })
      })
      if(this.columnName === 'envClear'){
        //开局一张图
        let _L = L;
        let _this = this;
        let rects = [] ;
        this.markerArr.forEach((equip) => {
          const boundingClientRect = _L.DomUtil.get(equip.equip_uniq_num).getBoundingClientRect();
          _this.rect.bottom = boundingClientRect.bottom;
          _this.rect.left = boundingClientRect.left;
          _this.rect.right = boundingClientRect.right;
          _this.rect.top = boundingClientRect.top;
          _this.rect.equip_uniq_num = equip.equip_uniq_num
          rects.push(_this.rect);
          _this.$store.commit('getRects', rects);
          map.on("zoomend", function (){
            let boundingClientRect = _L.DomUtil.get(equip.equip_uniq_num).getBoundingClientRect();
            _this.rect.bottom = boundingClientRect.bottom;
            _this.rect.left = boundingClientRect.left;
            _this.rect.right = boundingClientRect.right;
            _this.rect.top = boundingClientRect.top;
            _this.rect.equip_uniq_num = equip.equip_uniq_num
            let rects = _this.$store.state.rects;
            for (let i = 0; i < rects.length; i++) {
              if(_this.rect.equip_uniq_num === equip.equip_uniq_num){
                rects[i] = _this.rect;
                _this.$store.commit('getRects',rects);
                break;
              }
            }
          })
        })
      }
    },
    //巡游取点
    travelBounds(map) {
      const popup = L.popup();

      function onMapClick(e) {
        popup.setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
      }

      map.on('click', onMapClick);
    },
    showPopup(map, equip) {
      this.visible = !this.visible
      if (!this.parkShow && this.visible) {
        this.parkShow = true
        this.$store.commit('getParkShow', this.parkShow)
      }
      this.$store.commit("getVisible", this.visible)
      document.getElementById(equip.equip_uniq_num).style.border = "";
    },
    // font 图标加 div 样式
    divIconEngine(L, iconColor, equip) {
      if (this.columnName === 'envClear') {
        return L.divIcon({
          className: 'custom-div-icon',//必须加此className
          html: "<div id='" + equip.equip_uniq_num + "'></div>" +
              "<i style='font-size:45px;color: " + iconColor + ";margin-top: -10px' class='el-icon-s-flag'></i>" +
              "<p style='margin-top: -5px;width:50px;font-weight: bold;color:" + iconColor + "'>" + (equip.online_status ? '在线状态' : '告警离线状态') + "</p>",
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        });
      }
      if (this.columnName === 'videoClear') {
        return L.divIcon({
          className: 'custom-div-icon',//必须加此className
          html: "<div style='width: 20px;background: " + iconColor + ";color: white;border-radius: 100%;font-size: 14px;'>○</div>" +
              "<div style='width: 1px;height: 42px;border-left:solid 2px " + iconColor + ";margin-left: 9px;'></div>" +
              "<i id='" + equip.equip_uniq_num + "' style='font-size:45px;color: " + iconColor + ";margin-top: -10px' class='el-icon-video-camera'></i>" +
              "<p style='margin-top: -10px;width:50px;font-weight: bold;color:" + iconColor + "'>" + equip.name + "</p>",
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        });
      }
      return '';
    }
  },
  mounted() {
    this.leafletInit();
  }
}
</script>

<style scoped>
#map {
  position: absolute;
  margin-left: -1.2%;
  margin-top: -1.2%;
  padding-right: 0.8%;
  width: 87%;
  height: 100%;
}
</style>
