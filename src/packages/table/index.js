import Comp from './table'
import CompColumn from './tableColumn'
Comp.install = (Vue) => {
  Vue.component(Comp.name, Comp)
  Vue.component(CompColumn.name, CompColumn)
}
export default Comp