export default {
  name: "KSwitch",
  props: {
    checked: {
      type: [Boolean, Number, String],
      default: true
    }, //true,false,0,1,"0","1"
    size: {
      type: String,
      default: "mini"
    },
    disabled: Boolean,
    //onContent和offContent是文字描述，此文字描述在内部，
    //故只适合图标类的内容，不适合大量文字描述
    onContent: {
      type: [String, Object, Array, Function],
      default: ''
    },
    offContent: {
      type: [String, Object, Array, Function],
      default: ''
    },
    onClass: {
      type: [String, Array],
      default: ''
    },
    offClass: {
      type: [String, Array],
      default: ''
    }
  },
  model: {
    prop: "checked",
    event: "checkedChange"
  },
  data() {
    return {
      ckd: this.checked
    }
  },
  methods: {
    transferType(value) {
      const type = typeof this.checked
      value = +value
      if (type === "string") {
        value = value + ""
      } else if (type === "boolean") {
        value = Boolean(value)
      }
      return value
    },
    reverse(value) {
      value = 1 - +value
      return this.transferType(value)
    }
  },
  render() {
    const on = { ...this.$listeners }
    if (!this.disabled) {
      on.click = () => {
        const r = this.reverse(this.ckd)
        this.ckd = r
        this.$emit("checkedChange", r)
        this.$emit("change", r)
      }
    }
    const p = {
      class: [
        "k-switch",
        "k-switch--" + this.size,
        { ["k-switch--w-" + this.size]: this.$slots.on || this.$slots.off || this.onContent || this.offContent },
        { "k-switch--on": this.ckd == 1 },
        this.ckd == 1 ? this.onClass : this.offClass,
        {
          "k-switch--disabled": this.disabled
        }
      ],
      on
    }
    return <div {...p} >
      {
        (this.$slots.on || this.onContent) && this.ckd == 1 ? (
          <div class="k-switch-on-content">{this.$slots.on || this.onContent}</div>
        ) : null
      }
      {
        (this.$slots.off || this.offContent) && this.ckd != 1 ? (
          <div class="k-switch-off-content">{
            this.$slots.off || this.offContent
          }</div>
        ) : null
      }
    </div>
  },
  watch: {
    checked(c) {
      this.ckd = c
    },
    ckd(c, oldC) {
      this.$emit("checkedChange", this.transferType(c))
    }
  }
}
