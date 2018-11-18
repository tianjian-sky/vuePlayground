// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
Vue.config.productionTip = false

// Vue.config.errorHandler = function (err, vm, info) {
//     console.error('global error')
// }


Vue.config.silent = true
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store,
    created: () => {
        console.log(this.$router)
    }
})
