// 频道接口
import request from '@/utils/request'

//获取所有频道
export function getChannel() {
    return request({
        url: '/app/v1_0/channels',
        methed: 'get',

    })
}