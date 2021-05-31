import Comp from './table'
Comp.install = (Vue) => {
  Vue.component(Comp.name, Comp)
}
export default Comp