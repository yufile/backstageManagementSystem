<template>
  <div class="edit">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" :to="{path: '/banner'}">分类组件</el-breadcrumb-item>
      <el-breadcrumb-item slot="current-menuT">分类{{type}}</el-breadcrumb-item>
    </menu-top>

    <el-form ref="form" :model="form"  label-width="80px" >
      <el-form-item label="名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false" :on-change="handSave">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
  </div>
</template>

<script>
import MenuTop from "@/components/common/MenuTop";

import {getBannerAdd,getBannerInfo} from "@/network/banner";

export default {
  name: "Edit",
  components: {MenuTop},
  data() {
    return {
      form: {
        title: "", //上级菜单的id
        status: "" //状态
      },
      img: "",
      type: '添加',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
    let params = this.$route.params.id
    if(params){
      this.type = '修改';
      this.getBannerInfo(params)
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
          let url = '/banneradd';
          if(this.type == '修改'){
            url = '/banneredit'
            resT.id = this.$route.params.id
          }
          // 由于有图片 属于文件所以需要将 数据进行上传
          let formData = new FormData();
          for (let key in resT) {
            // 这个位置给formDate 添加的数据时直接查看时查看不到了 需要通过 formDate.get();查看
            formData.append(key,resT[key]);
          }
          formData.append('img',this.img)
          getBannerAdd(url,formData).then(res => {
            if(res.data.code === 200){
              /*console.log(res)*/
              this.$router.push('/banner')
            }
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
    getBannerInfo(params) {
      getBannerInfo(params).then(res => {
        this.form = res.data.list
        this.dialogImageUrl = res.data.list.img
        this.dialogVisible = true;
        console.log(this.dialogImageUrl)
      }).catch(err => {
        console.log(err)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handSave(file) {
      /* console.log(file)*/
      // 获取 添加的图片地址
      this.img = file.raw;
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 400px;
}
</style>
