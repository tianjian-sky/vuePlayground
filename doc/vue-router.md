# vue-router

1.路由参数与获取
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

2.路由参数改变时，不会重新创建对应的组件
* 生命周期hooks不会被调用
> 同上例

3.路由参数改变时，响应变化：
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

4.嵌套路由
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







