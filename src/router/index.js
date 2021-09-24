import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

const Login = () => import('@/view/Login')
const Layout = () => import('@/view/Layout')
const Home = () => import('@/view/home/Index')

const Menu = () => import('@/view/menu/Index')
const Edit = () => import('@/view/menu/Edit')
const Role = () => import('@/view/role/Index')
const RoleEdit = () => import('@/view/role/Edit')
const Admin = () => import('@/view/admin/Index')
const AdminAdd = () => import('@/view/admin/Edit')
const AdminEdit = () => import('@/view/admin/Edit')

const Cate = () => import('@/view/cate/Index')
const CateAdd = () => import('@/view/cate/Edit')
const CateEdit = () => import('@/view/cate/Edit')

const Spec = () => import('@/view/Spec/Index')
const SpecAdd = () => import('@/view/Spec/Edit')
const SpecEdit = () => import('@/view/Spec/Edit')

const Goods = () => import('@/view/goods/Index')
const GoodsAdd = () => import('@/view/goods/Edit')
const GoodsEdit = () => import('@/view/goods/Edit')

const Member = () => import('@/view/member/Index')
const MemberEdit = () => import('@/view/member/Edit')

const Banner = () => import('@/view/banner/Index')
const BannerAdd = () => import('@/view/banner/Edit')
const BannerEdit = () => import('@/view/banner/Edit')

const Seck = () => import('@/view/seck/Index')
const SeckAdd = () => import('@/view/seck/Edit')
const SeckEdit = () => import('@/view/seck/Edit')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta:{ Navigation: true },
    children: [

      {
        path: '/home',
        component: Home
      },
      // 菜单管理
      {
        path: '/menu',
        component: Menu
      },
      {
        path: '/edit',
        component: Edit
      },
      {
        path: '/menu/:id',
        component: Edit
      },
        // 角色管理
      {
        path: '/role',
        component: Role
      },
        // 添加
      {
        path: '/role/add',
        component: RoleEdit
      },
        // 修改
      {
        path: '/role/:id',
        component: RoleEdit
      },
        // 管理员管理
      {
        path: '/user',
        component: Admin
      },
      {
        path: '/user/add',
        component: AdminAdd
      },
      {
        path: '/user/:id',
        component: AdminEdit
      },
        // 分类管理
      {
        path: '/cate',
        component: Cate
      },
      {
        path: '/cate/add',
        component: CateAdd
      },
      {
        path: '/cate/:id',
        component: CateEdit
      },
      // 规格管理
      {
        path: '/specs',
        component: Spec
      },
      {
        path: '/specs/add',
        component: SpecAdd
      },
      {
        path: '/specs/:id',
        component: SpecEdit
      },
      // 商品管理
      {
        path: '/goods',
        component: Goods
      },
      {
        path: '/goods/add',
        component: GoodsAdd
      },
      {
        path: '/goods/:id',
        component: GoodsEdit
      },
      // 会员管理
      {
        path: '/member',
        component: Member
      },
      {
        path: '/member/:id',
        component: MemberEdit
      },
      // 轮播图管理
      {
        path: '/banner',
        component: Banner
      },
      {
        path: '/banner/add',
        component: BannerAdd
      },
      {
        path: '/banner/:id',
        component: BannerEdit
      },
      // 秒杀活动
      {
        path: '/seck',
        component: Seck
      },
      {
        path: '/seck/add',
        component: SeckAdd
      },
      {
        path: '/seck/:id',
        component: SeckEdit
      },
    ]
  },
  {
    path: '/login',
    component: Login
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
 // 使用全局前置路由守卫 来判断当前页面是否登录
router.beforeEach((to, from, next) => {
  // 判断当前 访问的路由中是否存在 meta: {Navigation: true} 存在这个数据的需要使用路由守卫
  if(to.matched.some(recored => recored.meta.Navigation)) {
    if(store.state.userLoginInfo.token){ // 判断当前保存的登录信息状态 是否有token 如果没有就 登录
      /*console.log(to)*/
      next()
    }else{
      next({
        path:'/login',
        query: {
          redirect: to.fullPath // 用来保存当前未登录时想访问的地址 当登录后跳转到想登录的地址
        }
      })
    }
  }else {
    // 如果不存在 直接跳转
    next()
  }
})
export default router
