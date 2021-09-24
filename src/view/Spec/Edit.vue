<template>
  <div class="edit">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" :to="{path: '/specs'}">规格组件</el-breadcrumb-item>
      <el-breadcrumb-item slot="current-menuT">规格{{type}}</el-breadcrumb-item>
    </menu-top>

    <el-form ref="form"  :model="form" label-width="80px">
      <el-form-item label="规格名称" >
        <el-input v-model="form.specsname"></el-input>
      </el-form-item>

      <el-form-item label="规格属性">
        <el-input v-for="(item,index) of attrs" :key="index" v-model="item.value"></el-input>
      </el-form-item>
        <el-button @click="addAttrs" type="primary">添加规格</el-button>
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

import {getSpecsAdd,getSpecsEdit} from "@/network/specs";

export default {
  name: "Edit",
  components: {MenuTop},
  data() {
    return {
      form: {
        specsname: '',
        status: ""  //状态
      },
      attrs: [{value: ''}],
      type: '添加',
      adminList: []
    }
  },
  created() {
    let params = this.$route.params.id
   /* console.log(params);*/
    if(params){
      this.type = '修改';
      this.getSpecsEdit(params)
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
          resT.attrs = this.attrs.map(item => item.value).toString()
          let url = '/specsadd';
          if(this.type == '修改'){
            url = '/specsedit'
            resT.uid = this.$route.params.id
          }
         /* console.log(resT)*/
          getSpecsAdd(url,resT).then(res => {
            if(res.data.code === 200){
              this.$router.push('/specs')
             /* console.log(res)*/
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
    getSpecsEdit(params) {
      getSpecsEdit(params).then(res => {
        /*console.log(res.data.list[0].attrs)*/
        this.form = res.data.list[0]
        this.attrs = []
        for (let i in res.data.list[0].attrs) {
          //将返回数据中的 attrs中的数据 先添加到value 中在push到 attrs中
          this.attrs.push({value:res.data.list[0].attrs[i]})
        }
       /* console.log(this.attrs)*/
      }).catch(err => {
        console.log(err)
      })
    },
    addAttrs() {
      this.attrs.push({value: ''})
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 400px;
  display: block;
}

</style>
