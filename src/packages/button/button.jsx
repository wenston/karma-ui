import loadingIcon from 'karma-ui/packages/loading/loadingIcon'
export default {
  components: {
    loadingIcon
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
    target: String
  },
  computed: {
    classes() {
      return {
        ["k-btn"]: true,
        ["k-btn--" + this.type]: true,
        ["k-btn--" + this.size]: true,
        "k-btn--block": this.block
      }
    }
  },
  render() {
    const {classes, $slots, $attrs, $listeners} = this
    let LoadingComp = null
    let Content = null
    if (this.loading) {
      LoadingComp = <loadingIcon size={this.size} />
    }
    if (this.$slots.default) {
      Content = <span>{this.$slots.default}</span>
    }
    const buttonProps = {
      class: classes,
      attrs: {
        ...$attrs,
        href: this.href,
        target: this.target,
        disabled: this.disabled,
      },
      props: {
        
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
    );
  },
  methods: {
    handleClick(e) {
      if(!this.disabled)
        this.$emit("click", e)
    }
  }
}