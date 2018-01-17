import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    name: 'home',
    component(res) {
      import ('../views/home.vue').then(comp => res(comp))
    },
    children: [{
      path: '/button',
      name: 'button',
      component(res) {
        import('../views/button.vue').then(comp=>res(comp))
      }
    },{
      path:'/input',
      name:'input',
      component(res) {
        import('../views/input.vue').then(comp=>res(comp))
      }
    },{
      path:'/input-number',
      name:'input-number',
      component(res) {
        import('../views/input-number.vue').then(comp=>res(comp))
      }
    }]
  }]
})