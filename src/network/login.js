import {query} from "@/network/querst";

export function doLogin(params) {
    return query({
        method: 'post',
        url: '/userlogin',
        data: params
    })
}