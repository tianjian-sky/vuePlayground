# render+createElemment 渲染组件
[render参考链接](https://cn.vuejs.org/v2/api/#render)
[createElement参考链接](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)

render: 
> 字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。

如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。
 createElement: 
 > createElement 到底会返回什么呢？其实不是一个实际的 DOM 元素。它更准确的名字可能是 createNodeDescription，因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，及其子节点。我们把这样的节点描述为“虚拟节点 (Virtual Node)”，也常简写它为“VNode”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

```javascript
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

```

结合vue-router: Vue.component 注册一个组件，相当于一个组件类，挂载到routes下component属性里，路由切换后应该会自动创建组件实例

``` javascript
export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/main',
            name: 'main',
            component: Main
        },
        {
            path: '/v-is',
            name: 'shiftComponent',
            component: shiftComponent
        },
        {
            path: '/v-watch',
            name: 'watchComp',
            component: watchComp
        },
        {
            path: '/createElement',
            name: 'testCreateElement',
            component: TestCreatreElmentComp
        }
    ]
})
```



