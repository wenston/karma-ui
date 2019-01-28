import KPopup from 'karma-ui/packages/dialog/dialog'


export default {
  install(Vue, opts) {
    const KPopupConstructor = Vue.extend(KPopup)
    let instance = new KPopupConstructor().$mount()
    document.body.appendChild(instance.$el)

    Vue.dialog = Vue.prototype.$dialog = function ({
      title,
      content, //接受字符串或者一个返回jsx的函数
      ok,
      cancel,
      okText,
      cancelText
    }) {

      instance.$props.title = title

      instance.$props.okText = okText

      instance.$props.cancelText = cancelText

      if (typeof content === 'function') {
        instance.$slots.default = content.call(this)
      } else {
        instance.$props.content = content
      }
      instance.$props.show = true

      instance.$on('after:ok', () => {
        instance.$props.show = false
        ok && ok()
        instance.$off(['after:cancel', 'after:ok'])
      })
      instance.$on('after:cancel', () => {
        cancel && cancel()
        instance.$off(['after:cancel', 'after:ok'])
      })
    }
  }
}