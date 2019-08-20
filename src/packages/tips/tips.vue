<script>
const baseStyle = {
  "min-width": "180px",
  "min-height": "120px",
  "max-width": "300px",
  "max-height": "200px"
}
const baseContent = "操作完成"
import { merge } from "karma-ui/util/object.js"
export default {
  data() {
    return {
      visible: true,
      content: baseContent,
      styles: baseStyle,
      type: "success", //'error','warning'
      timer: null
    }
  },
  render() {
    const p = {
      class: 'k-tips',
      style: this.styles,
      directives: [{
        name: 'show',
        value: this.visible
      }]
    }
    let tip = (
      <div {...p}>
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
    )
    return tip
  },
  methods: {
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
    show() {
      clearTimeout(this.timer)
      this.visible = true
      return this
    },
    hide(time,cb) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if(cb && typeof cb === 'function') {
          cb()
        }
        this.visible = false
      }, time)
      return this
    }
  }
}
</script>
