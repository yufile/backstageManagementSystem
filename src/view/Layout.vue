<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
        <menu-item></menu-item>
      </el-aside>
      <el-main>
        <el-header>
          <div class="page-header">
            <img src="@/assets/img/base/a1.png" alt="">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{userLoginInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item ><span @click="exit">退出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <div class="content">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MenuItem from "@/components/common/MenuItem";
import {mapState,mapMutations} from 'vuex'
export default {
  name: "Layout",
  components: {
    MenuItem
  },
  computed: {
    ...mapState(['userLoginInfo'])
  },
  methods: {
    exit() {
      // 清空state中的 userLoginInfo
      this.outLogin()
      this.$router.push('/login')
    },
    ...mapMutations(["outLogin"])
  }
}
</script>

<style scoped>
.layout {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
}
.el-main {
  padding: 0;
}
.content {
  padding: 20px;
}
.el-header {
  width: 100%;
  height: 50px;
  padding: 0;
  background-color: #ddd;
  border-bottom: 1px solid #ddd ;
  box-shadow: 0 -1px 2px 1px #363636;
  position: relative;
}
.page-header img {
  width: 30px;
  height: 30px;
}
.page-header {
  position:absolute;
  top: 10px;
  right: 50px;
  display: flex;
  align-items: center;
}
</style>
