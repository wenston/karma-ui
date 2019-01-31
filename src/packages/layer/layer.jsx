import { offset, getStyle, setStyle } from "karma-ui/util/dom"
export default {
  name: "KLayer",
  props: {
    gap: {
      type: Number,
      default: 2
    },
    hasTransition: {
      type: Boolean,
      default: true
    },
    transitionType: {
      type: String,
      default: "slide-down"
    }
  },
  data() {
    return {
      //相对于vm定位
      //vm是 定位的依据
      vm: null,
      //插入dom的位置
      parent: null,
      //$slots.default内容
      list: null,
      //表签,默认div
      tag: "div",
      //位置
      left: 0,
      top: -9999,
      width: 0,
      height: 0,
      visible: false,
      className: "",
      styles: {},
      afterEnter: () => {}
    }
  },
  computed: {
    transitionName() {
      if (this.transitionType) {
        return `k-transition-${this.transitionType}`
      }
      return ""
    }
  },
  provide() {
    return {
      layerComponent: this
    }
  },
  methods: {
    init(vm, defaultSlots, opts) {//opts是传入的参数，覆盖原有$data上的属性
      this.list = defaultSlots
      this.vm = vm
      for (let k in opts) {
        if (opts[k]) {
          this.$data[k] = opts[k]
        }
      }
    },
    getElemPosition() {
      if (!this.vm || !this.vm.$el) {
        return
      }
      const elem = this.vm.$el
      if (!elem) {
        return null
      }
      const pos = offset(elem)
      const w = getStyle(elem, "width")
      const h = getStyle(elem, "height")
      this.left = pos.left
      this.top = pos.top
      this.width = w
      this.height = h
      this.setSizeAndPosition()
    },
    setSizeAndPosition() {
      setStyle(this.$el, {
        width: this.width,
        top: this.top + parseFloat(this.height) + this.gap + "px",
        left: this.left + "px"
      })
    },
    handleEnter() {
      if (this.afterEnter) {
        this.afterEnter()
      }
    },
    show(callback) {
      this.visible = true
      if (callback) {
        this.afterEnter = callback
      }
    },
    hide() {
      this.visible = false
    },
    destroy() {
      this.parent.removeChild(this.$el)
      this.$destroy()
    }
  },
  mounted() {
    this.$nextTick(this.getElemPosition)
  },
  updated() {
    this.$nextTick(this.getElemPosition)
  },
  watch: {
    vm: "getElemPosition"
  },
  render() {
    let p = {
      class: {
        "k-absolute": true,
        [this.className]: !!this.className
      },
      on: {
        ...this.$listeners
      },
      style: this.styles
    }
    if (this.hasTransition) {
      const transitionProps = {
        on: {
          enter: this.handleEnter
        },
        props: {
          name: this.transitionName
        }
      }
      p.directives = [
        {
          name: "show",
          value: this.visible
        }
      ]
      return (
        <transition {...transitionProps}>
          <this.tag {...p}>{this.list}</this.tag>
        </transition>
      )
    }
    return <this.tag {...p}>{this.list}</this.tag>
  }
}
