import Comp from "./autoComplete"
Comp.install = function(Vue, opts) {
  Vue.component(Comp.name, Comp)
}
export default Comp
