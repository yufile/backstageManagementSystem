import {query} from "@/network/querst";

import moment from 'moment'
export function getMoment(value) {
    if(value.match(/^[0-9]+$/)){
        const date = new Date(value*1)
        return moment(date).format("YYYY-MM-DD")
    }
    return value

}


export  function getSeckList() {
    return query({
        url: '/secklist'
    })
}

export  function getSeckAdd(url,res) {
    return query({
        method: 'post',
        url,
        data: res

    })
}

export  function getSeckInfo(id) {
    return query({
        url: '/seckinfo',
        params: {
            id
        }

    })
}
export  function getSeckDel(id) {
    return query({
        method: 'post',
        url: '/seckdelete',
        data: {
            id
        }

    })
}