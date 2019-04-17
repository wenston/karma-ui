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
      type: String,
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
    bodyClassName: String,
    headerClassName: String,
    footerClassName: String
  },
  data() {
    return {
      ins: null,
      visible: this.show,
      timer: null
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
          if(this.destroyWhenHide) {

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
    init() {
      this.ins &&
        this.$nextTick(() => {
          let body = this.body
          const $slots = this.$slots
          const {
            bodyClassName,
            footerClassName,
            headerClassName
          } = this.$props
          if (body) {
            if (typeof body === "function") {
              body = body()
            }
          } else {
            body = $slots.default
          }

          this.ins.init(
            this,
            {
              default: body,
              header: $slots.header,
              footer: $slots.footer
            },
            {
              width: "auto",
              bodyClassName,
              footerClassName,
              headerClassName,
              canCloseByClickoutside: true
            }
          )
        })
    },
    instanceAndBindEvents() {
      this.ins = layer()
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
      })
    }
  },
  watch: {
    visible(v) {
      this.$emit("update:show", v)
      if (v) {
        this.showLayer()
      } else {
        this.hideLayer()
      }
    },
    show(v) {
      this.visible = v
    },
    title: "init",
    body: "init",
    "$slots.header": "init",
    "$slots.footer": "init"
  },
  mounted() {
    if (!this.lazy) {
      this.instanceAndBindEvents()
      this.init()
    }
  },
  updated() {
    this.init()
  },
  render() {
    const { trigger, visible } = this
    const p = {
      class: "k-dropdown",
      directives: [
        {
          name: "esc",
          value: () => {
            this.hideIt(0)
          }
        }
      ],
      on: {
        click: e => {
          if (trigger == "click") {
            this.visible = !visible
            e.stopPropagation()
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
