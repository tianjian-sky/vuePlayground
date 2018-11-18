<template>
    <div class="slt1">
        <h2>测试slot内容分发</h2>
        <slot name="s1" class="slt2">
            只有在没有要分发的内容时才会显示。
        </slot>
          <slot name="s2">
            只有在没有要分发的内容时才会显示2。
          </slot>
        <br/>
         <slot>
            只有在没有要分发的内容时才会显示。
        </slot>
        <h5>Jingle bells Jingle bells, Jingle all the way!</h5>
        <br/>

        <div class="child">
            <slot text="hello from child" name="scopeSlot"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'slotTest',
    data: () => {
        return {
            noneScopeSlotData: 1
        }
    },
    methods: {}
}
</script>

<style>

</style>
