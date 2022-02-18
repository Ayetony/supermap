<template>
  <el-container>
    <el-aside style="background-color: rgb(238, 241, 246);text-align: left" width="15%">
      <el-menu :default-active="activeIndex" router>
          <el-menu-item index="/index">
            <i class="el-icon-video-camera" style="font-size: 30px;margin:5%"></i>&nbsp;视频监控系统
          </el-menu-item>
          <el-menu-item index="/env">
            <i class="el-icon-s-tools" style="font-size: 30px;margin:5%"></i>&nbsp;环境监控系统
          </el-menu-item>
          <el-menu-item index="/broadcast">
            <i class="el-icon-s-platform" style="font-size: 30px;margin:5%"></i>&nbsp;广播管理监控系统
          </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      // element ui el-menu 根据当前路由绑定default-index，也就是默认路由激活栏
      activeIndex: this.$route.path
    }
  }
}
</script>

<style scoped>
.el-main {
  background-color: #E9EEF3;
  text-align: center;
  line-height: 160px;
}
.el-menu {
  height: 900px;
  opacity: 0.89;
  background:  #1c1717;
}

.el-menu-item.is-active {
  background-color: green !important;
  color: white;
}

.el-menu-item{
  color: #79797a;
}



</style>
