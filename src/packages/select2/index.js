import Comp from './select2';
Comp.install = function(Vue,opts) {
  Vue.component(Comp.name,Comp)
}
export default Comp;