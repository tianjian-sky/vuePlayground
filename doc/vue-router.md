# vue-router

[TOC]

##### 1.路由参数与获取
* 通过  this.$route.params
定义：
```javascript
export default new Router({
    routes: [
        {
            path: '/:userId/routerTest/:password',
            name: 'routerTest',
            component: RouterTest
        }
    ]
})
```
路由页面：
```javascript
<template>
    <div>
        <h1>here to test the vue-router</h1>
        <h3>url is:{{this.$route.fullPath}}</h3>
        <h3>username is:{{this.$route.params.userId}}</h3>
        <h3>password is:{{this.$route.params.password}}</h3>
        <div>

        </div>
    </div>
</template>
<script>
export default {
    name: 'routerTest',
    methods: {
    },
    data: function () {
        return {
        }
    },
    mounted: function () {
        console.log('ROUTER===>mounted', this, this.$route)
    },
    updated: function () {
    },
    watch: {
        '$route' (from, to) {
            console.log(from, to)
        }
    }
}

</script>
```

##### 2.路由参数改变时，不会重新创建对应的组件
* 生命周期hooks不会被调用
> 同上例

##### 3.路由参数改变时，响应变化：
* watch
```javascript
 watch: {
    '$route' (from, to) {
        console.log(from, to)
    }
}
```
* beforeRouteUpdate 导航守卫

```javascript
beforeRouteUpdate (to, from, next) {
    console.log(to, from, next)
}
```

##### 4.嵌套路由
* 定义：
```javascript
 {
    path: '/:userId/routerTest/:password',
    name: 'routerTest',
    component: RouterTest,
    children: [
        {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'subRouterComp/:subId',
            component: subRouterComp
        }
    ]
}
```
* 嵌入：
```javascript
<template>
    <div>
        <h1>here to test the vue-router</h1>
        <h3>url is:{{this.$route.fullPath}}</h3>
        <h3>username is:{{this.$route.params.userId}}</h3>
        <h3>password is:{{this.$route.params.password}}</h3>
        <router-view></router-view>
        <div>
            <h2>嵌套路由</h2>
            <router-view></router-view>
        </div>
    </div>
</template>
```
##### 5.命名视图 
``` javascript
<template>
<div id="app">
  <h1>Named Views</h1>
  <ul>
    <li>
      <router-link to="/">/</router-link>
    </li>
    <li>
      <router-link to="/other">/other</router-link>
    </li>
  </ul>
  <router-view class="view one"></router-view>
  <router-view class="view two" name="a"></router-view>
  <router-view class="view three" name="b"></router-view>
</div>
</template>
<script>
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    }
  ]
})

new Vue({
	router,
  el: '#app'
})

</script>
```
##### 6.路由组件传参
```javascript
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```
##### 7. hooks and next
* 确保同一个hooks里注册的下一个处理程序能执行 ？
```javascript
r.beforeEach((to, from, next) => {
    console.log('->', to.path)
    next()
})
r.beforeEach((to, from, next) => {
    console.log('-->', to.path)
    next()
    // next(false)
})
r.beforeEach((to, from, next) => {
    console.log('--->', to.path)
    next()
})
```
``` javascript
{
    path: '/:userId/routerTest/:password',
    name: 'routerTest',
    component: RouterTest,
    beforeEnter: (to, from, next) => {
        console.log('BEFORE ENTER:', to.path)
        next() // 此处next去掉，子router的beforeEnter就不会执行
    },
    children: [
        {
            // 当 /user/:id/profile 匹配成功，
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'subRouterComp/:subId',
            component: subRouterComp,
            beforeEnter: (to, from, next) => {
                console.log('BEFORE ENTER:', to.path)
                next()
            }
        }
    ]
}
```
##### 8.vue-router的hooks 
* 全局：
    * router.beforeEach
    * router.beforeResolve
    * router.afterEach
* 路由：
    * beforeEnter
* 组件
    * beforeRouteEnter （可以用来实现导航前异步加载数据）
    * beforeRouteUpdate
    * beforeRouteLeave
>守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于。,队列中所有都执行完，才会resolved，路由对应的视图才会成功解析。
当前hook的最后一个守卫的next()必须调用，否则不会resolve
``` javascript
{
    path: '/:userId/routerTest/:password',
    name: 'routerTest',
    component: RouterTest,
    beforeEnter: (to, from, next) => {
        console.log('BEFORE ENTER:', to.path)
        next() // 此处next去掉，子router的beforeEnter就不会执行，此路由对应的视图也不会被解析
    },
    children: [
        {
            // 当 /user/:id/profile 匹配成功，v
            // UserProfile 会被渲染在 User 的 <router-view> 中
            path: 'subRouterComp/:subId',
            component: subRouterComp,
            beforeEnter: (to, from, next) => {
                console.log('BEFORE ENTER:', to.path)
                next()
            }
        }
    ]
}
```
##### 9.数据获取
* 导航前获取

```javascript
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}
```

##### 10.路由懒加载
```javascript
 {
    path: '/:userId/routerTest/:password',
    name: 'routerTest',
    component: () => import('@/modules/routerTest'),
    beforeEnter: (to, from, next) => {
        console.log('BEFORE ENTER:parent', to.path)
        next()
    }
 }
```





