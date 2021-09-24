<template>
  <div class="index">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" >轮播图管理</el-breadcrumb-item>
    </menu-top>
    <el-button class="add" @click="addMenu()" type="primary">添加</el-button>
    <el-table
        :data="bannerList"
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
          prop="title"
          label="名称" width="120">
      </el-table-column>
      <el-table-column prop="img" label="图标" width="180">
        <template slot-scope="scope">
          <div class="cate-img">
            <img  :src="scope.row.img" alt="">
          </div>
        </template>
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
          <el-button @click="editMenu(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>确定删除</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteMenu(delId)">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>

import MenuTop from "@/components/common/MenuTop";
import {getBannerList,getBannerDel} from "@/network/banner";


export default {
  name: "index",
  components: {
    MenuTop
  },
  data() {
    return {
      delId: '',
      bannerList: [],
      dialogVisible: false, // 控制对话框是否删除
    }
  },
  created() {
    this.getBannerList()
  },
  methods: {

    // 请求数据
    // 使用vuex保存数据
    getBannerList() {
      getBannerList().then(res => {
        this.bannerList = res.data.list
      }).catch(err => {
        console.log(err);
      })
    },
    editMenu (id){
      /*console.log(id)*/
      this.$router.push("/banner/" + id)
    },
    // 删除数据
    deleteMenu(id) {
      getBannerDel(id).then(res => {
         console.log(res)
        if(res.data.code === 200) {
          this.bannerList = res.data.list
        }
      }).catch(err => {
        console.log(err)
      })
      this.dialogVisible = false
    },
    addMenu() {
      this.$router.push('/banner/add')
    }
  }

}
</script>

<style scoped>
.add {
  margin: 10px 0;
}
.cate-img img {
  height: 80px;
}
</style>
