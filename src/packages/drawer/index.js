import Comp from './drawer';
Comp.install = (Vue) => {
  Vue.component(Comp.name,Comp)
}
export default Comp;