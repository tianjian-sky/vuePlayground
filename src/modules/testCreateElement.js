import Vue from 'vue'

export default Vue.component('testCreateElement', {
    render: function (createElement) {
        return createElement({
            template: `
                <div @click="clickHandler">
                    <h1>This component is created by render function :):):)</h1>
                    <p>
                        {{statusNum}}
                    </p>
                    <h2>My name is: {{name}}</h2>
                    <h2>My age is: {{age}}</h2>
                    <slot></slot>
                </div>
            `,
            props: ['testProp1', 'testProp2'],
            data: function () {
                return {
                    statusNum: Math.random() * 10000
                }
            },
            methods: {
                clickHandler: function () {
                    this.$data.statusNum = Math.random() * 1000
                }
            }
        }, {
            // 和`v-bind:class`一样的 API
            'class': {
                foo: true,
                bar: false
            },
            // 和`v-bind:style`一样的 API
            style: {
                color: 'red',
                fontSize: '14px'
            },
            // 正常的 HTML 特性
            attrs: {
                id: 'foo'
            },
            // 组件 props
            props: {
                myProp: 'bar'
            }
        }, [
            '先写一些文字',
            createElement('h1', '一则头条')
        ])
    }
})
