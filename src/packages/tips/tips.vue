<script>
const baseStyle = {
  "min-width": "280px",
  "max-width": "280px"
}
const baseContent = "操作完成"
import KIcon from "karma-ui/packages/icon/icon.jsx"
import { merge } from "karma-ui/util/object.js"
export default {
  components: {
    KIcon
  },
  props: {
    icon: {
      type: Object,
      default: () => ({
        success: {},
        error: {},
        warning: {}
      })
    }
  },
  computed: {
    //预置的三种
    success: () => ({
      name: "k-icon-success",
      size: "36px",
      color: "#409eff"
    }),
    error: () => ({
      name: "k-icon-close-circle",
      size: "36px",
      color: "#F56C6C"
    }),
    warning: () => ({
      name: "k-icon-tip",
      size: "36px",
      color: "#E6A23C"
    })
  },
  data() {
    return {
      visible: true,
      content: baseContent,
      styles: baseStyle,
      type: "success", //'error','warning'
      state_icon: {},
      timer: null,
      manual: true, //是否可以手动关闭
      callback: () => { } //传入的关闭后的回调
    }
  },
  render() {
    const p = {
      ref: "tip",
      class: "k-tips",
      style: this.styles,
      directives: [
        {
          name: "show",
          value: this.visible
        }
      ],
      on: {}
    }
    let obj = {}
    obj.success = { ...this.success, ...this.icon.success }
    obj.error = { ...this.error, ...this.icon.error }
    obj.warning = { ...this.warning, ...this.icon.warning }

    let tip = (
      <transition name="k-t-translate">
        <div {...p}>
          {this.manual && (
            <k-icon
              name="k-icon-close"
              class="k-tips__close"
              onClick={this.manualHide}
            />
          )}
          <div class="k-tips__tag">
            <span class="k-tips__shadow"></span>
            <k-icon
              class="k-tips__icon"
              size={this.state_icon.size || obj[this.type].size}
              name={this.state_icon.name || obj[this.type].name}
              color={this.state_icon.color || obj[this.type].color}
            />
          </div>
          <div class="k-tips__cont">
            {typeof this.content === "function" ? this.content() : this.content}
          </div>
        </div>
      </transition>
    )
    return tip
  },
  methods: {
    setManual(b) {
      this.manual = b
      return this
    },
    setIcon(icon) {
      this.state_icon = icon
      return this
    },
    setType(type) {
      if (type) {
        this.type = type
      } else {
        this.type = "success"
      }
      return this
    },
    setStyle(styleObj) {
      this.styles = merge({}, baseStyle, styleObj)
      return this
    },
    setContent(cont) {
      if (cont) {
        this.content = cont
      } else {
        this.content = baseContent
      }
      return this
    },
    setCallback(fn) {
      if (fn) {
        this.callback = fn
      }
      return this
    },
    show() {
      clearTimeout(this.timer)
      this.visible = true
      return this
    },
    manualHide() {
      this.hide(0, this.callback)
    },
    hide(time, cb) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (cb && typeof cb === "function") {
          cb()
        }
        this.visible = false
      }, time)
      return this
    }
  }
}
</script>
