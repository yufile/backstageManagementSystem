<template>
  <div class="menu-item">
    <el-menu
        router
        tree-props="{}"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#999"
        unique-opened
        active-text-color="#fff">
      <div class="menu-icon">
        <img src="@/assets/img/base/kkb.png" alt="">
        <h3>开卖啦后台</h3>
      </div>
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :index="index.toString()" v-for="(item,index) in userLoginInfo.menus" :key="item.id">
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="children in item.children" :index="children.url" :key="children.id">
          <span slot="title">{{children.title}}</span>
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
name: "MenuItem",
  components: {
  },
  methods: {

  },
  computed:{
    ...mapState(['userLoginInfo'])
  }
}
</script>

<style scoped>
.menu-item {
  height: 100%;
  background-color: #001529;
}
.menu-icon {
  height: 70px;
  color: #fff;
  line-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-icon img {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: 0 10px;
}
.el-menu {
  width: 200px;
}
</style>
