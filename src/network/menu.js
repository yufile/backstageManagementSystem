import {query} from "@/network/querst";
export function getMenuList() {
  return query({
    url: '/menulist',
    params:{
      istree: 1
    }
  })
}
export function getMenuAdd(url,res) {
  return query({
    method: 'post',
    url,
    data: res
  })
}
export function getMenuEdit(id) {
  return query({
    method: 'get',
    url: '/menuinfo',
    params: {
      id
    }
  })
}
export function getMenuDel(id) {
  // 需要删除数据 传的id 需要放在data上 不能放在params 或者直接写id
  return query({
    method: 'post',
    url: '/menudelete',
    data: id
  })
}
