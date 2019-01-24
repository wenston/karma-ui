import Comp from './position'
Comp.install = function(Vue,opts) {
  Vue.component(Comp.name,Comp)
}
export default Comp

