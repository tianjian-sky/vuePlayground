<template>
    <div @click="changeValue">
        <h3>a: {{a}}</h3>
        <h3>input element:<input :value="a"/></h3>
        <h3>b: {{b}}</h3>
        <h3>c: {{c}}</h3>
        <h3>d: {{d}}</h3>
        <h3>e: {{e}}</h3>
    </div>
</template>
<script>
export default {
    methods: {
        changeValue: function () {
            this.$data.a = Math.random() * 1000
            this.$data.e.f.g = Math.random() * 999
        }
    },
    data: function () {
        return {
            a: 1,
            b: 2,
            c: 3,
            d: 4,
            e: {
                f: {
                    g: 5
                }
            }
        }
    },
    mounted: function () {
        for (let i = 0; i < 10; i++) {
            this.$data.b++
        }
        console.log(this)
    },
    updated: function () {
        console.log('updated:', this)
    },
    watch: {
        a: function (val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal)
        },
        // 方法名
        b: 'someMethod',
        // 深度 watcher
        c: {
            handler: function (val, oldVal) { /* ... */ },
            deep: true
        },
        // 该回调将会在侦听开始之后被立即调用
        d: {
            handler: function (val, oldVal) { console.log('watch with immediate', val, oldVal)},
            immediate: true
        },
        e: [
            function handle1 (val, oldVal) { console.log('wh1', val, oldVal) },
            function handle2 (val, oldVal) { console.log('wh2', val, oldVal) }
        ],
        // watch vm.e.f's value: {g: 5}
        'e.f': function (val, oldVal) { /* ... */ }
    }
}

</script>