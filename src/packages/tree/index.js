import Comp from './tree'
Comp.install = (Vue,opts) => {
  Vue.component(Comp.name,Comp)
}
export default Comp