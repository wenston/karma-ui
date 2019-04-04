import Comp from "./selectTree"
Comp.install = Vue => {
  Vue.component(Comp.name, Comp)
}
export default Comp
