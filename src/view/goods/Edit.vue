<template>
  <div class="edit">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" :to="{path: '/goods'}">商品组件</el-breadcrumb-item>
      <el-breadcrumb-item slot="current-menuT">商品{{type}}</el-breadcrumb-item>
    </menu-top>


    <el-form ref="form" :model="form"  label-width="80px"  :tree-props="{children:'children'}">

      <el-form-item label="商品名称">
        <el-input v-model="form.goodsname"></el-input>
      </el-form-item>

      <el-form-item label="一级分类" >
        <el-select v-model="form.first_cateid" placeholder="请选择分类">
          <el-option v-for="item in cateList " :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" >
        <el-select v-model="form.second_cateid" placeholder="请选择分类">
          <el-option v-for="item in sec_cateList " :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品价格">
        <el-input type="number"  v-model="form.price"></el-input>
      </el-form-item>

      <el-form-item label="市场价格">
        <el-input type="number" v-model="form.market_price"></el-input>
      </el-form-item>

      <el-form-item label="图片">
        <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false" :on-change="handSave">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="商品规格" >
        <el-select v-model="form.specsid" @change="attrsChange(form.specsid)" placeholder="请选择规格">
          <el-option v-for="item in specsList " :key="item.id" :label="item.specsname" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格属性" >
        <el-select v-model="form.specsattr" placeholder="规格属性" multiple>
          <el-option v-for="(item) in attrs " :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否新品">
        <el-switch
            v-model="form.isnew"
            :active-value="1"
            :inactive-value="0"
            active-color="green"
            inactive-color="red"></el-switch>
      </el-form-item>

      <el-form-item label="是否热卖">
        <el-switch
            v-model="form.ishot"
            :active-value="1"
            :inactive-value="0"
            active-color="green"
            inactive-color="red"></el-switch>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
            v-model="form.status"
                   :active-value="1"
                   :inactive-value="0"
                   active-color="green"
                   inactive-color="red"></el-switch>
      </el-form-item>

      <el-form-item label="详细信息">
        <div class="editor" ref="editor">
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import E from 'wangeditor'

import MenuTop from "@/components/common/MenuTop";
import {getCateList} from "@/network/cate";
import {mapActions} from 'vuex'
import {getGoodsEdit,getGoodsAdd} from "@/network/goods";
import {getSpecsEdit} from "@/network/specs";

export default {
  name: "Edit",
  components: {MenuTop},
  data() {
    return {
      form: {
        first_cateid: '',// 一级分类id
        second_cateid: '',	// 二级分类编号
        goodsname: '',	// 商品名称
        price: '', //	商品价格
        market_price: '', //	市场价格
        description: '', //	商品描述
        specsid: '',	 // 商品规格编号
        specsattr: '', //	商品规格属性
        isnew: ''	, // 是否新品 1 ,2
        ishot: '',  //	是否热卖推荐 1, 2
        status: "" //状态
      },
      img: "",
      type: '添加',
      cateList: [],
      specsList:[],
      attrs: [],
      editor: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
    let params = this.$route.params.id
    if(params){
      this.type = '修改';
      this.getGoodsEdit(params)
    }
    // 一级分类
    this.getCateList(1)
    // 商品规格
    this.getQuerySpecs().then(res => {

      this.specsList = res.data.list;
      /*console.log(this.specsList)*/
    }).catch(err => {
      console.log(err)
    })
  },
  mounted() {
    // 初始化富文本编译器
    this.editor = new E(this.$refs.editor)
    this.editor.create()
  },
  computed: {
    sec_cateList() {
      if(this.cateList.length > 0 ) {
        // 遍历 cateList中的数据 提取出 分类菜单 如果cateList中的属性id
        // 与 当前选中的一级菜单的id 相同 就将 cateList 下的子数据返回给二级菜单
        let arr = this.cateList.filter( item => item.id == this.form.first_cateid)
        if(arr[0]){
          /*console.log(arr[0].children)*/
          return  arr[0].children
        }else {
          return []
        }
      }else {
        return []
      }
    },
  },
  methods: {
    // 商品规格属性
    attrsChange(id) {
      getSpecsEdit(id).then(res => {
        this.attrs = res.data.list[0].attrs
        /*console.log(this.attrs)*/
      }).catch(err => {
        console.log(err)
      })
    }
    ,
    // 商品规格
    ...mapActions(['getQuerySpecs']),
    onSubmit() {
      // 提交表单时进行验证
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 深拷贝
          let data = JSON.stringify(this.form)
          let resT = JSON.parse(data)
          // 获取富文本选择器 内容
          resT.description = this.editor.txt.html()

          let url = '/goodsadd';
          if(this.type == '修改'){
            url = '/goodsedit'
            resT.id = this.$route.params.id
          }
          // 由于有图片 属于文件所以需要将 数据进行上传
          let formData = new FormData();
          for (let key in resT) {
            // 这个位置给formDate 添加的数据时直接查看时查看不到了 需要通过 formDate.get();查看
            formData.append(key,resT[key]);
          }
          formData.append('img',this.img)
          getGoodsAdd(url,formData).then(res => {
            if(res.data.code === 200){
              /*console.log(res)*/
              this.$router.push('/goods')
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
    getGoodsEdit(params) {
      getGoodsEdit(params).then(res => {
       /* console.log(res)*/
        // 将获取的内容 设置给富文本编译器
        this.editor.txt.html(res.data.list.description)
        this.form = res.data.list
        // 将返回的 参数 数据 分割成字符串 在赋值给specsattr
        this.form.specsattr = res.data.list.specsattr.split(',')
        this.dialogImageUrl = res.data.list.img
        this.dialogVisible = true;
      }).catch(err => {
        console.log(err)
      })
    },
    getCateList(id) {
      getCateList(id).then(res => {
        this.cateList = res.data.list
       /* console.log(this.cateList)*/
      }).catch(err => {
        console.log(err)
      })
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
.editor {
  width: 100%;
  height: 500px;
}

</style>
