import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const state = {
  menuList: [],
  userLoginInfo: {},
  cateList: [],
  SpecsList: [],
  GoodsList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  // 用来保存state 中的数据 保存到本地存储 的浏览器中
  // 当页面刷新时 将数据从浏览器存储中拿出从新赋值给state中的数据
  plugins:[createPersistedState()]
})

export default store
