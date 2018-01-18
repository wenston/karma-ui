import ToTopComp from './to-top.vue'
ToTopComp.install = (Vue,opts) => {
  Vue.component(ToTopComp.name,ToTopComp)
}
export default ToTopComp