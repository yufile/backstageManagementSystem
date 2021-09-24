import {query} from "@/network/querst"

export function getAdminList() {
    return query({
        url: '/userlist',
        params: {
            size: 10,
            page: 1
        }
    })
}
export function getAdminAdd(url,res) {
    return query({
        method: 'post',
        url,
        data: res
    })
}
export function getAdminEdit(id) {
    return query({
        method: 'get',
        url: '/userinfo',
        params: {
            uid: id
        }
    })
}
export function getAdminDel(id) {
    return query({
        method: 'post',
        url: '/userdelete',
        data: {
            id
        }
    })
}
