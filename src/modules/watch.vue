<template>
    <div>
         <h3>a: {{a}}</h3>
        <h3>b: {{b}}</h3>
        <h3>c: {{c}}</h3>
        <h3>d: {{d}}</h3>
        <h3>e: {{e}}</h3>
    </div>
</template>
<script>
export default {
    data: {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: {
            f: {
                g: 5
            }
        }
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
            handler: function (val, oldVal) { /* ... */ },
            immediate: true
        },
        e: [
            function handle1 (val, oldVal) { /* ... */ },
            function handle2 (val, oldVal) { /* ... */ }
        ],
        // watch vm.e.f's value: {g: 5}
        'e.f': function (val, oldVal) { /* ... */ }
    }
}


</script>