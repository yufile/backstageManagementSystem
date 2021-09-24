import {DO_LOGIN, GET_CATE_LIST, GET_MENU_LIST_M, GET_SPECS_LIST} from "@/store/mutations_type";

export  default {
    [GET_MENU_LIST_M](state,payload) {
      state.menuList.push(...payload);
    },
    [DO_LOGIN](state,payload) {
        state.userLoginInfo = payload.data.list
    },
    outLogin(state) {
        state.userLoginInfo = {}
    },
    [GET_CATE_LIST](state,payload) {
        state.cateList.push(...payload);
    },
    [GET_SPECS_LIST](state,payload) {
        state.SpecsList.push(...payload);
    },
}
