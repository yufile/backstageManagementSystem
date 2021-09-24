<template>
  <div class="edit">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" :to="{path: '/menu'}">菜单组件</el-breadcrumb-item>
      <el-breadcrumb-item slot="current-menuT">菜单{{type}}</el-breadcrumb-item>
    </menu-top>

    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单"  prop="pid">
        <el-select v-model="form.pid" placeholder="请选择上级菜单">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option v-for="item in menuList " :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="1">目录</el-radio>
          <el-radio label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.type == 1" label="目录图标" prop="icon">
        <el-input  v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type == 2" label="菜单地址" prop="url">
        <el-input v-model="form.url"></el-input>
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
import {getMenuAdd,getMenuEdit,getMenuList} from "@/network/menu";

export default {
  name: "Edit",
  components: {MenuTop},
  data() {
    return {
      form: {
        pid: "", //上级菜单的id
        title: "", //菜单名称
        type: "", //菜单类型  1：目录  2：菜单
        icon: "",
        url: "",
        status: "" //状态
      },
      rules: {
        title: [
          {required:true ,message:'菜单名称不能为空',trigger:'blur'},
          {min:1,max:20,message:'菜单名称长度不符合规范',trigger:'blur'}
        ],
        pid: [
          {required:true ,message:'请选择上级菜单',trigger:'blur'},
        ],
        type: [
          {required:true ,message:'请选择菜单类型',trigger:'blur'},
        ],
        icon: [
          {required:true ,message:'菜单图标不能为空',trigger:'blur'},
          {min:1,max:20,message:'菜单图标长度不符合规范',trigger:'blur'}
        ],
        url: [
          {required:true ,message:'菜单地址不能为空',trigger:'blur'},
          {min:1,max:20,message:'菜单地址长度不符合规范',trigger:'blur'}
        ]
      },
      type: '添加',
      menuList: []
    }
  },
  created() {
    let params = this.$route.params.id
    if(params){
      this.type = '修改';
      this.getMenuEdit(params)
    }
    this.getMenuList()
  },
  methods: {
    onSubmit() {
      // 提交表单时进行验证
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 深拷贝
          let data = JSON.stringify(this.form)
          let resT = JSON.parse(data)
          let url = '/menuadd';
          if(this.type == '修改'){
            url = '/menuedit'
            resT.id = this.$route.params.id
          }
          getMenuAdd(url,resT).then(res => {
            if(res.data.code === 200){
              this.$router.push('/menu')
             /* console.log(resT)*/
            }
            console.log(res)
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
    getMenuEdit(params) {
      getMenuEdit(params).then(res => {
        this.form = res.data.list
        /*console.log(res)*/
      }).catch(err => {
        console.log(err)
      })
    },
    getMenuList() {
      getMenuList().then(res => {
        this.menuList = res.data.list
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
