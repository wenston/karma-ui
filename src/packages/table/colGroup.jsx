export default {
  name: 'KColGroup',
  props: {
    columns: Array,
  },
  methods: {
    renderCols() {
      return this.columns.map(col => {
        let style = typeof col.style==='function'?col.style(null,null,{}):col.style
        const {width,...restStyle} = {width: 120,...style}
        return <col width={width}></col>
      })
    }
  },
  render() {
    return <colgroup>{this.renderCols()}</colgroup>
  }
}