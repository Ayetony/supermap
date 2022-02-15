<template>
  <div>
    <Locator :marker-arr="markerArr" :icon-color="iconColor"/>
    <EnvToolPane :equip="markerArr[1]"/>
  </div>
</template>
<script>
import Locator from '@/components/common/locator'
import EnvToolPane from "@/components/environment/envToolPane";
export default {
  name: "envMonitor",
  components: {
    Locator,
    EnvToolPane
  },
  data(){
    return{
      iconColor: {
        warnColor: '#d32828',
        onlineColor: '#0868e5',
        earlyWarningColor: 'orange'

      },
      markerArr: [
        {
          name: "植物园",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM003",
          points: [51.5, -0.09],
          online_status: true,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        },
        {
          name: "野猪林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM002",
          points: [51.5, -0.19],
          online_status: false,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        },
        {
          name: "快活林",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM004",
          points: [51.50, -0.14],
          online_status: true,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        }, {
          name: "十字坡",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM001",
          points: [51.52, -0.124],
          online_status: false,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        },
        {
          name: "狮子楼",
          erectArea: "本层",
          equip_uniq_num: "CP_R_BM005",
          points: [51.49, -0.06],
          online_status: true,
          env:{
            pm25: '23',
            temperature: 35,
            humidity: 0.61,
            wind: '东北风一级',
            precipitation: '52'
          }
        }
      ],
    }
  },
  methods:{
    clearNextInit(){
      //清理上一次marker然后初始化
      for (let clearMapKey in this.$store.state.clearMap) {
        if(this.$store.state.clearMap[clearMapKey]){
          console.log('video:' , clearMapKey)
          this.$store.commit('get'+ clearMapKey.slice(0,1).toUpperCase() + clearMapKey.slice(1),false)
        }
      }
    }
  },
  mounted() {
    this.clearNextInit();
    this.$store.commit('getEnvClear', true)
    this.$store.commit('getVisible', false)

  }
}
</script>

<style scoped>

</style>
