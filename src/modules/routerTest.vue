<template>
    <div>
        <router-link to="subRouterComp/xyz" append> link</router-link>
        <h1>here to test the vue-router</h1>
        <h3>url is:{{this.$route.fullPath}}</h3>
        <h3>username is:{{this.$route.params.userId}}</h3>
        <h3>password is:{{this.$route.params.password}}</h3>
        <router-view></router-view>
        <div>
            <h2 @click="routePush">嵌套路由</h2>
             <transition name="slide">
                <router-view></router-view>
             </transition>
        </div>
    </div>
</template>
<script>
export default {
    name: 'routerTest',
    methods: {
        routePush: function () {
            this.$router.push(this.$route.path + 'subRouterComp/xyz', )
        }
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
    },
    beforeRouteEnter (to, from, next) {
        console.log('parent comp route enter: ', this)
        next()
    },
     beforeRouteUpdate (to, from, next) {
         console.log(to, from, next)
    }
}

</script>