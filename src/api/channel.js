// 频道接口
import request from '@/utils/request'

//获取所有频道
export function getChannel() {
    return request({
        url: '/app/v1_0/channels',
        methed: 'get',
    })
}

/**
 * 添加用户频道
 */
export function addChannel(channel) {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}

/**
 * 删除用户指定频道
 */
export const deleteChannel = channelId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelId}`
    })
}