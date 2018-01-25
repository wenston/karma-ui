import inVisible from 'karma-ui/util/inVisibleRange.js'
const reg = /^\{.*\}$/
const context = '@@viewablecontext'
const bind = {
  inserted(el, binding) {
    let isOnce = !!binding.modifiers.once
    el[context] = {
      handler: (binding) => {
        let exp = binding.expression
        let v = binding.value
        let viewable = null
        let unviewable = null
        let delay = 0
        if (reg.test(exp)) {
          viewable = v.viewable
          unviewable = v.unviewable
          if (v.delay) delay = v.delay
        } else {
          viewable = v
        }
        inVisible({
          el,
          once: isOnce,
          delay,
          viewable,
          unviewable
        })
      }
    }
    el[context].handler(binding)
  },
  updated(el, binding) {
    el[context].handler(binding)
  },
  unbind(el) {
    el[context] = null
  }
}
export default {
  install(Vue, opts) {
    Vue.directive('viewable', bind)
  }
}