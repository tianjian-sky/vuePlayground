import Vue from 'vue'

let modules = {
    m1: Vue.extend({
        name: 'aa',
        template: `
          <div><h2>asyncComponents!!!</h2></div>`
    })
}

export default modules
