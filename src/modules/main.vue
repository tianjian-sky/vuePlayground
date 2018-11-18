<template>
  <div v-customDir="handleDir" class="hello" @click="clickHandler">
       <div v-if="showBanner">测试banner</div>
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <my-component/>
      <slotTest class="slt0">
          <h2 slot="s2">:插入的内容2</h2>
          <div slot="s1" class="slt3">插入的内容2</div>
          <div>(*******)</div>
          <div slot="xxx">fuck you!</div>
            <p slot-scope="slotProp"   slot="scopeSlot">
                <span style="color:red;">SCOPED_SLOT:hello from parent</span><br>
                <span>{{ slotProp.text }}</span>
            </p>
      </slotTest>
  </div>
</template>

<script>
import slotTest from './slotTest.vue'
export default {
    name: 'Main',
    components: {slotTest},
    directives: {
        customDir: {
            bind: function (el, binding, vnode, oldVNode) {
                let ele = el
                document.addEventListener('click', function (e) {
                    if (e.target.classList.contains(ele.className)) {
                        binding.value(ele)
                    }
                })
            },
            update: function (el, binding, vnode, oldVNode) {
                console.log('updat hook:', vnode, oldVNode)
            },
            componentUpdated: function (el, binding, vnode, oldVNode) {
                console.log('componentUpdated hook:', vnode, oldVNode)
            }
        }
    },
    methods: {
        clickHandler: (e) => {
            console.log('vue components:', this, this.globalAttr, e)
        },
        handleClose: (done) => {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        handleDir: function (ele) {
            console.log('bbb', ele, this)
            // 两种写法皆可
            this.$data.showBanner = !this.$data.showBanner
            // this.showBanner = !this.showBanner
        }
    },
    created: function () {
        console.log('own created hook running:', this)
    },
    mounted: function () {
        console.log('component mounted:', this)
    },
    data () {
        return {
            dialogVisible: false,
            msg: 'Welcome to Your Vue.js App',
            showBanner: true
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
      height:100%;
  }
</style>
