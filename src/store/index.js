import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: JSON.parse(window.localStorage.getItem('token')), //当前用户token  初始化时存储本地token并且json序列化
    },
    mutations: {
        settoken(state, data) {
            state.token = data
                //本地存储持久化
            window.localStorage.setItem('token', JSON.stringify(data)) //当前存储是对象转化成json格式的字符串
        }
    },
    actions: {},
    modules: {}
})