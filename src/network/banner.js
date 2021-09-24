import {query} from "@/network/querst";

export  function getBannerList() {
    return query({
        url: '/bannerlist'
    })
}

export  function getBannerAdd(url,res) {
    return query({
        method: 'post',
        url,
        data: res
    })
}

export  function getBannerInfo(id) {
    return query({
        url: '/bannerinfo',
        params: {
            id
        }
    })
}

export  function getBannerDel(id) {
    return query({
        method: 'post',
        url: '/bannerdelete',
        data: {
            id
        }
    })
}