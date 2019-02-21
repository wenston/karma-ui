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
      //外部传入的layer宽度
      width: 0,
      //外部传入的layer高度
      height: 0,
      layerWidth: 0,
      layerHeight: 0,
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
  //下划线开始的，是内部方法。
  //不带下划线的，可供组件外部调用
  methods: {
    //初始化，插入内容，并设置一些参数
    init(vm, defaultSlots, opts) {
      //opts是传入的参数，覆盖原有$data上的属性
      this.list = defaultSlots
      this.vm = vm
      for (let k in opts) {
        if (opts[k]) {
          this.$data[k] = opts[k]
        }
      }
    },
    _getElemPosition() {
      if (!this.vm || !this.vm.$el) {
        return
      }
      const elem = this.vm.$el
      if (!elem) {
        return null
      }
      const pos = offset(elem)
      this.left = pos.left
      this.top = pos.top
      if (!this.width) {
        const w = getStyle(elem, "width")
        this.layerWidth = w
      } else {
        this.layerWidth = this.width
      }
      // if (!this.height) {
        const h = getStyle(elem, "height")
        this.layerHeight = h
      // } else {
      //   this.layerHeight = this.height
      // }
      
      this._setSizeAndPosition()
    },
    _setSizeAndPosition() {
      setStyle(this.$el, {
        width: this.layerWidth,

        top: this.top + parseFloat(this.layerHeight) + this.gap + "px",
        left: this.left + "px"
      })
      if (this.height) {
        setStyle(this.$el, {
          height: this.height
        })
      }
    },
    _handleEnter() {
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
    this.$nextTick(this._getElemPosition)
  },
  updated() {
    this.$nextTick(this._getElemPosition)
  },
  watch: {
    vm: "_getElemPosition"
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
          enter: this._handleEnter
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
