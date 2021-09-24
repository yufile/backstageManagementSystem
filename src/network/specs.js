import {query} from "@/network/querst";

export function getSpecsList() {
    return query({
        url: '/specslist',
        params: {
            size: 10,
            page: 1
        }
    })
}

export function getSpecsAdd(url,res) {
    return query({
        method: 'post',
        url,
        data: res
    })
}
export function getSpecsEdit(id) {
    return query({
        url: '/specsinfo',
        params: {
            id
        }
    })
}
export function getSpecsDel(id) {
    return query({
        method: 'post',
        url: '/specsdelete',
        data: {
            id
        }
    })
}