import Vue from 'vue'
import Router from '@/../node_modules/vue-router/dist/vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/modules/Login'
import Main from '@/modules/Main'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Plugin1, Plugin2 } from '../plugins'
import shiftComponent from '@/modules/shiftComponent'
import watchComp from '@/modules/watch'
import TestCreatreElmentComp from '@/modules/testCreateElement'
import TestInject from '@/modules/TestInject'
import TestSync from '@/modules/TestSync'
import ErrorHandle from '@/modules/ErrorHandle'
import Attrs from '@/modules/Attrs'
import Filters from '@/modules/Filters'
import AboutKey from '@/modules/AboutKey'
import Functional from '@/modules/Functional'
import testExtend from '@/modules/testExtend'

const HelloWorld = r => require.ensure([], () => {
    return require('@/components/HelloWorld')
}, 'HelloWorld')

const aysTest = r => require.ensure([], () => {
    let m = require('@/modules/asyncComp').default.m1
    return m
}, 'aysTest')


console.log('88', HelloWorld)
// const aysTest = require('@/modules/asyncComp')
// console.log('|||', aysTest)
// function r () {
//     var args = [], len = arguments.length;
//     while ( len-- ) args[ len ] = arguments[ len ];

//     if (called) { return }
//     called = true;
//     return fn.apply(this, args)
// }

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
            path: '/asyncTest',
            name: 'HelloWorld',
            component: aysTest
        },
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
            path: '/testInject',
            name: 'testInject',
            component: TestInject
        },
        {
            path: '/testSync',
            name: 'testSync',
            component: TestSync
        },
        {
            path: '/errorHandle',
            name: 'errorHandle',
            component: ErrorHandle
        },
        {
            path: '/attrs',
            name: 'attrs',
            component: Attrs
        },
        {
            path: '/filters',
            name: 'filters',
            component: Filters
        },
        {
            path: '/aboutKey',
            name: 'aboutKey',
            component: AboutKey
        },
        {
            path: '/functional',
            name: 'functional',
            component: Functional
        },
        {
            path: '/extend',
            name: 'extend',
            component: testExtend
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
r.onReady((r) => {
    console.log('router ready hook:', r)
})
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
