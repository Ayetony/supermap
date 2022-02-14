<template>
  <el-container>
    <el-aside style="background-color: rgb(238, 241, 246);text-align: left" width="12%">
      <el-menu default-active="1">
        <router-link to="/index">
          <el-menu-item index="1">
            <i class="el-icon-video-camera" style="font-size: 30px;margin-left: -10px"></i>&nbsp;视频监控系统
          </el-menu-item>
        </router-link>
        <router-link to="/env">
          <el-menu-item index="2">
            <i class="el-icon-s-tools" style="font-size: 30px;margin-left: -10px"></i>&nbsp;环境监控系统
          </el-menu-item>
        </router-link>
        <router-link to="/broadcast">
          <el-menu-item index="3">
            <i class="el-icon-s-platform" style="font-size: 30px;margin-left: -10px"></i>&nbsp;广播管理监控系统
          </el-menu-item>
        </router-link>
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
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.el-aside {
  text-align: center;
  line-height: 80px;
}
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
  color: #445dd7;
}



</style>
