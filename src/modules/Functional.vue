<template>
<div>
  <h1>Functional components!</h1>
  <funcComp word="hello!"/>
</div>
</template>

<script>
let funcComp = {
    functional: true,
    // Props 可选
    props: {
        word: {
            type: String
        }
    },
    // 为了弥补缺少的实例
    // 提供第二个参数作为上下文
    render: (h, context) => { // 函数式组件render方法会传入二参context
        console.log('functional:...', h, context)
        return h({
            template: `<h3>${context.props.word}, i'm functional comp2</h3>`
        }, 'section', {
            props: {
                word: 'helloooooo'
            }
        })
    },
    created () {
        console.log('functional component context:', this)
    }
}

export default {
    name: 'functional',
    components: {
        funcComp
    }
}

</script>
