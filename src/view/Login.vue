<template>
  <div class="login-color">
    <div class="login">
      <el-form :rules="rules" ref="form" :model="form">
        <h1>登录</h1>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSubmit()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
        rules: {
          username: [
            {required:true ,message:'用户名不能为空',trigger:'blur'},
            {min:3,max:10,message:'用户名长度不符合规范',trigger:'blur'}
          ],
          password: [
            {required:true ,message:'密码不能为空',trigger:'blur'},
            {min:3,max:10,message:'密码长度不符合规范',trigger:'blur'}
          ],
        }
    }
  },

  methods: {
    doSubmit() {
      this.$refs['form'].validate(vali => {
        if(vali) {
          this.getUserLogin(this.form).then(res => {
            if(res.data.code === 200) {
              // 获取当页面登录时 想要登录的地址 需要登录过后才能访问当前想登录的地址
              // 获取到登录页面 后面携带的query 地址
              let target = this.$route.query.redirect;
              if(!target) {
                target = '/home'
              }
              this.$router.push(target)

            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    ...mapActions(['getUserLogin'])
  },

}
</script>

<style scoped>
.login-color {
  width: 100%;
  height: 100%;
  background-color: #00acfc;
  position: relative;
}
.login {
  width: 300px;
  height: 200px ;
  margin: 0 auto;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  padding: 20px 30px 0;
  box-shadow: 2px 2px 3px -1px #747474,
  -2px -2px 3px -1px #747474,
  -2px 2px 3px -1px #747474,
  2px -2px 3px -1px #747474;
  border-radius: 10px ;
  background-color: #fff;
}
.login h1 {
  text-align: center;
  margin-bottom: 10px ;
}
.el-button {
  width: 200px;
  margin-left: 30px;
}
.el-input {
  width: 200px;
  margin-left: 0;
}
</style>
