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
        import ('../views/button.vue').then(comp => res(comp))
      }
    }, {
      path: '/input',
      name: 'input',
      component(res) {
        import ('../views/input.vue').then(comp => res(comp))
      }
    }, {
      path: '/input-number',
      name: 'input-number',
      component(res) {
        import ('../views/input-number.vue').then(comp => res(comp))
      }
    }, {
      path: '/radio',
      name: 'radio',
      component(res) {
        import ('../views/radio.vue').then(comp => res(comp))
      }
    }, {
      path: '/checkbox',
      name: 'checkbox',
      component(res) {
        import ('../views/checkbox.vue').then(comp => res(comp))
      }
    }, {
      path: '/select',
      name: 'select',
      component(res) {
        import ('../views/select.vue').then(comp => res(comp))
      }
    }, {
      path: '/area',
      name: 'area',
      component(res) {
        import ('../views/area.vue').then(comp => res(comp))
      }
    }, {
      path: '/carousel',
      name: 'carousel',
      component(res) {
        import ('../views/carousel.vue').then(comp => res(comp))
      }
    }, {
      path:'/viewable',
      name:'viewable',
      component(res) {
        import ('../views/viewable.vue').then(comp => res(comp))
      }
    }]
  }]
})