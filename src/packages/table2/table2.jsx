// 在table基础上做的扩展，支持占位表格行
import KTable from "karma-ui/packages/table/table"
import KKeyEnter from "karma-ui/packages/key-enter/keyEnter"
export default {
  name: "KTable2",
  components: {
    KTable,
    KKeyEnter
  },
  model: {
    prop: "data",
    event: "dataChange"
  },
  props: {
    ...KTable.props,
    loopKey:{
      type: String,
      default: '__karma__loop__key__'
    },
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
    },
    //rowData可以不传，
    //但需注意：如果不传的话，当单元格内包含有其他组件时，将会出现组件
    //在不知不觉中销毁并重建的一个过程！
    //可表现为组件状态无法保持的视觉异常！
    //rowData为一个对象模板，或者一个返回对象的函数，
    //建议写一个函数返回一个对象
    rowData: {
      type: [Object, Function],
      default: () => ({})
    },
    //beforeDeleteRow是能返回Promise的函数
    beforeDeleteRow: Function
    //占位行数，当不足时自动补充空行
    // placeholderRows: {
    //   type: Number,
    //   default: 5
    // }
  },
  data() {
    return {
      rowkey: 10000
    }
  },
  computed: {
    //对this.data进行加工，添加循环所需要的key,
    //默认以__karma__loop__key__作为键
    processData() {
      if (this.data && this.data.length) {
        this.data.forEach(d => {
          if (!(this.loopKey in d))
            d[this.loopKey] = this.createLoopKey()
        })
        return this.data
      }
    }
  },
  methods: {
    createLoopKey() {
      return "" + this.rowkey--
    },
    setHighlightRow(e) {
      this.$refs.table.setHighlightRow(e)
    },
    getRowData(e) {
      let d =
        typeof this.rowData === "function" ? this.rowData(e) : this.rowData
      return JSON.parse(JSON.stringify(d))
    },
    //外部调用
    init() {
      if(this.$refs.kke) {
        this.$refs.kke.init()
      }
    },
    //外部调用
    next(n) {
      if (this.$refs.kke) {
        return this.$refs.kke.next(n)
      }
      return null
    },
    unshiftRow() {
      this.data.unshift(this.getRowData())
    },
    pushRow(row) {
      this.data.splice(row + 1, 0, this.getRowData())
    }
  },
  render() {
    const tableProps = {
      class: "k-tableouter-2",
      ref: "table",
      props: {
        ...this.$props,
        data: this.processData
      },
      scopedSlots: {
        ...this.$scopedSlots
      },
      on: {
        ...this.$listeners,
        // "click-row": ({row,index})=> {
        //   this.data.splice(index, 1, this.getRowData({row,index}))
        //   this.$emit("add-row", {row,index})
        // },
        "add-row": e => {
          this.data.splice(e.index + 1, 0, this.getRowData(e))
          this.$emit("add-row", e)
        },
        "delete-row": e => {
          if (this.data.length > 1) {
            // this.$emit('dataChange', this.data.splice(e.index,1))
            if (
              this.beforeDeleteRow &&
              typeof this.beforeDeleteRow === "function"
            ) {
              this.beforeDeleteRow(e)
                .then(() => {
                  this.data.splice(e.index, 1)
                  this.$emit("delete-row", e)
                })
                .catch(() => {})
            } else {
              this.data.splice(e.index, 1)
              this.$emit("delete-row", e)
            }
          }
        }
      }
    }
    return (
      <k-key-enter
        ref="kke"
        onEnd={e => {
          const [row, i] = e
          if (row === 0 && i === 0) {
            this.unshiftRow()
          } else {
            this.pushRow(row)
          }
        }}
        onEnd-row={e => {
          const [row, i] = e
          if (row === 0) {
            this.data.unshift(this.getRowData())
          } else {
            this.pushRow(row)
          }
        }}
      >
        <k-table {...tableProps} />
      </k-key-enter>
    )
  },
  updated() {
    // console.log('table2 updated')
  }
}
