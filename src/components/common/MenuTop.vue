<template>
  <div class="menu-top">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <slot name="current-menuO"></slot>
      <slot name="current-menuT"></slot>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "MenuTop"
}
</script>

<style scoped>
.menu-top {
  margin-bottom: 20px;
}
</style>
