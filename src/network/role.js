import {query} from "@/network/querst";
export function getRoleList() {
  return query({
    url: '/rolelist',
  })
}

export function getRoleAdd(url,data) {
  return query({
    method: 'post',
    url,
    data
  })
}
export function getRoleEdit(id) {
  return query({
    method: 'get',
    url: '/roleinfo',
    params: {id}
  })
}

export function getRoleDel(id) {
  // 需要删除数据 传的id 需要放在data上 不能放在params 或者直接写id
  return query({
    method: 'post',
    url: '/roledelete',
    data: {
      id
    }
  })
}

