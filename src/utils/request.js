/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径
    // 自定义后端返回的原始数据
    // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
    transformResponse: [function(data) {
        try {
            return JSONBig.parse(data)
        } catch (err) {
            return data
        }

        // axios 默认会在内部这样来处理后端返回的数据
        // return JSON.parse(data)
    }]
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