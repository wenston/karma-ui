import Vue from "vue"
import { getStyle, setStyle } from "karma-ui/util/dom"
import LoadingComponent from "karma-ui/packages/loading/Loading.vue"
const instance = "@@instance"
let settings = {
  content: "努力加载中...",
  position: "absolute",
  isFullScreen: true,
  color: "#378cee",
  backgroundColor: "rgba(255,255,255,.75)",
  iconColor: "#378cee"
}
export default {
  bind(el, binding) {
    const LoadingConstructor = Vue.extend(LoadingComponent)
    el[instance] = new LoadingConstructor().$mount()
    const position = getStyle(el, "position")
    if (
      position !== "fixed" &&
      position !== "relative" &&
      position !== "absolute"
    ) {
      setStyle(el, "position", "relative")
    }
    el.appendChild(el[instance].$el)
  },
  inserted(el, binding) {
    let isShow = false,
      v = binding.value
    if (typeof v === "boolean") {
      isShow = v
    } else {
      isShow = v.loading
      el[instance].setOptions({ ...settings, ...v })
    }
    if (isShow) {
      el[instance].show()
    } else {
      el[instance].hide(true)
    }
  },
  componentUpdated(el, binding) {
    let isShow = false,
      v = binding.value
    if (typeof v === "boolean") {
      isShow = v
    } else {
      isShow = v.loading
      el[instance].setOptions({ ...settings, ...v })
    }
    if (isShow) {
      Vue.nextTick(() => {
        if (el[instance]) el[instance].show()
      })
    } else {
      Vue.nextTick(() => {
        if (el[instance]) el[instance].hide(true)
      })
    }
  },
  unbind(el, binding) {
    el[instance] = null
  }
}
