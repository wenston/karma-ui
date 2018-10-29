import Vue from 'vue'
const ctx = '___clickoutside'
const downTarget = '___downTarget'
const upTarget = '___upTarget'
export default {
  bind(el, binding) {
    const fn = (e) => {
      // if (el.contains(e.target)) {
      //   return null
      // } else {
      //   el[ctx].bindingFn(e)
      // }
      // console.log(e)
      if(e.type==='mousedown') {
        el[downTarget] = e.target
      }else if(e.type === 'mouseup') {
        el[upTarget] = e.target
      }
      if(el.contains(el[downTarget]) || el.contains(el[upTarget])) {
        return
      }else{
        el[ctx].bindingFn(e)
      }
    };
    el[ctx] = {
      documentHandler: fn,
      methodName: binding.expression,
      bindingFn: binding.value
    }
    // document.addEventListener('click', el[ctx].documentHandler)
    document.addEventListener('mousedown', el[ctx].documentHandler)
    document.addEventListener('mouseup', el[ctx].documentHandler)
  },
  update(el, binding) {
    el[ctx].methodName = binding.expression
    el[ctx].bindingFn = binding.value
  },
  unbind(el) {
    // document.removeEventListener('click', el[ctx].documentHandler)
    document.removeEventListener('mousedown', el[ctx].documentHandler)
    document.removeEventListener('mouseup', el[ctx].documentHandler)
    delete el[ctx]
    delete el[upTarget]
    delete el[downTarget]
  }
}