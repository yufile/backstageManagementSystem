<template>
  <div class="edit">
    <menu-top>
      <el-breadcrumb-item slot="current-menuO" :to="{path: '/role'}">角色组件</el-breadcrumb-item>
      <el-breadcrumb-item slot="current-menuT">角色{{type}}</el-breadcrumb-item>
    </menu-top>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称" prop="title">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree :data="menuList" ref="menu-tree"
                 :props="props"
                 show-checkbox
                 default-expand-all
                 highlight-current
                 node-key="id"
                 check-strictly
                 :default-checked-keys="defaultChecked">

        </el-tree>
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
import {getRoleAdd,getRoleEdit} from "@/network/role";
import {mapActions} from 'vuex'
export default {
  name: "Edit",
  components: {
    MenuTop
  },
  data() {
    return {
      type: '添加',
      form: {
        rolename: '',
        status: '',
        menus: ''
      },
      menuList: [],
      props: {
        label:'title',
        children: 'children'
      },
      defaultChecked: []
    }
  },
  created() {
    this.getQueryMenu().then(res => {
      this.menuList = res.data.list
    }).catch(err => {
      console.log(err)
    })
    let id = this.$route.params.id;
    if(id){
      this.type = '修改'
      this.getRoleEdit(id)
    }
  },
  methods: {
    // 修改数据
    getRoleEdit(id) {
      getRoleEdit(id).then(res => {
        this.form = res.data.list
        /*console.log(res)*/
      this.defaultChecked = this.form.menus.split(',')
      }).catch(err => {
        console.log(err)
      })
    },
    ...mapActions(['getQueryMenu']),
    onSubmit() {
      let node = this.$refs['menu-tree'].getCheckedNodes()
      /*console.log(node)*/
      let menus = []
      node.forEach(item => {
        menus.push(item.id)
      })
      this.form.menus = menus.toString()
      let url = '/roleadd'
      if(this.$route.params.id){
        this.form.id = this.$route.params.id;
        url = '/roleedit'
      }
      // 添加数据
      getRoleAdd(url,this.form).then(res => {
        /*console.log(res)*/
        if(res.data.code === 200) {
          this.$router.push('/role')
        }
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
