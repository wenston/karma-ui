import Vue from 'vue'
import OptionComponent from './option.vue';
import OptionWrapper from './optionWrapper'
OptionComponent.install = function(Vue,opts) {
  Vue.component(OptionComponent.name,OptionComponent)
}


const OptionConstructor = Vue.extend(OptionWrapper)
export const optionWrapper = (parent = document.body) => {

    let ins = new OptionConstructor().$mount()
    ins.$data.parent = parent
    parent.appendChild(ins.$el)
    return ins

}
export default OptionComponent