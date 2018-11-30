export default {
  name: 'KCell',
  props: {
    tag: {
      type: String,
      default: 'td'
    },
    field: String,
    name: String,
  },
  render() {
    return (

      <this.tag>
        {this.$slots.default}
      </this.tag>
    )
  }
}