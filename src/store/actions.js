import {getMenuList} from "@/network/menu";
import {getCateList} from "@/network/cate";
import {getSpecsList} from "@/network/specs";
import {doLogin} from "@/network/login";
import {DO_LOGIN, GET_CATE_LIST, GET_MENU_LIST_M, GET_SPECS_LIST} from "@/store/mutations_type";
export default {
  getQueryMenu(context) {
    return new Promise((resolve, reject) => {
      getMenuList().then(res => {
        /*console.log(res)*/
        context.commit(GET_MENU_LIST_M,res.data.list)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  getUserLogin(context,params = {}) {
    /*console.log(params);*/
    return new Promise((resolve, reject) => {
      doLogin(params).then(res => {
        /*console.log(res);*/
        context.commit(DO_LOGIN,res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getQueryCate(context) {
    return new Promise((resolve, reject) => {
      getCateList(1).then(res => {
        /*console.log(res)*/
        context.commit(GET_CATE_LIST,res.data.list)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  getQuerySpecs(context) {
    return new Promise((resolve, reject) => {
      getSpecsList().then(res => {
        /*console.log(res)*/
        context.commit(GET_SPECS_LIST,res.data.list)
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },


}
