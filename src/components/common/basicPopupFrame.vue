<template>
  <div>
    <h2 style="color: #0868e5;float: right;height: 5px;">
      <button @click="closePopup">关闭</button>
    </h2>
    <h5 style="color: #0868e5;margin-top: -60px;padding: 5px;">详细信息</h5>
  </div>
</template>
<script>
export default {
  name: "basicPopupFrame",
  methods:{
    closePopup() {
      this.$store.commit('getVisible', false)
    }
  }
}
</script>

<style scoped>

</style>
