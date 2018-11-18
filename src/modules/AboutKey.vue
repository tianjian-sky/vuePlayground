<template>
    <div>
      <h1>About key</h1>
      <template>
          <div v-for="(item, index) in options" :key="index">
            <optionDiv  :initialValue="item" :data-optionIndex="index" />
            <button @click="moveUp($event, index)">moveup</button>
            <button @click="moveDown($event, index)">movedown</button>
          </div>
      </template>
    </div>
</template>

<script>
import {EditableDiv} from '../components/formComponents/editableDiv/EditableDiv'
export default {
    name: 'aboutKey',
    components: {
        optionDiv: EditableDiv({
            classList: ['optionLabel', 'fl'],
            maxInputLen: 200,
            placeholderText: '请输入问题选项'
        })
    },
    data: function () {
        return {options: ['a', 'b', 'c']}
    },
    methods: {
        moveUp (e, i) {
            let options = this.options
            let index = i
            let curEle = options[index]
            console.info('before splice1')
            options.splice(index - 1, 0, curEle)
            console.info('after splice1')
            options.splice(index + 1, 1)
            console.info('after splice2')
            console.log('上移选项', options)
        },
        moveDown (e, i) {
            let options = this.options
            let index = i
            let curEle = options[index]
            options.splice(index + 2, 0, curEle)
            options.splice(index, 1)
            console.log('选项下移', options)
        }
    }
}
</script>

<style>

</style>

