<template>
  <div class="index">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" >会员管理</el-breadcrumb-item>
    </menu-top>
    <el-table
        :data="memberList"
        stripe
        border
        row-key="id"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="编号"
          width="100">
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="昵称" width="120">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号" width="120">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"  width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? '' : 'danger' ">
            {{scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="status"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="editMenu(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import MenuTop from "@/components/common/MenuTop";

import {getMemberList} from "@/network/member";

export default {
  name: "Index",
  components: {
    MenuTop
  },
  data() {
    return {
      memberList: [],
      userList: [],
      dialogVisible: false, // 控制对话框是否删除
    }
  },
  created() {
    this.getMemberList()
  },
  methods: {
    getMemberList() {
      getMemberList().then(res => {
        this.memberList = res.data.list
      }).catch( err => {
        console.log(err)
      })
    },
    editMenu (id){
      console.log(this.userList)
      this.$router.push("/member/" + id)
    },
  }
}
</script>

<style scoped>
.add {
  margin: 10px 0;
}
</style>