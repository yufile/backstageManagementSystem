<template>
  <div class="index">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" >管理员管理</el-breadcrumb-item>
    </menu-top>
    <el-button class="add" @click="addMenu()" type="primary">添加</el-button>
    <el-table
        :data="userList"
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
          prop="username"
          label="名称" width="120">
      </el-table-column>
      <el-table-column
          prop="rolename"
          label="角色" width="120">
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
          <el-button type="danger" @click="dialogVisible = true;delId = scope.row.id">删除</el-button>
          <el-button @click="editMenu(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>是否删除</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteRole(delId)">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>

import MenuTop from "@/components/common/MenuTop";


import {getAdminList,getAdminDel} from "@/network/admin";

export default {
  name: "index",
  components: {
    MenuTop
  },
  data() {
    return {
      delId: '',
      userList: [],
      dialogVisible: false, // 控制对话框是否删除
    }
  },
  created() {
    this.getAdminList()
  },
  methods: {
    // 请求数据
    getAdminList(){
      getAdminList().then(res => {
        this.userList = res.data.list
        /*console.log(this.userList)*/
      }).catch(err => {
        console.log(err)
      })
    },
    editMenu (id){
      /*console.log(this.userList)*/
      this.$router.push("/user/" + id)
    },
    // 删除数据
    deleteRole(id) {
      getAdminDel(id).then(res => {
        /*console.log(res)*/
        if(res.data.code === 200) {
          //删除之后刷新数据
          /*console.log(res.data.list)*/
          this.getAdminList()
        }
      }).catch(err => {
        console.log(err)
      })
      this.dialogVisible = false;
    },
    addMenu() {
      this.$router.push('/user/add')
    }
  }

}
</script>

<style scoped>
.add {
  margin: 10px 0;
}
</style>
