<template>
  <div class="hello" @click="clickHandler">
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
  </div>
</template>

<script>
export default {
    name: 'Main',
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
            msg: 'Welcome to Your Vue.js App'
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
