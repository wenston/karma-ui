import OptionComponent from './option.jsx'
OptionComponent.install = function(Vue,opts) {
  Vue.component(OptionComponent.name,OptionComponent)
}
export default OptionComponent