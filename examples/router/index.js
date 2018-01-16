import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    name: 'home',
    component(resolve) {
      // import ('../views/home.vue').then(comp => res(comp))
      require.ensure([], require => {
        resolve(require('../views/home.vue'))
      })
    }
  }]
})