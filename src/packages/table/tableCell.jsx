export default {
  name: 'KCell',
  props: {
    tag: {
      type: String,
      default: 'td'
    },
    rowspan: [String,Number],
    colspan: [String,Number],
  },
  render() {
    return (

      <this.tag rowspan={this.rowspan} colspan={this.colspan}>
        {this.$slots.default}
      </this.tag>
    )
  }
}