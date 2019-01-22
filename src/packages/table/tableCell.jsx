export default {
  name: 'KCell',
  props: {
    tag: {
      type: String,
      default: 'td'
    },
    rowspan: [String,Number],
    colspan: [String,Number],
    resizeWidth: Boolean,
  },
  methods: {
    resizeElem() {
      const p = {
        class: {
          'k-table-resize': true
        },
        on: {
          mousedown: e=>{
            this.$emit('handleResizeDown',e,this.$el)
          }
        }
      }
      if(this.resizeWidth && this.colspan-1<=0) {

        return (
          <div {...p}></div>
        )
      }
    }
  },
  render() {
    const p = {
      attrs: {
        rowspan: this.rowspan,
        colspan: this.colspan,
      },
      class: {
        'k-table-td-relative': this.resizeWidth
      }
    }
    return (

      <this.tag {...p}>
        {this.$slots.default}
        {this.resizeElem()}
      </this.tag>
    )
  }
}