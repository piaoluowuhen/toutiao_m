/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/' // 接口的基准路径
})

// 请求拦截器
request.interceptors.request.use(function(config) {
    const { token } = store.state
    if (token && token.token) {
        //如果有vuex数据token  则在请求头添加令牌
        config.headers.Authorization = `Bearer ${token.token}`
    }
    return config
}, function(err) {
    //如果请求错了（还没发出去）进入这里
    return Promise.reject(err)
})


// 响应拦截器

export default request