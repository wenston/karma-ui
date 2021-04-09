import Comp from "../layer/layer"
const boardIns = "@@instance@@"
export default {
  install(Vue, opts) {
    const LayerConstructor = Vue.extend(Comp)
    Vue.board = Vue.prototype.$board = (
      elem,
      {
        header,
        body,
        footer,
        destroyWhenHide = true,
        parent = document.body,
        afterHide = () => {},
        bodyClassName,
        alignment = 'left',
        offset
      }
    ) => {
      if (!elem[boardIns]) {
        elem[boardIns] = new LayerConstructor().$mount()
        elem[boardIns].$data.parent = parent
        parent.appendChild(elem[boardIns].$el)
      }
      elem[boardIns].init(
        { $el: elem },
        {
          header: typeof header === "function" ? header() : header,
          default: typeof body === "function" ? body() : body,
          footer: typeof footer === "function" ? footer() : footer
        },
        {
          canCloseByClickoutside: true,
          width: "auto",
          bodyClassName,
          alignment,
          offset,
          afterLeave: () => {
            afterHide()
            if (destroyWhenHide) {
              elem[boardIns].destroy()
              elem[boardIns] = null
            }
          }
        }
      )

      return elem[boardIns]
    }
  }
}
