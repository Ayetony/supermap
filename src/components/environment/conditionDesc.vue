<template>
  <div>
    <slot :descData="descData"></slot>
  </div>
</template>

<script>
export default {
  name: "conditionDesc",
  data(){
    return {
      descData:[
        {
          statusName: 'PM2.5',
          normal: '0~75μg',
          cautious: ['75~150μg'],
          earlyWarning: ['150~500μg']
        },
        {
          statusName: '温度',
          normal: '16°-28°',
          cautious: ['10°-20°','36°-38°'],
          earlyWarning: ['16°以下','31°以上']
        },
        {
          statusName: '风速',
          normal: '0～3级（0～19km/h',
          cautious: ['4~5级 （20～38km/h'],
          earlyWarning: ['>6级（39～100km/h)']
        },
        {
          statusName: '降雨量',
          normal: '小雨中雨（0～25mm)',
          cautious: ['大雨（25～50mm'],
          earlyWarning: ['暴雨大暴雨 (>50mm)']
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
