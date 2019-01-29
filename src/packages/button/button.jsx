import KIcon from "karma-ui/packages/icon/icon"
export default {
  components: {
    KIcon
  },
  name: "KButton",
  props: {
    tag: {
      type: String,
      default: "button"
    },
    type: {
      type: String,
      default: "default" //primary,warning,danger,default
    },
    size: {
      type: String,
      default: "medium" //huge,large,big,medium,small,mini
    },
    block: Boolean,
    disabled: Boolean,
    loading: Boolean,
    href: String,
    target: String,
    loadingIconName: {
      type: String,
      default: "k-icon-loading"
    }
  },
  computed: {
    classes() {
      return {
        ["k-btn"]: true,
        ["k-btn--" + this.type]: true,
        ["k-btn--" + this.size]: true,
        "k-btn--block": this.block
      }
    },
    iconSize() {
      return {
        huge: 21,
        large: 18,
        big: 15,
        medium: 12,
        small: 12,
        mini: 12
      }
    },
    iconColor() {
      return {
        primary: "white",
        warning: "white",
        danger: "white",
        success: "white",
        default: "#666"
      }
    }
  },
  render() {
    const { classes, $slots, $attrs, $listeners, loadingIconName } = this
    let LoadingComp = null
    let Content = null
    if (this.loading) {
      LoadingComp = (
        <k-icon
          class="k-btn__loading"
          color={this.iconColor[this.type]}
          size={this.iconSize[this.size]}
          name={loadingIconName}
        />
      )
    }
    if (this.$slots.default) {
      Content = <span>{$slots.default}</span>
    }
    const buttonProps = {
      class: classes,
      attrs: {
        ...$attrs,
        href: this.href,
        target: this.target,
        disabled: this.loading || this.disabled
      },
      on: {
        ...$listeners,
        click: this.handleClick
      }
    }
    return (
      <this.tag {...buttonProps}>
        {Content}
        {LoadingComp}
      </this.tag>
    )
  },
  methods: {
    handleClick(e) {
      if (!this.disabled) this.$emit("click", e)
    }
  }
}
