# 利用provide inject 向子组件注入属性
* 类似react的context

``` javascript 
<template>
    <div>
        <h1>hello i'm parent</h1>
        <div>
            <h2>provided props: name => {{_provided.parentName}}</h2>
            <Child/>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        'Child': {
            inject: {
                injectName: {
                    from: 'parentName',
                    default: 'unknown'
                }
            },
            created: function () {
            },
            template: `
                <div>
                    <h3>Hello i'm child</h3>
                    <div>
                        <h3>My name: {{this.injectName }}</h3>
                    </div>
                </div>
            `
        }
    },
    mounted () {
        console.log('bbbaaa', this._provided)
        setTimeout(function () {
            this._provided.parentName = 'skybbb' // error
        }, 1000)
    },
    provide: {
        parentName: 'skyyy'
    },
    data: function () {
        return {
            name: 'sky'
        }
    }
}
</script>

<style lang="less" scoped>

</style>

```

## 注意：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。