<template>
    <div>
        <h1>here is nested router</h1>
        <h3>url is:{{this.$route.fullPath}}</h3>
        <h3>username is:{{this.$route.params.userId}}</h3>
        <h3>password is:{{this.$route.params.password}}</h3>
        <h3>password is:{{this.$route.params.subId}}</h3>
    </div>
</template>
<script>
export default {
    name: 'subRouterComp',
    methods: {
    },
    data: function () {
        return {
        }
    },
    mounted: function () {
        console.log('SUB_ROUTER:', this, this.$route)
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