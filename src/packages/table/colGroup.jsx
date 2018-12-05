export default {
  name: 'KColGroup',
  props: {
    columns: Array,
  },
  methods: {
    renderCols() {
      return this.columns.map(col => {
        const {width,...restStyle} = {width: '',...col.style}
        return <col width={width}></col>
      })
    }
  },
  render() {
    return <colgroup>{this.renderCols()}</colgroup>
  }
}