import Comp from './transition.js'
Comp.install = (Vue,opts) => {
  Vue.component(Comp.name,Comp)
}
export default Comp