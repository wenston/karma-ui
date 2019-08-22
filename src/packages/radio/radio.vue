<script>
export default {
  name: "KRadio",
  model: {
    prop: "vvv",
    event: "vvvChange"
  },
  computed: {
    state() {
      if (this.vvv === void 0) {
        return this.checked
      }
      if (this.exact) {
        return this.vvv === this.value
      }
      return this.vvv == this.value
    }
  },
  props: {
    vvv: {
      type: [String, Number, Boolean],
      default: void 0
    },
    checked: Boolean,
    disabled: Boolean,
    value: {
      type: [String, Number, Boolean],
      default: void 0
    },
    text: [String, Function, Object, Number],
    exact: Boolean
  },
  render() {
    const { $slots, text, disabled, checked, state, value } = this
    let content = $slots.default || text
    if (typeof content === "function") {
      content = content()
    }
    let labelP = {
      props: {},
      class: [
        "k-radio",
        {
          "k-radio--checked": state,
          'k-radio--disabled': disabled
        }
      ],
      on: {}
    }
    if (!this.disabled) {
      labelP.on.click = () => {
        this.$emit("vvvChange", value)
        this.$emit("change", value)
      }
    }
    return (
      <label {...labelP}>
        <span class="k-radio__icon" />
        <span class="k-radio__text">{content}</span>
      </label>
    )
  }
}
</script>
