<template>
  <div>
    <ul :style="{left: left+'px',top: top+'px',right: right + 'px',bottom: bottom + 'px'}" class="pane">
      <li>设备状态:</li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;PM2.5<a>{{ this.PM25 }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;温度<a>{{ this.temperature }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;湿度<a>{{ this.humidity }}</a>
      </li>
      <li>
        <ColorOption color="#15d81d"/>&nbsp;风速风向<a>{{ this.wind }}</a>
      </li>
      <li>
        <div class="env-color"></div>&nbsp;降雨量<a>{{ this.precipitation }}</a>
      </li>
      <span style="color: #04c5f6" @click="getEnvById(equip_uniq_num)">更多详情</span>
    </ul>
  </div>
</template>

<script>
import ColorOption from '@/components/common/colorOption'

export default {
  name: "envToolPane",
  components: {
    ColorOption
  },
  data() {
    return {
      left: this.equipInfo.left,
      right: this.equipInfo.right,
      top: this.equipInfo.top,
      bottom: this.equipInfo.bottom
    }
  },
  props: ['PM25', 'temperature', 'humidity', 'wind', 'precipitation', 'equip_uniq_num', 'equipInfo'],
  methods: {
    getEnvById(envId) {
      this.$emit('envMarkerEvent', envId)
    }
  },
  created() {
    // 渲染函数是一个this，对于多个组件使用this进行调用绑定，在callback函数内无法完成双向数据修改
    let _this = this;
    _this.$bus.on(this.equip_uniq_num, function (rect) {
      if (rect.equip_uniq_num === _this.equip_uniq_num) {
        // console.log('收到',_this.equip_uniq_num)
        _this.left = rect.left;
        _this.right = rect.right;
        _this.bottom = rect.bottom;
        _this.top = rect.top;
      }
    })
  },
  mounted() {
    //首次初始化
    if(this.$store.state.rectsJson){
      const rects = JSON.parse(this.$store.state.rectsJson);
      for (let i = 0; i < rects.length; i++) {
        if(rects[i].equip_uniq_num === this.equip_uniq_num){
          this.left = rects[i].left;
          this.right = rects[i].right;
          this.bottom = rects[i].bottom;
          this.top = rects[i].top;
        }
      }
    }
  },
  destroyed() {
    console.log('destroyed')
    //销毁组件刷新前的视窗位置信息
    this.$store.commit('getRectsJson','');
    //解除消息总线的绑定
    this.$bus.off(this.equip_uniq_num)
  }
}
</script>

<style scoped>
.pane {
  margin-top: 45px;
  padding-top: 5px;
  list-style-type: none;
  text-align: left;
  background-color: #1c1717;
  opacity: 0.65;
  font-size: 12px;
  line-height: 18px;
  width: 110px;
  height: 135px;
  color: white;
  z-index: 2147483646;
  margin-left: 5px;
  position: fixed;
}

li {
  margin-left: -35px;
}

a {
  margin-left: 10px;
}

.env-color {
  float: left;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: #15d81d;
  padding: 0;
}
</style>
