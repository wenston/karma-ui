import { layer } from "karma-ui/packages/layer/index"
import esc from "karma-ui/util/esc.js"
export default {
  name: "KDropdown",
  props: {
    //虽然title和body都支持function类型，但还是建议在使用时
    //使用:title="title()"或者:body="body()"
    //因为这样写法，body会及时更新，而body函数并不会变化
    //当body函数不变时，自然就不会引起layer组件重新init
    title: [Array, Object, Function], //支持vnode
    body: [Array, Object, Function],
    tag: {
      type: String,
      default: "div"
    },
    trigger: {
      type: [String, Boolean], //Boolean时，取值是false，表示没有事件
      default: "click"
    },
    show: {
      type: Boolean,
      default: false
    },
    //是否懒渲染，只在展开的时候渲染
    lazy: {
      type: Boolean,
      default: true
    },
    //是否在不可见时销毁
    destroyWhenHide: Boolean,
    layerClassName: String,
    bodyClassName: String,
    headerClassName: String,
    footerClassName: String,
    //是否可以从点击dropdown外部关闭dropdown
    canCloseByClickoutside: {
      type: Boolean,
      default: true
    },
    gap: [Number, String], //没有单位，默认是px
    //从外部点击关闭dropdown时，除了whiteList中的元素
    whiteList: Array,
    scrollElement: Element,
    nearby: Boolean,
    //下拉框与title的对齐方式
    alignment: {
      type: String,
      default: 'left'
    },
    block: Boolean
  },
  data() {
    return {
      ins: null,
      visible: this.show,
      timer: null,
      insElement: null
    }
  },
  methods: {
    showLayer(cb = () => {}) {
      if (!this.ins) {
        this.instanceAndBindEvents()
      }
      this.ins.show(cb)
    },
    hideLayer(cb = () => {}) {
      this.ins &&
        this.ins.hide(() => {
          cb()
          if (this.destroyWhenHide) {
            this.ins.destroy()
            this.ins = null
          }
        })
    },
    hideIt(delay = 200) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.visible = false
      }, delay)
    },
    showIt() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.visible = true
      })
    },
    //init方法待改进：是否可以加入debounce
    init() {
      this.ins &&
        this.$nextTick(() => {
          let body = this.body
          const $slots = this.$slots
          const {
            layerClassName,
            bodyClassName,
            footerClassName,
            headerClassName,
            canCloseByClickoutside
          } = this.$props
          if (body) {
            if (typeof body === "function") {
              body = body()
            }
          } else {
            body = $slots.default
          }
          // console.log('dropdown接收到的whiteList',this.whiteList)
          this.ins.init(
            this,
            {
              default: body,
              header: $slots.header,
              footer: $slots.footer
            },
            {
              width: "auto",
              layerClassName,
              bodyClassName,
              footerClassName,
              headerClassName,
              canCloseByClickoutside,
              whiteList: this.whiteList,
              scrollElement: this.scrollElement,
              nearby: this.nearby,
              alignment: this.alignment,
              gap:
                this.gap !== undefined && this.gap !== null && this.gap !== ""
                  ? parseFloat(this.gap)
                  : 2
            }
          )
        })
    },
    instanceAndBindEvents() {
      if (this.nearby) {
        this.ins = layer(this.$el.parentNode)
      } else {
        this.ins = layer()
      }
      if (this.lazy) {
        this.init()
      }
      this.ins.$on("after-hide", () => {
        this.visible = false
      })
      this.ins.$on("layer-inited", () => {
        if (this.visible) {
          this.showLayer()
        }
        if (this.trigger == "hover") {
          this.ins.$el.addEventListener("mouseover", this.showIt)
          this.ins.$el.addEventListener("mouseout", this.hideIt)
        }
        if (
          this.insElement == null ||
          (this.insElement && this.insElement != this.ins.$el)
        ) {
          this.insElement = this.ins.$el
          this.$emit("getLayerElement", this.insElement)
        }
      })
    }
  },
  watch: {
    visible: {
      handler(v) {
        this.$emit("update:show", v)
        if (v) {
          this.showLayer()
        } else {
          this.hideLayer()
        }
      }
    },
    // visible(v) {
    //   this.$emit("update:show", v)
    //   if (v) {
    //     console.log('v',v)
    //     this.showLayer()
    //   } else {
    //     this.hideLayer()
    //   }
    // },
    show(v) {
      this.visible = v
    },
    //如下一大堆的监控和update钩子有什么区别，去掉行不行？
    title: "init",
    body: "init",
    header: "init",
    footer: "init",
    "$slots.header": "init",
    "$slots.footer": "init",
    "$slots.default": "init"
  },
  mounted() {
    if (!this.lazy) {
      this.instanceAndBindEvents()
      this.init()
    }
    this.$nextTick(() => {
      if (this.visible) {
        this.showLayer()
      }
    })
  },
  updated() {
    // console.log('dropdown updated !!!!')
    this.init()
  },
  render() {
    const { trigger, visible } = this
    let p = {
      class: ["k-dropdown",{
        "k-dropdown--block": this.block
      }],
      directives: [
        {
          name: "esc",
          value: () => {
            this.hideIt(0)
          }
        }
      ]
    }
    if (trigger) {
      p.on = {
        click: e => {
          if (trigger == "click") {
            this.visible = !visible
          }
        },
        mouseover: e => {
          if (trigger == "hover") {
            this.showIt()
          }
        },
        mouseout: e => {
          if (trigger == "hover") {
            this.hideIt()
          }
        }
      }
    }

    return (
      <this.tag {...p}>
        {typeof this.title === "function" ? this.title() : this.title}
      </this.tag>
    )
  },
  beforeDestroy() {
    if (this.ins) {
      this.ins.$el.removeEventListener("mouseover", this.showIt)
      this.ins.$el.removeEventListener("mouseout", this.hideIt)
      this.ins.destroy()
    }
  },
  directives: {
    esc
  }
}
