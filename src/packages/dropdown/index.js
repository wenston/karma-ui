import Comp from "./dropdown"
Comp.install = Vue => {
  Vue.component(Comp.name, Comp)
}
export default Comp
