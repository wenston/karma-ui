import { setStyle, getStyle } from "karma-ui/util/dom.js"
//TODO: dom元素会插入v-enter v-enter-to等class，应如何更好的去除？
//TODO: 下拉时，有时会没有过渡效果！
export default {
  name: "KTransition",
  // functional: true,
  props: {
    duration: {
      type: [Number, String],
      default: 350
    },
    timingFunction: {
      type: String,
      default: "ease-out"
    }
  },
  data() {
    return {
      height: "",
      paddingTop: "",
      paddingBottom: "",
      marginBottom: "",
      marginTop: "",
      borderTopWidth: "",
      borderBottomWidth: ""
    }
  },
  methods: {
    isAppear(el) {
      let t = null
      return new Promise(res => {
        t = setInterval(() => {
          if (document.body.contains(el)) {
            clearInterval(t)
            res()
          }
        }, 0)
      })
    },
    setProperty(el) {
      this.height = getStyle(el, "height")
      this.paddingTop = getStyle(el, "paddingTop")
      this.paddingBottom = getStyle(el, "paddingBottom")
      this.marginBottom = getStyle(el, "marginBottom")
      this.marginTop = getStyle(el, "marginTop")
      this.borderTopWidth = getStyle(el, "borderTopWidth")
      this.borderBottomWidth = getStyle(el, "borderBottomWidth")
    },
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
          borderTopWidth: 0,
          overflow: "hidden"
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
          borderTopWidth: 0,
          overflow: "hidden"
        })
      }
    },
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
          transition: this.duration + "ms " + this.timingFunction,
          overflow: "hidden"
        })
      })
    },
    beforeLeave(el) {
      this.setProperty(el)
      setStyle(el, {
        height: this.height,
        opacity: 1,
        paddingBottom: this.paddingBottom,
        paddingTop: this.paddingTop,
        marginTop: this.marginTop,
        marginBottom: this.marginBottom,
        borderBottomWidth: this.borderBottomWidth,
        borderTopWidth: this.borderTopWidth,
        transition: this.duration + "ms " + this.timingFunction,
        overflow: "hidden"
      })
    },
    leave(el, done) {
      setTimeout(() => {
        setStyle(el, {
          height: 0,
          opacity: 0,
          paddingBottom: 0,
          paddingTop: 0,
          marginTop: 0,
          marginBottom: 0,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          overflow: "hidden"
        })
      })
    },
    afterLeave(el) {
      el.removeAttribute("style")
      setStyle(el, {
        display: "none"
      })
      this.$emit("after-transition")
    },
    afterEnter(el) {
      el.removeAttribute("style")
      this.$emit("after-transition")
    }
  },
  render() {
    const children = this.$slots.default
    return (
      <transition
        duration={{ enter: this.duration, leave: this.duration }}
        enterClass=""
        enterToClass=""
        enterActiveClass=""
        leaveClass=""
        leaveToClass=""
        leaveActiveClass=""
        onBeforeEnter={this.beforeEnter}
        onEnter={this.enter}
        onAfterEnter={this.afterEnter}
        onBeforeLeave={this.beforeLeave}
        onLeave={this.leave}
        onAfterLeave={this.afterLeave}
      >
        {children}
      </transition>
    )
  }
}
