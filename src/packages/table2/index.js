import Comp from './table2'
Comp.install = (Vue) => {
  Vue.component(Comp.name, Comp)
}
export default Comp