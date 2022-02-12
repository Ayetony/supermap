<template>
<div>
  <div  v-if="parkShow" id="park">
    <input type="text" placeholder="查询"/>
    <div class="pageList">
      页面数据
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ParkQuery",
  data(){
    return{
      parkShow: true
    }
  }
}
</script>
<style scoped>
#park{
  margin-left: 80%;
  height: 800px;
  margin-top: -50px;
  margin-right: -20px;
  background-color: #4081d5;
  opacity: 0.9;
  z-index: auto;
}
#park>input{
  height: 50px;
  width: 320px;
  color: #0868e5;
  font-size: 14px;
  font-weight: bolder;
}
.pageList{
  margin-top: -30px;
  border-top:1px #1c1717 solid;
  height: 80%;
}
</style>
