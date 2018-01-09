import SelectComponent from './select.vue';
SelectComponent.install = function(Vue,opts) {
  Vue.component(SelectComponent.name,SelectComponent)
}
export default SelectComponent;