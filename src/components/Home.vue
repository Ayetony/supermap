<template>
  <el-container style="height: 900px;">
    <el-aside style="background-color: rgb(238, 241, 246)" width="10%">
      <el-menu>
          <el-menu-item index="1">
            <router-link to="/index">设备状态</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/park">视频监控</router-link>
          </el-menu-item>
          <el-menu-item index="3">广播</el-menu-item>
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
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 100px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container{
  margin: 0;
}
.el-menu-item{
  border: 1px gray solid;
}

</style>
