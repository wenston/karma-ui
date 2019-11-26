import KPopup from "karma-ui/packages/dialog/dialog"

export default {
  install(Vue, opts) {
    const KPopupConstructor = Vue.extend(KPopup)
    // let instance = new KPopupConstructor().$mount()
    // document.body.appendChild(instance.$el)

    Vue.dialog = Vue.prototype.$dialog = function ({
      title,
      content, //接受字符串或者一个返回jsx的函数
      ok,
      cancel,
      okText,
      cancelText,
      layout,
      hasIcon = true,
      iconColor,
      iconSize,
      hasBottomLine = false
    }) {
      let instance = new KPopupConstructor().$mount()
      instance.$props.title = title

      instance.$props.okText = okText

      instance.$props.cancelText = cancelText
      instance.$props.layout = layout
      instance.$props.hasIcon = hasIcon
      instance.$props.iconColor = iconColor
      instance.$props.iconSize = iconSize
      instance.$props.hasBottomLine = hasBottomLine

      if (typeof content === "function") {
        instance.$slots.default = content.call(this)
      } else {
        instance.$props.content = content
      }
      instance.$props.show = true

      instance.$on("after-ok", () => {
        instance.$props.show = false
        ok && ok()
        instance.$off(["after-cancel", "after-ok"])
        Vue.nextTick(() => {
          if (instance.$el && document.body.contains(instance.$el)) {
            document.body.removeChild(instance.$el)
          }
        })
      })
      instance.$on("after-cancel", () => {
        cancel && cancel()
        instance.$off(["after-cancel", "after-ok"])
        Vue.nextTick(() => {
          if (instance.$el && document.body.contains(instance.$el)) {
            document.body.removeChild(instance.$el)
          }
        })
      })
      instance.hide = () => {
        instance.$props.show = false
        instance.$off(["after-cancel", "after-ok"])
        Vue.nextTick(() => {
          if (instance.$el && document.body.contains(instance.$el)) {
            document.body.removeChild(instance.$el)
          }
        })
      }
      document.body.appendChild(instance.$el)
      return instance
    }
  }
}
