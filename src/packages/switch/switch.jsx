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
    const p = {
      class: [
        "k-switch",
        "k-switch--" + this.size,
        { "k-switch--on": this.ckd == 1 }
      ],
      on: {
        ...this.$listeners,
        click: e => {
          const r = this.reverse(this.ckd)
          this.ckd = r
          this.$emit("checkedChange", r)
          this.$emit('change',r)
        }
      }
    }
    return <div {...p} />
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
