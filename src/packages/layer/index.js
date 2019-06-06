import Comp from "./layer"
Comp.install = function(Vue, opts) {
  Vue.component(Comp.name, Comp)
  Comp.LayerConstructor = Vue.extend(Comp)
}
//layer生成一个实例，并插入parent
export const layer = (parent = document.body) => {
  //parent是插入的位置的父级

  let ins = new Comp.LayerConstructor().$mount()
  ins.$data.parent = parent
  parent.appendChild(ins.$el)
  return ins
}
export default Comp
