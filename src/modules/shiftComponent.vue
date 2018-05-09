<template>
    <div>
       <a @click="clickHandler" data-id="1" href="javascript:;">组件1</a><a @click="clickHandler" data-id="2" href="javascript:;">组件2</a><a @click="clickHandler" data-id="3" href="javascript:;">组件3</a>
       <keep-alive>
            <component :is="compName"></component>
       </keep-alive>
    </div>
</template>

<script>
import Vue from 'vue'
const myComp1 = Vue.component('myComp1',{
    methods:{
        clickHandler: function () {
            this.$data.clicked++
        }
    },
    data: function (){
        return {
            clicked: 0
        }
    },
    template: '<h3 @click="clickHandler">hello i am 1<br/>I\'m clicked {{clicked}}</h3>'
})
const myComp2 = Vue.component('myComp2',{
    template: '<h3>hello i am 2</h3>'
})
const myComp3 = Vue.component('myComp3',{
    template: '<h3>hello i am 3</h3>'
})

export default {
    name: 'shiftComponent',
    data: () => {
        return {
            compName: null
        }
    },
    methods: {
        clickHandler: function (e) {
            let srcEle = e.target
            let attr = srcEle.getAttribute('data-id')
            this.$data.compName = 'myComp' + attr
        }
    }
}
</script>

<style>

</style>
