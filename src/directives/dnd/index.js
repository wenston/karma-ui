import bind from './bind.js'
export default {
  install(Vue, opts) {
    Vue.directive('dnd', bind)
  }
}