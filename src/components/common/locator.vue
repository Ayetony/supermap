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
    }
  },
  props: ['markerArr', 'iconColor', 'columnName'],
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
      map.doubleClickZoom.disable();//禁止双击zoom
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
        // 只需要绑定indexMap
        if(this.columnName === 'videoClear') {
          marker.on('click', () => {
            _this.showPopup(map, equip)
          })
        }
      })
      if (this.columnName === 'envClear') {
        this.initialRectVuex(map)
      }
      return map
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
      this.$store.commit("getVisible", true)
      if(this.$store.state.visible){
        this.$emit('popupVisibleEvent', equip.equip_uniq_num);
      }
      if (!this.$store.state.parkShow&&this.$store.state.visible) {
        this.$store.commit('getParkShow', true)
      }
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

      if (this.columnName === 'broadCastClear') {
        return L.divIcon({
          className: 'custom-div-icon',//
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
    },
    initialRectVuex(map){
      //开局一张图，试着利用boundingClientRect追踪复位（不理想的）
      let rects = [];
      const _this = this
      this.markerArr.forEach((equip) => {
        const boundingClientRect = L.DomUtil.get(equip.equip_uniq_num).getBoundingClientRect();
        const rect = {}
        rect.left = boundingClientRect.left;
        rect.top = boundingClientRect.top;
        rect.equip_uniq_num = equip.equip_uniq_num;
        rects.push(rect);
        map.on("moveend", function () {
          const rect = {}
          let boundingClientRect = L.DomUtil.get(equip.equip_uniq_num).getBoundingClientRect();
          const bodyRect = document.body.getBoundingClientRect();
          rect.left = boundingClientRect.left - bodyRect.left;
          rect.top = boundingClientRect.top - bodyRect.top;
          rect.equip_uniq_num = equip.equip_uniq_num;
          if(_this.$store.state.rectsJson !== '') {
            const rectArrFromJson = JSON.parse(_this.$store.state.rectsJson);
            for (let i = 0; i < rectArrFromJson.length; i++) {
              if (rect.equip_uniq_num === rectArrFromJson[i].equip_uniq_num && rect.left !== rectArrFromJson[i].left && rect.top !== rectArrFromJson[i].top) {
                rectArrFromJson[i] = rect;
                _this.$store.dispatch('getRectsJson', JSON.stringify(rectArrFromJson));
                break;
              }
            }
          }
        })
      })
      this.$store.dispatch('getRectsJson', JSON.stringify(rects));
    }
  },
  beforeCreate(){
    if(sessionStorage.getItem('store')){
      this.$store.replaceState(Object.assign({}, this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))))
    }
    //session before unload event ,save the state
    window.addEventListener('beforeunload',()=>{
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  mounted() {
    this.leafletInit();
  }
}
</script>

<style scoped>
#map {
  position: absolute;
  left: 15%;
  top: 60px;
  width: 85%;
  height:900px;
  bottom: 0;
}
</style>
