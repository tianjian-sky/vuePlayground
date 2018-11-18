import Vue from 'vue'

// 函数式组件写法1
Vue.component('FunctionalComp', {
    functional: true,
    render: (h, context) => { // 函数式组件render方法会传入二参context
        console.log('1', h, context)
        return h({
            template: `<h3>Hello, i'm functional comp</h3>`
        })
    }
})
// 函数式组件写法2
let FunctionalComp2 = {
    functional: true,
    name: 'FunctionalComp2',
    props: {
        'functionProps1': 1,
        'functionProps2:': 2
    },
    render: (h, context) => { // 函数式组件render方法会传入二参context
        console.log('2', h, context)
        let props = context.props.functionProps1
        return h({
            template: `<h3>${props}Hello, i'm functional comp2</h3>`
        })
    }
}
export default Vue.component('testCreateElement', {
    data: function () {
        return {
            'willReRender': Math.random()
        }
    },
    created: function () {
        setTimeout(() => {
            this.$data.willReRender = '333'
            console.log('aaa')
        }, 2000)
        this.$on('triggerRerender', (e) => {
            console.log(e)
        })
    },
    render: function (createElement) {
        console.log('rendered')
        return createElement({
            template: `

                <div @click="clickHandler">
                  <a style="cursor:pointer;" @click="triggerParentRerender">触发rerender</a>
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
                },
                triggerParentRerender: function () {
                    this.$emit('triggerRerender', Math.random())
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
