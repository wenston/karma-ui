import OptionComponent from './option.vue';
OptionComponent.install = function(Vue,opts) {
  Vue.component(OptionComponent.name,OptionComponent)
}
export default OptionComponent;