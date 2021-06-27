import request from '@/utils/request'

//获取验证码
export function getMobileCode(mobile) {
    return request({
        url: `/app/v1_0/sms/codes/${mobile}`,
        methed: 'get',
    })
}
//请求登录
export const login = data => {
        return request({
            method: 'POST',
            url: '/app/v1_0/authorizations',
            data
        })
    }
    // export function login(data) {
    //     return request({
    //         method: 'post',
    //         url: '/app/v1_0/authorizations',
    //         data
    //     })
    // }


//获取用户自己信息
export function getUserInfo() {
    return request({
        url: '/app/v1_0/user',
        method: 'GET',
        // 注意：该接口需要授权才能访问
        // token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    })
}

//获取用户频道列表
export function getUserChannels() {
    return request({

        url: '/app/v1_0/user/channels',
        methed: 'GET',

    })
}