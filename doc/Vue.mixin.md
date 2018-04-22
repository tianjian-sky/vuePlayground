# Vue.mixin

### xample： 
main.js
```
Vue.mixin({
    created: function () {
        var myOption = this.$options.myOption
        console.log('global mixin created hook running:', this)
        if (myOption) {
            console.log(myOption)
        }
    },
    globalAttr: {
        hello: 'world'
    },
    methods: {
        globalMixinHello: function () {
            console.log('hello from global mixin!')
        }
    },
    data: function () {
        return {
            globalMixinData1: 'world'
        }
    }
})
```
main.vue 
```

```
程序执行结果： globlal mixin的created钩子和组件自己的created hooks都会执行，
global mixin 对象 methods里的方法和data里的属性都会出现在组件的对象上。 
