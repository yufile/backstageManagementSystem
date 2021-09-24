<template>
  <div class="index">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" >秒杀活动</el-breadcrumb-item>
    </menu-top>
    <el-button class="add" @click="addMenu()" type="primary">添加</el-button>
    <el-table
        :data="seckList"
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
          label="秒杀名称" width="120">
      </el-table-column>

<!--      <el-table-column
          prop="begintime"
          label="开始时间" width="120">
      </el-table-column>

      <el-table-column
          prop="endtime"
          label="结束时间" width="120">
      </el-table-column>

      <el-table-column
          prop="first_cateid"
          label="商品一级编号" width="120">
      </el-table-column>

      <el-table-column
          prop="second_cateid"
          label="商品二级编号" width="120">
      </el-table-column>

      <el-table-column
          prop="goodsid"
          label="商品编号" width="120">
      </el-table-column>-->

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

import {getSeckList,getSeckDel} from "@/network/seck";


export default {
  name: "index",
  components: {
    MenuTop
  },
  data() {
    return {
      delId: '',
      seckList: [],
      dialogVisible: false, // 控制对话框是否删除
    }
  },
  created() {
    this.getSeckList()
  },
  methods: {
    // 请求数据
    getSeckList(){
      getSeckList().then(res => {

        this.seckList = res.data.list
       /* // 将时间戳转化为 具体时间
        let timerArr = this.seckList.filter(item => item.begintime).map(timer => getMoment(timer.begintime));
        let timerArr2 = this.seckList.filter(item => item.endtime).map(timer => getMoment(timer.endtime));
        for (let i in res.data.list){
          res.data.list[i].begintime = timerArr[i]
          res.data.list[i].endtime = timerArr2[i]
        }*/
        /*console.log(res)*/
      }).catch(err => {
        console.log(err)
      })
    },
    editMenu (id){
      this.$router.push("/seck/" + id)
    },
    // 删除数据
    deleteRole(id) {
      getSeckDel(id).then(res => {
        console.log(res)
        if(res.data.code === 200) {
          //删除之后刷新数据
          /*console.log(res.data.list)*/
         this.seckList = res.data.list
        }
      }).catch(err => {
        console.log(err)
      })
      this.dialogVisible = false;
    },
    addMenu() {
      this.$router.push('/seck/add')
    }
  }

}
</script>

<style scoped>
.add {
  margin: 10px 0;
}
</style>
