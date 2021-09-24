<template>
  <div class="edit">
  <menu-top>
    <el-breadcrumb-item slot="current-menuO" :to="{path: '/member'}">会员组件</el-breadcrumb-item>
    <el-breadcrumb-item slot="current-menuT">会员修改</el-breadcrumb-item>
  </menu-top>

  <el-form ref="form"  :model="form" label-width="80px">
    <el-form-item label="昵称" >
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item label="手机号" >
      <el-input v-model="form.phone"></el-input>
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

import {getMemberEdit,getMemberAdd} from "@/network/member";

export default {
  name: "Edit",
  components: {MenuTop},
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: ""  //状态
      },
    }
  },
  created() {
    let params = this.$route.params.id
    if(params){
      this.getMemberEdit(params)
    }
  },
  methods: {
    onSubmit() {
      // 提交表单时进行验证
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 深拷贝
          let data = JSON.stringify(this.form)
          let resT = JSON.parse(data)

          resT.uid = this.$route.params.id
          getMemberAdd(resT).then(res => {
            if(res.data.code === 200){
              this.$router.push('/member')
             /* console.log(resT)*/
            }
           /* console.log(res)*/
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
    getMemberEdit(params) {
      getMemberEdit(params).then(res => {
        /*console.log(res.data)*/
        this.form = res.data.list

      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
.el-input {
  width: 400px;
}

</style>
