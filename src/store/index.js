import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 999,
        statement: 'Hello World',
        info: {},
        info2: null,
        reactObj: {
            existKey: 'existKey'
        }
    },
    mutations: {
        updateCount (state, payLoad) {
            state.count = payLoad
        },
        updateStatement (state, payLoad) {
            state.statement = payLoad
        },
        updateInfo (s, p) {
            s.info = p
        },
        updateInfo2 (s, p) {
            s.info2 = p
        },
        updateItem (s, p) {
            s.info[p.k] = p.v
        },
        updateReactObj (s, p) {
            for (var k in p) {
                s.reactObj[k] = p[k]
            }
        }
    }
})

export default store
