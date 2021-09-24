import {query} from "@/network/querst";

export function getGoodsList() {
    return query({
        url: '/goodslist',
        params: {
            size: 10,
            page: 1
        }
    })
}

export function getGoodsEdit(id) {
    return query({
        url: '/goodsinfo',
        params: {
           id
        }
    })
}

export function getGoodsAdd(url,data) {
    return query({
        method: 'post',
        url,
        data: data
    })
}

export function getGoodsDel(id) {
    return query({
        method: 'post',
        url: '/goodsdelete',
        data: {
            id
        }
    })
}