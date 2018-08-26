<template>
    <div>
        <h1>Vue 过滤器</h1>
        <div>
            过滤前：{{name}}<br>
            过滤后：{{name | myFilter('yu', 'tianjian')}} <!-- 通过filters也可以达到计算属性的效果 -->
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    provide: {
        parentName: 'skyyy'
    },
    filters: {
        myFilter (value, arg1, arg2) {
            console.log('filter:', arg1, arg2)
            return arg1 + arg2 + ':' + value
        }
    },
    data: function () {
        return {
            name: 'sky'
        }
    },
    mounted () {
        setTimeout(() => {
            this.name = 'asshole' // 通过filters也可以达到计算属性的效果
        }, 3000)
    }
}
</script>

<style lang="less" scoped>

</style>
