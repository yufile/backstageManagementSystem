<template>
  <div class="edit">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" :to="{path: '/user'}">管理员组件</el-breadcrumb-item>
      <el-breadcrumb-item slot="current-menuT">管理员{{type}}</el-breadcrumb-item>
    </menu-top>

    <el-form ref="form"  :model="form" label-width="80px">
      <el-form-item label="名称" >
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="所属角色" >
        <el-select v-model="form.roleid" placeholder="请选择角色">
          <el-option v-for="item in adminList " :key="item.id" :label="item.rolename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
            active-color="green"
            inactive-color="red"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!--    <div>{{menuList}}</div>-->
  </div>
</template>

<script>
import MenuTop from "@/components/common/MenuTop";
import {getAdminAdd,getAdminEdit} from "@/network/admin";
import  {getRoleList} from "@/network/role";

export default {
  name: "Edit",
  components: {MenuTop},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: ""  //状态
      },
      type: '添加',
      adminList: []
    }
  },
  created() {
    let params = this.$route.params.id
    if(params){
      this.type = '修改';
      this.getAdminEdit(params)
    }
    this.getRoleList()
  },
  methods: {
    onSubmit() {
      // 提交表单时进行验证
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 深拷贝
          let data = JSON.stringify(this.form)
          let resT = JSON.parse(data)
          let url = '/useradd';
          if(this.type == '修改'){
            url = '/useredit'
            resT.uid = this.$route.params.id
          }
          getAdminAdd(url,resT).then(res => {
            if(res.data.code === 200){
              this.$router.push('/user')
              /*console.log(resT)*/
            }
            /*console.log(res)*/
          }).catch(err=>{
            console.log(err)
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 获取一条数据
    getAdminEdit(params) {
      getAdminEdit(params).then(res => {
        this.form = res.data.list
        /*console.log(res.data)*/
      }).catch(err => {
        console.log(err)
      })
    },
    getRoleList() {
      getRoleList().then(res => {
        this.adminList = res.data.list
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 400px;
}

</style>
