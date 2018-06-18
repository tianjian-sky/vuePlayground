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
            components: {
                inject: {
                    injectName: {
                        from: 'parentName',
                        default: 'unknown'
                    }
                },
                'SubChild': {
                     template: `
                        <div>
                            <h4>Hello i'm subChild</h4>
                            <div>
                                <h3>My name: {{this.injectName }}</h3>
                            </div>
                        </div>
                    `,
                    mounted () {
                        throw new Error('custom error')
                    },
                    errorCaptured (e,a,b,c,d) {
                        console.log(e,a,b,c,d)
                    }
                }
            },
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
                        <SubChild/>
                    </div>
                </div>
            `, errorCaptured (e,a,b,c,d) {
                        console.log(e,a,b,c,d)
                    }
        }
    },
    mounted () {
        setTimeout(function () {
             // error
            // this._provided.parentName = 'skybbb'
        }, 1000)
    },
    provide: {
        parentName: 'skyyy'
    },
    data: function () {
        return {
            name: 'sky'
        }
    },
     errorCaptured (e,a,b,c,d) {
        console.log(e,a,b,c,d)
    }
}
</script>

<style lang="less" scoped>

</style>


