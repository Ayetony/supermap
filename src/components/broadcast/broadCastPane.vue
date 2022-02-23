<template>
  <div v-show="showOfSpeakerPane" id="equip_speaker_Id">
    <ul style="padding-top: 5px;
        list-style-type: none;
        text-align: left;
        opacity: 0.8;
        font-size: 12px;
        line-height: 5px;
        width: 92px;
        height: 130px;
        color: white;position: relative">
      <li>工作状态&nbsp;&nbsp;</li>
      <img :src="imgURL"/>
      <li>音量</li>
      <li style="  padding: 0;width: 100%;height: 5px;margin-left: -35px;background-color: #15d81d;">
        <div :style="{width:(1-this.volume)*100 + '%'}"
             style="  padding: 0;float: right;background: #EBEEF5;height: 5px;"></div>
      </li>
      <div style="position: fixed;margin-left: 60px;margin-top: -5px">{{ volume * 100 + '%' }}</div>
      <li>正在播放：&nbsp;{{ name }}</li>
      <li :style="{color: 'red',marginLeft: playingLeft + 'px'}">{{ name }}</li>
      <!--   id 不需要多变的id   -->
      <span style="color: #04c5f6;margin-left: 60px" id="speakerdetail">详情</span>
    </ul>
  </div>
</template>

<script>
export default {
  name: "broadCastPane",
  components: {},
  props: {
    markerArr: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      loop: true,
      distance: -45,
      showOfSpeakerPane: false,
      speakerId: '',
      percentage: '90px',
      imgURL: '',
      imgRedURL: require("../../assets/images/speakerLightRed.png"),
      imgGreenURL: require("../../assets/images/speakerLightGreen.png"), // default
      name: '',
      volume: 0,
    }
  },
  computed: {
    playingLeft() {
      if (!this.showOfSpeakerPane) {
        return -45;
      } else {
        const _this = this;
        // eslint-disable-next-line vue/no-async-in-computed-properties
        setTimeout(() => {
          if (_this.distance >= -45 && this.loop) {
            if (_this.distance === 35) {
              this.loop = !this.loop
            }
            return _this.distance++
          }
          if (_this.distance <= 36 && !this.loop) {
            if (_this.distance === -44) {
              this.loop = !this.loop;
            }
            return _this.distance--
          }
        }, 100)
      }
      return this.distance;
    }
  },
  methods: {
    getEnvById() {
      this.$emit('speakerMarkerEvent', this.speakerId)
    },
    initSpeakerPane(showOfSpeaker) {
      this.showOfSpeakerPane = showOfSpeaker;
    },
    getSpeakerInfo(speakerId) {
      this.markerArr.filter((speaker) => {
        if (speaker.equip_uniq_num === speakerId) {
          if (speaker.online_status) {
            this.imgURL = this.imgGreenURL;
          } else {
            this.imgURL = this.imgRedURL;
          }
          this.name = speaker.name;
          this.volume = speaker.volume;
        }
      })
    }
  },
  created() {
    const _this = this;
    this.$bus.on('pushSpeakerMsg', (equip_uniq_num) => {
        _this.showOfSpeakerPane = true;
        _this.speakerId = equip_uniq_num;
        _this.getSpeakerInfo(_this.speakerId)
    })

  }
}
</script>

<style scoped>

li {
  margin-left: -45px;
  padding: 10px;
}

img {
  width: 30px;
  height: 30px;
  margin-top: -35px;
  margin-left: 30px;
  padding: 5px;
}
</style>
