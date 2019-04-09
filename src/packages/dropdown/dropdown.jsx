import { layer } from "karma-ui/packages/layer/index"
import esc from "karma-ui/util/esc.js"
export default {
  name: "KDropdown",
  props: {
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
    bodyClassName: String,
    headerClassName: String,
    footerClassName: String
  },
  data() {
    return {
      ins: layer(),
      visible: this.show,
      timer: null
    }
  },
  methods: {
    showLayer(cb = () => {}) {
      this.ins.show(cb)
    },
    hideLayer(cb = () => {}) {
      this.ins.hide(cb)
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
      this.$nextTick(() => {
        let body = this.body
        const $slots = this.$slots
        const { bodyClassName, footerClassName, headerClassName } = this.$props
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
    }
  },
  watch: {
    visible(v) {
      this.$emit('update:show',v)
      if (v) {
        this.showLayer()
      } else {
        this.hideLayer()
      }
    },
    show(v) {
      this.visible = v
    }
  },
  mounted() {
    this.ins.$on("after-hide", () => {
      this.visible = false
    })
    this.ins.$on("layer-inited", () => {
      if (this.trigger == "hover") {
        this.ins.$el.addEventListener("mouseover", this.showIt)
        this.ins.$el.addEventListener("mouseout", this.hideIt)
      }
    })
    this.init()
  },
  updated() {
    this.init()
  },
  render() {
    const { trigger, visible } = this
    const p = {
      style: {
        lineHeight: 1
      },
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
    this.ins.$el.removeEventListener("mouseover", this.showIt)
    this.ins.$el.removeEventListener("mouseout", this.hideIt)
    this.ins.destroy()
  },
  directives: {
    esc
  }
}
