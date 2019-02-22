import { offset, getStyle, setStyle } from "karma-ui/util/dom"
// import clickoutside from "karma-ui/util/clickoutside.js"
// import esc from "karma-ui/util/esc.js"
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
      //header插槽
      headerSlots: null,
      //footer插槽
      footerSlots: null,
      //表签,默认div
      tag: "div",
      headerTag: "div",
      footerTag: "div",
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
      //default插槽的class
      className: "",
      //header插槽的class
      headerClassName: "",
      //footer插槽的class
      footerClassName: "",
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
    isObject: d =>
      Object.prototype.toString.call(d).toLowerCase() === "[object object]",
    //初始化，插入内容，并设置一些参数
    init(vm, slots, opts) {
      //opts是传入的参数，覆盖原有$data上的属性
      if (this.isObject(slots)) {
        this.list = slots.default || null
        this.headerSlots = slots.header || null
        this.footerSlots = slots.footer || null
      } else {
        this.list = slots
      }
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
  // directives: {
  //   clickoutside,
  //   esc
  // },
  render() {
    let p = {
      class: {
        "k-layer": true
      },
      on: {
        ...this.$listeners
      },
      style: this.styles
    }
    const content = (
      <this.tag {...p}>
        {this.headerSlots ? (
          <this.headerTag
            class={{ [this.headerClassName]: !!this.headerClassName }}
          >
            {this.headerSlots}
          </this.headerTag>
        ) : null}

        <this.tag class={{ [this.className]: !!this.className }}>
          {this.list}
        </this.tag>
        {this.footerSlots ? (
          <this.footerTag
            class={{ [this.footerClassName]: !!this.footerClassName }}
          >
            {this.footerSlots}
          </this.footerTag>
        ) : null}
      </this.tag>
    )
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
        },
        // {
        //   name: "clickoutside",
        //   value: this.hide
        // },
        // {
        //   name: "esc",
        //   value: this.hide
        // }
      ]
      return <transition {...transitionProps}>{content}</transition>
    }
    return content
  }
}
