<template>
    <div>
        <h1>hello i'm parent</h1>
        <div>
            <h2> TestSync: name => {{_provided.parentName}}</h2>
            <Child :syncProps.sync="syncProps"/>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        'Child': {
            props: ['syncProps'],
            inject: {
                injectName: {
                    from: 'parentName',
                    default: 'unknown'
                }
            },
            created: function () {
            },
            methods: {
                changeSyncProp () {
                    console.log(this.$props)
                    // this.$props.syncProps = 'bb'
                    this.$emit('update:syncProps', 'ufo')

                }
            },
            template: `
                <div>
                    <h3>Hello i'm child</h3>
                    <div>
                        <h3>My name: {{this.injectName }}</h3>
                        <h3>My syncProps: {{this.$props.syncProps }}</h3>
                    </div>
                    <button @click="changeSyncProp">change sync prop</button>
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
            name: 'sky',
            syncProps: 'Devil tower'
        }
    }
}
</script>

<style lang="less" scoped>

</style>


