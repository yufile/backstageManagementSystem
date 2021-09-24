import {query} from "@/network/querst";

export function getMemberList() {
    return query({
        url: '/memberlist',
        params: {
            size: 10,
            page: 1
        }
    })
}

export function getMemberEdit(id) {
    return query({
        url: '/memberinfo',
        params: {
            uid: id
        }
    })
}

export function getMemberAdd(res) {
    return query({
        method:'post',
        url: '/memberedit',
        data: res
    })
}