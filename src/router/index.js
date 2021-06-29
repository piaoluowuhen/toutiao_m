import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
    // 路由表
const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login'),

    }, {
        path: '/',
        // name: 'layout',
        component: () =>
            import ('@/views/layout'),
        children: [{
            path: '', //默认子路由
            name: 'home',
            component: () =>
                import ('@/views/home')
        }, {
            path: '/my',
            name: 'my',
            component: () =>
                import ('@/views/my')
        }, {
            path: '/qa',
            name: 'qa',
            component: () =>
                import ('@/views/qa')
        }, {
            path: '/video',
            name: 'video',
            component: () =>
                import ('@/views/video')
        }, ]

    }, {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/search')
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: () =>
            import ('@/views/article'),
        props: true, //开启props传参，直接把动态参数映射到组件props

    }
]

const router = new VueRouter({
    routes
})

export default router