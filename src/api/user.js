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