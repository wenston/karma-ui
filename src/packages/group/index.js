import Comp from './group';
import CompItem from './groupItem';
Comp.install = (Vue) => {
  Vue.component(Comp.name,Comp)
  Vue.component(CompItem.name,CompItem)
}
export default Comp;