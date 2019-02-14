import { setStyle, getStyle } from "karma-ui/util/dom.js"
class Transition {
  constructor(duration, timingFunction) {
    this.duration = duration
    this.timingFunction = timingFunction
    this.offsetHeight = 0
    this.height = 0
    this.paddingTop = 0
    this.paddingBottom = 0
    this.marginTop = 0
    this.marginBottom = 0
    this.borderTopWidth = 0
    this.borderBottomWidth = 0
  }
  isAppear(el) {
    let t = null
    return new Promise(res => {
      t = setInterval(() => {
        if (document.body.contains(el)) {
          clearInterval(t)
          res()
        }
      }, 8)
    })
  }
  setProperty(el) {
    this.height = getStyle(el, "height")
    this.paddingTop = getStyle(el, "paddingTop")
    this.paddingBottom = getStyle(el, "paddingBottom")
    this.marginBottom = getStyle(el, "marginBottom")
    this.marginTop = getStyle(el, "marginTop")
    this.borderTopWidth = getStyle(el, "borderTopWidth")
    this.borderBottomWidth = getStyle(el, "borderBottomWidth")
  }
  beforeEnter(el) {
    if (document.body.contains(el)) {
      let pnode = el.parentNode
      pnode.dataset.oldHeight = getStyle(pnode, "height")
      pnode.dataset.oldOverflow = getStyle(pnode, "overflow")
      setStyle(pnode, {
        height: pnode.dataset.oldHeight,
        overflow: "hidden"
      })
      setStyle(el, {
        display: "block",
        visibility: "hidden"
      })
      this.setProperty(el)
      setStyle(el, {
        display: "none",
        visibility: "visible",
        height: 0,
        opacity: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0
      })
      pnode.removeAttribute("style")
    } else {
      let wrapper = document.createElement("div")
      wrapper.style.cssText = "height:0;overflow:hidden;"
      wrapper.appendChild(el)
      document.body.appendChild(wrapper)
      // this.offsetHeight = el.offsetHeight
      this.setProperty(el)
      document.body.removeChild(wrapper)
      setStyle(el, {
        height: 0,
        opacity: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0
      })
    }
  }
  enter(el, done) {
    this.isAppear(el).then(() => {
      setStyle(el, {
        height: this.height,
        opacity: 1,
        paddingTop: this.paddingTop,
        paddingBottom: this.paddingBottom,
        marginTop: this.marginTop,
        marginBottom: this.marginBottom,
        borderBottomWidth: this.borderBottomWidth,
        borderTopWidth: this.borderTopWidth,
        transition: this.duration + "ms " + this.timingFunction
      })
    })
  }
  leave(el, done) {
    setStyle(el, {
      height: 0,
      opacity: 0,
      paddingBottom: 0,
      paddingTop: 0,
      marginTop: 0,
      marginBottom: 0,
      borderBottomWidth: 0,
      borderTopWidth: 0
    })
  }
  afterLeave(el) {
    el.removeAttribute("style")
    setStyle(el, {
      display: "none"
    })
  }
}
//TODO: dom元素会插入v-enter v-enter-to等class，应如何更好的去除？
//TODO: 下拉时，有时会没有过渡效果！
export default {
  name: "KTransition",
  functional: true,
  props: {
    duration: {
      type: [Number, String],
      default: 350
    },
    timingFunction: {
      type: String,
      default: "ease"
    }
  },
  render(h, ctx) {
    const handlers = new Transition(
      ctx.props.duration,
      ctx.props.timingFunction
    )
    const children = ctx.children
    return (
      <transition
        // duration = {{
        //   enter:ctx.props.duration,
        //   leave:ctx.props.duration
        // }}
        enterClass=""
        enterToClass=""
        enterActiveClass=""
        leaveClass=""
        leaveToClass=""
        leaveActiveClass=""
        onBeforeEnter={handlers.beforeEnter}
        onEnter={handlers.enter}
        onLeave={handlers.leave}
        onAfterLeave={handlers.afterLeave}
      >
        {children}
      </transition>
    )
  }
}
