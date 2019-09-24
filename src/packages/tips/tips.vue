<script>
const baseStyle = {
  "min-width": "180px",
  "max-width": "300px"
}
const baseContent = "操作完成"
import KIcon from "karma-ui/packages/icon/icon.jsx"
import { merge } from "karma-ui/util/object.js"
export default {
  components: {
    KIcon
  },
  data() {
    return {
      visible: true,
      content: baseContent,
      styles: baseStyle,
      type: "success", //'error','warning'
      timer: null,
      manual: true, //是否可以手动关闭
      callback: () => {},//传入的关闭后的回调
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
    let tip = (
      <transition name="k-t-fade">
        <div {...p}>
          {this.manual && (
            <k-icon name="k-icon-close-circle" class="k-tips__close" onClick={this.manualHide} />
          )}
          <div class="k-tips__tag">
            <i
              class={{
                "k-tips__icon": true,
                ["k-tips__icon--" + this.type]: true
              }}
            />
          </div>
          <div class="k-tips__cont">{this.content}</div>
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
      if(fn) {
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
      this.hide(0,this.callback)
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
