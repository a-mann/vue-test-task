import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import comp1 from './components/comp1.vue'
import comp2 from './components/comp2.vue'

const routes = [
  { path: '/', components: {input : comp1, table : comp2} }
]

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    obj: []
  },
  mutations: {
    pushObj (state, obj) {
      state.obj.push(obj);
    },
    rewriteObject (state, obj) {
      state.obj = obj;
    }
  }
})

new Vue({
  router,
  el: '#app',
  store: store,
  render: h => h(App)
})
