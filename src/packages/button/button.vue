<script>
export default {
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
  render() {
    let LoadingComp = null;
    let Content = null;
    if (this.loading) {
      LoadingComp = (
        <i
          class={{
            "k-loading": true,
            "k-icon-spinner": true,
            ["k-loading--" + this.size]: true
          }}
          size={this.size}
        />
      );
    }
    if (this.$slots.default) {
      Content = <span>{this.$slots.default}</span>;
    }
    return (
      <this.tag
        href={this.href}
        target={this.target}
        class={{
          ["k-btn"]: true,
          ["k-btn--" + this.type]: true,
          ["k-btn--" + this.size]: true,
          "k-btn--block": this.block
        }}
        onClick={this._click}
        disabled={this.disabled}
      >
        {Content}
        {LoadingComp}
      </this.tag>
    );
  },
  methods: {
    _click(e) {
      this.$emit("click", e);
    }
  }
};
</script>