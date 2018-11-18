<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <div>
      <h2>vuex test area!</h2>
      <h3>pipein vuex state: {{$store.state.count}}<button @click="changeVuexState">change!</button></h3>
      <h3>computed vuex state: {{computedVuexState}}<button @click="changeVuexState2">change2!</button></h3>
      <div>
        <h5>info.a:{{info.a}}</h5>
        <h5>info.b:{{info.b}}</h5>
        <h5>info.c:{{info.c}}</h5>
        <hr/>
        <div>{{info2}}</div>
        <p v-for="(item, index) in info.arr" :key="index">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed: {
        ...mapState({
            computedVuexState: state => state.statement,
            info: state => state.info,
            info2: state => state.info2
        })
    },
    methods: {
        changeVuexState () {
            this.$store.commit('updateCount', this.$store.state.count + 2)
        },
        changeVuexState2 () {
            this.$store.commit('updateStatement', this.computedVuexState + 2)
        }
    },
    created () {
        console.log('st', this, this.$store.state)
        this.$store.commit('updateInfo', {
            a: 'aa',
            b: 'bb',
            c: 'cc',
            arr: null
        })
        setTimeout(() => {
            this.$store.commit('updateInfo2', 'info2 fcoms')
            this.$store.commit('updateItem', {
                k: 'arr',
                v: ['1', '2']
            })
        }, 200)

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
