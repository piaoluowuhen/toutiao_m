import request from '@/utils/request'

//获取频道新闻
export function getAtrcleList(params) {
    return request({
        url: '/app/v1_1/articles',
        methed: 'get',
        params,
    })
}