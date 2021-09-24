import {query} from "@/network/querst";

export function getCateList(id) {
    return query({
        url: '/catelist',
        params: {
            istree: id
        }
    })
}
export function getCateAdd(url,res) {
    return query({
        method: 'post',
        url,
        data: res
    })
}

export function getCateEdit(id) {
    return query({
        method: 'get',
        url: '/cateinfo',
        params: {
            id
        }
    })
}

export function getCateDel(id) {
    // 需要删除数据 传的id 需要放在data上 不能放在params 或者直接写id
    return query({
        method: 'post',
        url: '/catedelete',
        data: {
            id
        }
    })
}