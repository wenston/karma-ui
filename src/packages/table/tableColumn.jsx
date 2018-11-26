export default {
  name: 'KTableColumn',
  props: {
    tag: {
      type: String,
      default: 'td'
    }
  },
  render() {
    return (

      <this.tag>
        {this.$slots.default}
      </this.tag>
    )
  }
}