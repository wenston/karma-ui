export default {
  name: 'KIcon',
  props: {
    size: [String,Number],
    color: String,
    name: String,
    weight: Boolean,
    tag: {
      type: String,
      default: 'i'
    }
  },
  render() {
    const {$props,$listeners} = this
    const iconProps = {
      attrs: this.$attrs,
      on: {
        ...$listeners
      },
      class: {
        'iconfont': true,
        [$props.name]: !!$props.name
      },
      style: {
        'font-size': parseFloat($props.size) + 'px',
        'color': $props.color,
        'font-weight': $props.weight?'bold': ''
      }
    }
    return (
      <this.tag {...iconProps} />
    )
  }
}