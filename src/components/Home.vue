<template>
  <el-container>
    <el-aside style="background-color: rgb(238, 241, 246)" width="200px">
      <el-menu default-active="1">
        <router-link to="/index">
          <el-menu-item index="1">
            设备状态
          </el-menu-item>
        </router-link>
        <router-link to="/park">
          <el-menu-item index="2">
            视频监控
          </el-menu-item>
        </router-link>
        <router-link to="/broadcast">
          <el-menu-item index="3">广播</el-menu-item>
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
  height: 903px;
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
