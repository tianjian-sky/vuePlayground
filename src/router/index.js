import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/modules/Login'
import Main from '@/modules/Main'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Plugin1, Plugin2 } from '../plugins'
import shiftComponent from '@/modules/shiftComponent'
import watchComp from '@/modules/watch'
import TestCreatreElmentComp from '@/modules/testCreateElement'
// import RouterTest from '@/modules/routerTest'
// import subRouterComp from '@/modules/subRouterComp'

Vue.use(Router)
Vue.use(ElementUI)
Vue.use(Plugin1, '参数1', '参数2')
Vue.use(Plugin2, '参数A', '参数B')
// 全局注册组件
Vue.component('my-component', {
    template: '<div>A custom component!</div>'
})

Vue.mixin({
    created: function () {
        var myOption = this.$options.myOption
        console.log('global mixin created hook running:', this)
        if (myOption) {
            console.log(myOption)
        }
    },
    globalAttr: {
        hello: 'world'
    },
    methods: {
        globalMixinHello: function () {
            console.log('hello from global mixin!')
        }
    },
    data: function () {
        return {
            globalMixinData1: 'world'
        }
    }
})

Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
    console.log(toVal, fromVal)
}
console.log('<><<>>><>><>', Login, new TestCreatreElmentComp())
let r = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/main',
            name: 'main',
            component: Main
        },
        {
            path: '/v-is',
            name: 'shiftComponent',
            component: shiftComponent
        },
        {
            path: '/v-watch',
            name: 'watchComp',
            component: watchComp
        },
        {
            path: '/createElement',
            name: 'testCreateElement',
            component: TestCreatreElmentComp
        },
        {
            path: '/:userId/routerTest/:password',
            name: 'routerTest',
            component: () => import('@/modules/routerTest'),
            beforeEnter: (to, from, next) => {
                console.log('BEFORE ENTER:parent', to.path)
                next()
            },
            children: [
                {
                    // 当 /user/:id/profile 匹配成功，
                    // UserProfile 会被渲染在 User 的 <router-view> 中
                    path: 'subRouterComp/:subId',
                    component: () => import('@/modules/subRouterComp'),
                    beforeEnter: (to, from, next) => {
                        console.log('BEFORE ENTER:subs', to.path)
                        next()
                    }
                }
            ]
        }
    ]
})
export default r
r.beforeEach((to, from, next) => {
    console.log('->', to.path)
    next()
})
r.beforeEach((to, from, next) => {
    console.log('-->', to.path)
    next()
})
r.beforeEach((to, from, next) => {
    console.log('--->', to.path)
    next()
})
