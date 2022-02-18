<template>
  <div id="app">
    <el-header>植物园综合管理系统</el-header>
    <Home/>
  </div>
</template>

<script>
import Home from "@/components/Home";
export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
.el-header{
  width: 100%;
  line-height: 58px;
  background: #1c1717;
  color: white;
}

</style>
