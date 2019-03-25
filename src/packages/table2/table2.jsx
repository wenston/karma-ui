// 在table基础上做的扩展，支持占位表格行
import KTable from "karma-ui/packages/table/table"
export default {
  name: "KTable2",
  components: {
    KTable
  },
  model: {
    prop: 'data',
    event: 'dataChange'
  },
  props: {
    ...KTable.props,
    stripe: {
      type: Boolean,
      default: false
    },
    hasIndex: {
      type: Boolean,
      default: true
    },
    hasAction: {
      type: Boolean,
      default: true
    },
    resizeWidth: {
      type: Boolean,
      default: true
    },
    minContent: {
      type: Boolean,
      default: true
    }
    //占位行数，当不足时自动补充空行
    // placeholderRows: {
    //   type: Number,
    //   default: 5
    // }
  },
  data() {
    return {}
  },
  methods: {
    setHighlightRow(e) {
      this.$refs.table.setHighlightRow(e)
    },
    setSelectedRows(x) {
      this.$refs.table.setSelectedRows(x)
    },
    setSelectedKeys(x) {
      this.$refs.table.setSelectedKeys(x)
    }
  },
  render() {
    const tableProps = {
      ref: 'table',
      props: {
        ...this.$props
      },
      scopedSlots: {
        ...this.$scopedSlots
      },
      on: {
        ...this.$listeners,
        'add-row':e=>{
          // this.$emit('dataChange', this.data.splice(e.index+1,0,{}))
          this.data.splice(e.index+1,0,{})
          this.$emit('add-row',e)
        },
        'delete-row':e=>{
          if(this.data.length>1) {
            // this.$emit('dataChange', this.data.splice(e.index,1))
            this.data.splice(e.index,1)
            this.$emit('delete-row',e)
          }
        }
      }
    }
    return <k-table {...tableProps} />
  }
}
