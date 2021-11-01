const ctx = "___clickoutside"
const downTarget = "___downTarget"
const upTarget = "___upTarget"
export default {
  bind(el, binding) {
    //update里也有事件函数，如何合并？
    const fn = e => {
      if (e.type === "mousedown") {
        el[downTarget] = e.target
      } else if (e.type === "mouseup") {
        el[upTarget] = e.target
      }
      if (el.contains(el[downTarget]) || el.contains(el[upTarget])) {
        return
      } else if (binding.value.whiteList && binding.value.whiteList.length) {
        //如果设置了白名单的情况
        const target = e.target
        // console.log(binding.value.whiteList)
        if (
          binding.value.whiteList.some(elem => {
            // console.log(elem == target , elem.contains(target))
            return elem == target || elem.contains(target)
          })
        ) {
          return
        }
      }
      el[ctx].bindingFn(e)
    }
    el[ctx] = {
      documentHandler: fn,
      methodName: binding.expression,
      bindingFn: binding.value.fn ? binding.value.fn : binding.value
    }
    // document.addEventListener('click', el[ctx].documentHandler)
    document.addEventListener("mousedown", el[ctx].documentHandler)
    document.addEventListener("mouseup", el[ctx].documentHandler)
  },
  update(el, binding) {
    //有变动时，特别是白名单的变动，重新绑定事件！
    //否则仍然使用的是bind时的白名单
    document.removeEventListener("mousedown", el[ctx].documentHandler)
    document.removeEventListener("mouseup", el[ctx].documentHandler)
    el[ctx].documentHandler = e => {
      if (e.type === "mousedown") {
        el[downTarget] = e.target
      } else if (e.type === "mouseup") {
        el[upTarget] = e.target
      }
      if (el.contains(el[downTarget]) || el.contains(el[upTarget])) {
        return
      } else if (binding.value.whiteList && binding.value.whiteList.length) {
        //如果设置了白名单的情况
        const target = e.target
        if (
          binding.value.whiteList.some(elem => {
            return elem == target || elem.contains(target)
          })
        ) {
          return
        }
      }
      el[ctx].bindingFn(e)
    }
    el[ctx].methodName = binding.expression
    el[ctx].bindingFn = binding.value.fn ? binding.value.fn : binding.value
    document.addEventListener("mousedown", el[ctx].documentHandler)
    document.addEventListener("mouseup", el[ctx].documentHandler)
  },
  unbind(el) {
    // document.removeEventListener('click', el[ctx].documentHandler)
    document.removeEventListener("mousedown", el[ctx].documentHandler)
    document.removeEventListener("mouseup", el[ctx].documentHandler)
    delete el[ctx]
    delete el[upTarget]
    delete el[downTarget]
  }
}
