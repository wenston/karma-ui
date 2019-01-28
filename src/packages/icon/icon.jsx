export default {
  name: 'KIcon',
  props: {
    size: [String,Number],
    color: String,
    name: String
  },
  render() {
    const {$props,$listeners} = this
    const iconProps = {
      on: {
        $listeners
      },
      class: {
        'iconfont': true,
        [$props.name]: $props.name
      },
      style: {
        'font-size': parseFloat($props.size) + 'px',
        'color': $props.color
      }
    }
    return (
      <i {...iconProps} />
    )
  }
}