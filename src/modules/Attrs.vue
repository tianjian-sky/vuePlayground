<template>
    <div>
        <h1>hello i'm parent</h1>
        <div>
            <h2>provided props: name => {{_provided.parentName}}</h2>
            <Child class="a b c" style="border:1px solid blue;" :props1="true" data-attr1="1" data-attr2="2"/>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        'Child': {
            props: ['props1'],
            inject: {
                injectName: {
                    from: 'parentName',
                    default: 'unknown'
                }
            },
            created: function () {
                console.log('attrs.....', this.$attrs)
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


