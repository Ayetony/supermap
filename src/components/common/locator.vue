<template>
  <div id="map">
  </div>
</template>

<script>
import L from "leaflet";
import lodash from "lodash";

export default {
  name: "locator",
  data() {
    return {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
          'contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      videoUrl: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      token: "pk.eyJ1IjoibWlhb2RheWUiLCJhIjoiY2t6Z25hMnpmM3F3bjJvcHZ0MGtrczlwMSJ9.85LKKEVoAWrXdZXIh9Vfcw",
      imgRedURL: require("../../assets/images/speakerLightRed.png"),
      imgGreenURL: require("../../assets/images/speakerLightGreen.png"), // default
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
          marker = L.marker(equip.points, {icon: _this.divIconEngine(L, this.iconColor.onlineColor, equip)}).addTo(map)
        } else {
          marker = L.marker(equip.points, {icon: _this.divIconEngine(L, this.iconColor.warnColor, equip)}).addTo(map)
        }
        if (this.columnName === 'envClear') {
          marker.bindPopup('',
              {
                autoClose: false,
                closeButton: false,
                autoPan: false,
                closeOnEscapeKey: false,
                closeOnClick: false,
                minWidth: 110,
                minHeight: 135
              })
          //打开popup保持open状态
          marker.openPopup()
          //去掉toggle事件
          marker.off()
          const elements = document.getElementsByClassName('leaflet-popup-tip');
          if (elements.length > 0) {
            for (let element of elements) {
              L.DomUtil.removeClass(element, 'leaflet-popup-tip')
            }
          }
          let popupDom = L.DomUtil.get(equip.equip_uniq_num)
          popupDom.removeAttribute('id')
          let htmlDiv = popupDom.innerHTML
          L.DomUtil.remove(popupDom)
          marker.getPopup().setContent(htmlDiv)
          marker.getPopup().getElement().style.marginLeft = '110px';
          // 修改popup默认样式
          marker.getPopup().getElement().children[0].style.padding = '0';
          marker.getPopup().getElement().children[0].style.border = '0';
          marker.getPopup().getElement().children[0].style.width = '110';
          marker.getPopup().getElement().children[0].style.background = '#1c1717';
          marker.getPopup().getElement().children[0].style.opacity = '0.65';
          marker.getPopup().getElement().children[0].style.color = 'white';
          // content 外边框置零
          marker.getPopup().getElement().children[0].children[0].style.margin = '0';

          let detailEle = L.DomUtil.get(equip.equip_uniq_num + 'detail');
          L.DomEvent.on(detailEle, 'click', function () {
            _this.$bus.emit('envMarkerEvent', equip.equip_uniq_num)
          }, L.DomEvent.stop)
        }

        if (this.columnName === 'broadCastClear') {
          marker._icon.id = equip.equip_uniq_num;
          marker.bindPopup('',
              {
                autoClose: false,
                closeButton: false,
                autoPan: false,
                closeOnEscapeKey: false,
                keepInView: true,
                minWidth: 92,
                minHeight: 130
              })
          const elements = document.getElementsByClassName('leaflet-popup-tip');
          if (elements.length > 0) {
            for (let element of elements) {
              L.DomUtil.removeClass(element, 'leaflet-popup-tip')
            }
          }
          marker.on('click', () => {
            _this.$bus.emit('pushSpeakerMsg', equip.equip_uniq_num);
            //此id是一个固定常量即可
            let popupDom = L.DomUtil.get("equip_speaker_Id")
            popupDom.getElementsByTagName('img')[0].setAttribute('src', equip.online_status?this.imgGreenURL:this.imgRedURL)


            let htmlDiv = popupDom.innerHTML
            htmlDiv = lodash.replace(htmlDiv, 'id="speakerdetail"', "id='" + equip.equip_uniq_num + "'")

            marker.getPopup().setContent(htmlDiv)
            marker.getPopup().getElement().style.opacity = '';
            marker.getPopup().getElement().style.marginTop = '-45px';
            // 修改popup默认样式
            marker.getPopup().getElement().children[0].style.padding = '0';
            marker.getPopup().getElement().children[0].style.border = '0';
            marker.getPopup().getElement().children[0].style.width = '110';
            marker.getPopup().getElement().children[0].style.background = '#1c1717';
            marker.getPopup().getElement().children[0].style.opacity = '0.8';
            marker.getPopup().getElement().children[0].style.color = 'white';
            // content 外边框置零
            marker.getPopup().getElement().children[0].children[0].style.margin = '0';
            marker.openPopup()
          })
          L.DomEvent.addListener(L.DomUtil.get(equip.equip_uniq_num), 'click', function () {
            _this.$bus.emit('broadCastMarkerEvent', equip.equip_uniq_num)
            //消息总线送到兄弟节点
          }, L.DomEvent.stop)

          //点击其他区域则关闭窗口
          map.on('click', function () {
            _this.$emit('closeSpeakerPane');
          });

        }
        // 只需要绑定indexMap
        if (this.columnName === 'videoClear') {
          equip.marker = marker
          marker.on('click', () => {
            _this.showPopup(map, equip)
          })
        }
      })
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
      if (this.$store.state.visible) {
        this.$emit('popupVisibleEvent', equip.equip_uniq_num);
      }
      if (!this.$store.state.parkShow && this.$store.state.visible) {
        this.$store.commit('getParkShow', true)
      }
    },
    // font 图标加 div 样式
    divIconEngine(L, iconColor, equip) {
      if (this.columnName === 'envClear') {
        return L.divIcon({
          className: 'custom-div-icon',//必须加此className
          html: "<div id='" + equip.equip_uniq_num + "icon" + "'></div>" +
              "<i style='font-size:45px;color: " + iconColor + ";margin-top: -10px' class='el-icon-s-flag'></i>" +
              "<p style='margin-top: -5px;width:50px;font-weight: bold;color:" + iconColor + "'>" + (equip.online_status ? '在线状态' : '告警离线状态') + "</p>",
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        });
      }

      if (this.columnName === 'broadCastClear') {
        let myIcon = L.icon({
          iconUrl: equip.online_status ? require('../../assets/images/speakerGreen.png') : require('../../assets/images/speakerRed.png'),
          iconSize: [45, 45],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
          shadowSize: [68, 95],
          shadowAnchor: [22, 94],
        });
        return myIcon;
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
  beforeCreate() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))))
    }
    //session before unload event ,save the state
    window.addEventListener('beforeunload', () => {
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
  height: 900px;
  bottom: 0;
}
</style>
