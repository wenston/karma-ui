<script>
export default {
  functional: true,
  props: {
    size: {
      type: String,
      default: "huge" //huge,large,big,medium,small,mini
    }
  },
  render(h,ctx) {
    return h('i', {
      ...ctx.data,
      class: {
        'k-loading__icon': true,
        'k-icon-spinner2': true,
        [`k-loading--${ctx.props.size}`]: true
      },
    })
  }
  // render() {
  //   return (
  //     <i
  //       class={{
  //         "k-loading__icon": true,
  //         "k-icon-spinner2": true,
  //         [`k-loading--${this.size}`]: true
  //       }}
  //     />
  //   )
  // }
}
</script>
