import Vue from 'vue'

// 函数式组件写法1
Vue.component('FunctionalComp', {
    functional: true,
    render: (h, context) => { // 函数式组件render方法会传入二参context
        console.log(h, context)
        return h({
            template: `<h3>Hello, i'm functional comp</h3>`
        })
    }
})
// 函数式组件写法2
let FunctionalComp2 = {
    name: 'FunctionalComp2',
    render: (h, context) => { // 函数式组件render方法会传入二参context
        console.log(h, context)
        return h({
            template: `<h3>Hello, i'm functional comp2</h3>`
        })
    }
}
export default Vue.component('testCreateElement', {
    render: function (createElement) {
        return createElement({
            template: `
                <div @click="clickHandler">
                    <h1>This component is created by render function :):):)</h1>
                    <p>
                        {{statusNum}}
                    </p>
                    <h2>My name is: {{$props.name}}</h2>
                    <h2>My age is: </h2>
                    <slot></slot>
                    <FunctionalComp/>
                    <FunctionalComp2/>
                </div>
            `,
            components: {FunctionalComp2},
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
                name: 'Mike',
                myProp: 'bar'
            }
        }, [
            '先写一些文字',
            createElement('h1', '一则头条')
        ])
    }
})
