import KCol from './tableColumn'
export default {
  components: {
    KCol,
  },
  name: 'KTable',
  props: {
    //原始数据
    data: Array,
    //列名及对应的描述[{field:'字段名',name:'文本描述'}]
    columns: Array,
    //是否有边框
    border: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'medium',
    },
  },
  computed: {
    tableClass() {
      return {
        'k-table': true,
        'k-table--border': this.border,
      }
    },
  },
  methods: {
    updateColumns(cols = []) {
      const columns = []
      const { $slots, $scopedSlots } = this
      // $scopedSlots 接收传入组件的作用域插槽内容，可以是有名字的
      // 如 <template slot="作用域插槽名字" slot-scope="数据对象"></template>
      // 接收到此就是 {插槽名字:函数(数据对象),...}
      // console.log($scopedSlots)

      cols.forEach(col => {
        const { slots = {}, scopedSlots = {}, ...restProps } = col
        const column = {
          ...restProps,
        }
        Object.keys(slots).forEach(key => {
          const name = slots[key]
          if (column[key] === undefined && $slots[name]) {
            column[key] = $slots[name]
          }
        })
        // console.log($scopedSlots,scopedSlots)
        Object.keys(scopedSlots).forEach(key => {
          const slotName = scopedSlots[key]
          // console.log(column,key,column[key],$scopedSlots[slotName])
          if (column[key] === undefined && $scopedSlots[slotName]) {
            column[key] = $scopedSlots[slotName]
          }
        })
        if (col.children) {
          column.children = this.updateColumns(column.children)
        }
        columns.push(column)
      })
      return columns
    },
    getTableBody() {
      const { $scopedSlots } = this
      const columns = this.updateColumns(this.columns)
      let row = []
      this.data.forEach(item => {
        const column = columns.map(col => {
          if(col.customRender) {
            return (
              <k-col>
                {$scopedSlots[col.field]({
                  row: item
                })}
              </k-col>
            )
          }else{
            return <k-col>{item[col.field]}</k-col>
          }
        })
        // console.log(column)
        row.push(<tr>{column}</tr>)
      })
      return row
    },
    getTableHead() {
      const columns = this.columns
      return columns.map(col => {
        const name = col.name || col.field
        return <k-col tag="th">{name}</k-col>
      })
    },
    getTableProps() {
      const { tableClass, $slots, $attrs, $listeners } = this
      return {
        class: tableClass,
        attrs: {
          ...$attrs,
        },
        props: {},
        on: {
          ...$listeners,
        },
      }
    },
  },
  render() {
    const tableProps = this.getTableProps(),
      tableHead = this.getTableHead(),
      tableBody = this.getTableBody()
    return (
      <div class="k-table-wrapper">
        <table {...tableProps}>
          <thead>
            <tr>{tableHead}</tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>
    )
  },
}
