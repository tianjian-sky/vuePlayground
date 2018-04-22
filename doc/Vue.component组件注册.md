# 组件注册
### 1. 全局注册 Vue.component (不需要import即可全局使用)
```
Vue.component('my-component', {
  // 选项
})
```
组件在注册之后，便可以作为自定义元素 <my-component></my-component> 在一个实例的模板中使用。注意确保在初始化根实例之前注册组件：

### 2. 局部注册 （需要impoprt，只能在特定上下文使用） 可以通过某个 Vue 实例/组件的实例选项 components 注册仅在其作用域中可用的组件：

```

var Child = {
  template: '<div>A custom component!</div>'
}

new Vue({
  // ...
  components: {
    // <my-component> 将只在父组件模板中可用
    'my-component': Child
  }
})
```
