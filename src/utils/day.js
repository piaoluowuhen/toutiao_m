//https://dayjs.gitee.io/docs/zh-CN/plugin/relative-time
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' //默认是英文
import relativeTime from 'dayjs/plugin/relativeTime' //处理相对时间插件

dayjs.extend(relativeTime) //配置相对时间的插件


dayjs.locale('zh-cn') // 全局使用

//dayjs()就是当前最新时间
// dayjs().format() 
// 默认返回的是 ISO8601 格式字符串 '2020-04-02T08:02:17-05:00'

// 定义一个全局过滤器，然后就可以在任何组件的模板中使用了
// 其实过滤器就相当于一个全局可用的方法（仅供模板使用）
// 参数1：过滤器名称
// 参数2：过滤器函数
// 使用方式：{{ 表达式 | 过滤器名称 }}
// 管道符前面的表达式的结果会作为参数传递到过滤器函数中
// 过滤器的返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value)) //返回多少时间前
})


// dayjs() 获取当前最新时间
// console.log(dayjs().format('YYYY-MM-DD'))

// console.log(dayjs().to(dayjs('2015'))) // 2 年以前