import Comp from './layer'
Comp.install = function(Vue,opts) {
  Vue.component(Comp.name,Comp)
  Comp.LayerConstructor = Vue.extend(Comp)
}
export const layer = (parent = document.body) => {//parent是插入的位置的父级

  let ins = new Comp.LayerConstructor().$mount()
  ins.$data.parent = parent
  parent.appendChild(ins.$el)
  return ins

}
export default Comp

