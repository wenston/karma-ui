import Vue from "vue"
import { getStyle, setStyle } from "karma-ui/util/dom"
import LoadingComponent from "karma-ui/packages/loading/Loading.vue"
const timeout = t => {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.warn(`v-loading指令：超时（${t}ms）自动关闭`)
      resolve()
    },t)
  })
}
const instance = "@@instance"
let settings = {
  content: "努力加载中...",
  position: "absolute",
  isFullScreen: true,
  color: "#3366ff",
  backgroundColor: "rgba(255,255,255,.75)",
  iconColor: "#3366ff",
  timeout: -1,//-1代表没有超时自动关闭的功能
  afterTimeout: () => {}
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
      v = binding.value,
      opts = {}
    if (typeof v === "boolean") {
      isShow = v
    } else {
      isShow = v.loading
      opts = { ...settings, ...v }
      el[instance].setOptions(opts)
    }
    if (isShow) {
      el[instance].show()
      opts.timeout && opts.timeout>-1 && timeout(opts.timeout).then(()=>{
        el[instance].hide(true)
        opts.afterTimeout()
      })
    } else {
      el[instance].hide(true)
    }
  },
  componentUpdated(el, binding) {
    let isShow = false,
      v = binding.value,
      opts = {}
    if (typeof v === "boolean") {
      isShow = v
    } else {
      isShow = v.loading
      opts = { ...settings, ...v }
      el[instance].setOptions(opts)
    }
    if (isShow) {
      Vue.nextTick(() => {
        if (el[instance]) el[instance].show()
      })
      opts.timeout && opts.timeout>-1 && timeout(opts.timeout).then(()=>{
        el[instance].hide(true)
        opts.afterTimeout()
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
