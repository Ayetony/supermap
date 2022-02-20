<template>
  <div v-show="isSpeakerShow">
    <ul  class="pane">
      <li>工作状态&nbsp;&nbsp;</li><img src="../../assets/images/speakerLightRed.png"/>
      <li>音量</li>
      <li class="speaker-progress-bar-outer"><div class="speaker-progress-bar-inner" style="width: 20%;"><span style="margin-left: 18px">80%</span></div></li>
      <li style="padding: 20px">当前播放 xxx </li>
    </ul>
    <span style="color: #04c5f6"  @click="getEnvById()">更多详情</span>
  </div>
</template>

<script>
// import L from 'leaflet'
export default {
  name: "broadCastPane",
  components: {
  },
  data() {
    return {
      left: '',
      right: '',
      top: '',
      bottom: '',
      showOfSpeakerPane: false,
      speakerId: '',
      percentage: '90px',
    }
  },
  computed:{
    isSpeakerShow(){
      return this.showOfSpeakerPane;
    }
  },
  methods: {
    getEnvById() {
      console.log(this.speakerId)
      this.$emit('envMarkerEvent', this.speakerId)
    },
    initSpeakerPane(showOfPane,popupVisibleDeviceId){
      this.showOfSpeakerPane = showOfPane;
      this.speakerId = popupVisibleDeviceId;
    }
  }
}
</script>

<style scoped>
.pane {
  margin-top: 160px;
  padding-top: 5px;
  list-style-type: none;
  text-align: left;
  background-color: #1c1717;
  opacity: 0.8;
  font-size: 12px;
  line-height: 5px;
  width: 80px;
  height: 120px;
  color: white;
  z-index: 2147483647;
  position: fixed;
}
li{
  margin-left: -40px;
  padding: 10px;
}
img{
  width: 30px;
  height: 30px;
  margin-top: -37px;
  margin-left: 35px;
  padding: 10px;
}
.speaker-progress-bar-outer{
  padding: 0;
  width: 100%;
  height: 5px;
  margin-left: -30px;
  background-color: #15d81d;
}
.speaker-progress-bar-inner{
  padding: 0;
  float: right;
  background: #EBEEF5;
  height: 5px;
}
</style>
