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
    },
     beforeRouteUpdate (to, from, next) {
         console.log(to, from, next)
    }
}

</script>