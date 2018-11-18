<template>
  <div class="extendArea" id="">
    <h1>Test extend</h1>
    <div id="extend1" @click="addComp(1)">$</div>
    <div id="extend2" @click="addComp(2)">$</div>
    <div id="extend3" @click="addComp(3)">$</div>
    <div id="extend4" @click="addComp(4)">$</div>
    <div id="extend5" @click="addComp(5)">$</div>
    <button>Add testExtend component</button>
    <Profile :count="0"/>
    <Profile :count="1"/>
    <Profile :count="2"/>
  </div>
</template>

<script>
import Vue from 'vue'
// 创建构造器
let Profile = Vue.extend({
    template: '<div>My count: {{count}}<br/>{{firstName}} {{lastName}} aka {{alias}}</br><button @click="func">Change extend state</button><hr/></div>',
    data: function () {
        return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg'
        }
    },
    props: {
        count: {
            type: Number,
            default: 0
        }
    },
    methods: {
        func () {
            this.firstName += '@@1'
        }
    }
})

export default {
    name: 'testExtend',
    data: () => {
        return {
        }
    },
    components: {
        Profile
    },
    methods: {
        addComp (e) {
            new Profile().$mount('#extend' + e)
        }
    },
    created () {

    }
}
</script>

<style>

</style>
