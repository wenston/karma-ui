import KCol from './tableColumn'
export default {
  components: {
    KCol,
  },
  name: 'KTable',
  props: {
    //原始数据
    data: Array,
    //列名及对应的描述[{field:'字段名',name:'文本描述',scopedSlots:'slotName'}]
    columns: Array,
    //是否有边框
    bordered: {
      type: Boolean,
      default: true,
    },
    //表格尺寸
    size: {
      type: String,
      default: 'medium',
    },
    //是否有斑马线
    stripe: {
      type: Boolean,
      default: true
    },
    //是否鼠标滑入变色
    hover: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tableClass() {
      return {
        'k-table': true,
        'k-table--bordered': this.bordered,
        [`k-table--${this.size}`]: true,
        'k-table--stripe': this.stripe,
        'k-table--hover': this.hover
      }
    },
  },
  methods: {
    getTableBody() {
      const { $scopedSlots } = this
      const columns = this.columns
      let row = []
      this.data.forEach((item,index) => {
        const column = columns.map(col => {
          if(col.scopedSlots) {
            return (
              <k-col>
                {$scopedSlots[col.scopedSlots]({
                  row: item,
                  index
                })}
              </k-col>
            )
          }else if(col.customRender) {
            return (
              <k-col>
                {col.customRender(item,index)}
              </k-col>
            )
          }else{
            return <k-col>{item[col.field]}</k-col>
          }
        })
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
