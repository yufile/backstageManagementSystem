<template>
  <div class="edit">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" :to="{path: '/seck'}">活动组件</el-breadcrumb-item>
      <el-breadcrumb-item slot="current-menuT">活动{{type}}</el-breadcrumb-item>
    </menu-top>


    <el-form ref="form" :model="form"  label-width="80px"  :tree-props="{children:'children'}">

      <el-form-item label="活动名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="活动时间">
        <div class="block">
          <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="一级分类" >
        <el-select v-model="form.first_cateid" placeholder="请选择分类">
          <el-option v-for="item in cateList " :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类" >
        <el-select v-model="form.second_cateid" placeholder="请选择分类">
          <el-option v-for="item in sec_cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品" >
        <el-select v-model="form.giidsid" placeholder="请选择商品">
          <el-option v-for="item in goods_List " :key="item.id" :label="item.goodsname" :value="item.id"></el-option>
        </el-select>
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
import {getCateList} from "@/network/cate";
import {getSeckAdd} from "@/network/seck";
import {getSeckInfo} from "@/network/seck";
import {getGoodsList} from "@/network/goods";



export default {
  name: "Edit",
  components: {MenuTop},
  data() {
    return {
      form: {
        title: '',	// 限时秒杀名称
        begintime: '', //	开始时间
        endtime: '', //	结束时间
        giidsid: '', //	商品编号
        first_cateid: '',// 一级分类id
        second_cateid: '',	// 二级分类编号
        status: "" //状态
      },
      img: "",
      type: '添加',
      cateList: [],
      attrs: [],
      goodsList:[],
      value2: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  created() {
    let params = this.$route.params.id
    if(params){
      this.type = '修改';
      this.getSeckInfo(params)
    }
    // 一级分类
    this.getCateList(1)
    this.getGoodsList();
  },
  mounted() {

  },
  computed: {
    sec_cateList() {
      if(this.cateList.length > 0 ) {
        // 遍历 cateList中的数据 提取出 分类菜单 如果cateList中的属性id
        // 与 当前选中的一级菜单的id 相同 就将 cateList 下的子数据返回给二级菜单
        let arr = this.cateList.filter( item => item.id == this.form.first_cateid)
        if(arr[0]){
          console.log(arr)
          return  arr[0].children
        }else {
          return []
        }
      }else {
        return []
      }
    },
    goods_List() {
      if(this.goodsList.length > 0 ) {
        let arr = this.goodsList.filter( item => item.second_cateid == this.form.second_cateid)
        console.log(arr)
        if(arr){
          return  arr
        }else {
          return []
        }
      }else {
        return []
      }
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
          // 将获取的日期转化为时间戳
          /*console.log(this.value2[0]);*/
          resT.begintime = new Date(this.value2[0]).getTime();
          resT.endtime = new Date(this.value2[1]).getTime() ;
          /*console.log(resT)*/
          let url = '/seckadd';
          if(this.type == '修改'){
            url = '/seckedit'
            resT.id = this.$route.params.id
          }
          // 由于有图片 属于文件所以需要将 数据进行上传
          /*let formData = new FormData();
          for (let key in resT) {
            // 这个位置给formDate 添加的数据时直接查看时查看不到了 需要通过 formDate.get();查看
            formData.append(key,resT[key]);
          }
          formData.append('img',this.img)*/
          getSeckAdd(url,resT).then(res => {
            if(res.data.code === 200){
            /*  console.log(res)*/
              this.$router.push('/seck')
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
    getSeckInfo(params) {
      getSeckInfo(params).then(res => {
        /*console.log(res)*/
        this.form = res.data.list
        //
      /*  this.value2.append(res.data.list.begintime)
        this.value2.append(res.data.list.endtime)*/
         // 将时间戳转换为 日期 push到 value2中
        this.value2.push(new Date(res.data.list.begintime*1))
        this.value2.push(new Date(res.data.list.endtime*1))
       /* console.log(this.value2);*/
      }).catch(err => {
        console.log(err)
      })
    },
    getCateList(id) {
      getCateList(id).then(res => {
        this.cateList = res.data.list
        /*console.log(this.cateList)*/
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
    },
    // 获取商品数据名称
    getGoodsList() {
      getGoodsList().then(res=> {
        /*console.log(res)*/
        this.goodsList = res.data.list
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
.editor {
  width: 100%;
  height: 500px;
}

</style>
