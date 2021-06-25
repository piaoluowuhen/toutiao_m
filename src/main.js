import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//加载全局样式
import './style/index.less'

//引入vant核心组件库
import Vant from 'vant'
//加载样式
import 'vant/lib/index.css'

//rem适配插件（html标签字体大小）
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')