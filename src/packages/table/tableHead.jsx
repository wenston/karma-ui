import { getStyle } from "karma-ui/util/dom"
import { props } from "./_util/props"
import KColGroup from "./colGroup"
import KCell from "./tableCell"
import KCheckbox from "karma-ui/packages/checkbox/checkbox"
import KRadio from "karma-ui/packages/radio/radio"
export default {
  components: {
    KColGroup,
    KCell,
    KCheckbox,
    KRadio
  },
  props: {
    ...props,
    headColumns: Array
  },
  data() {
    return {
      isCheckedAll: false
    }
  },
  inject: ["__index", "__checkbox", "__radio", "__action"],
  computed: {
    headWrapperClasses() {
      return {
        "k-table-head": true
      }
    },
    headClasses() {
      return {
        "k-table": true,
        "k-table--bordered": this.bordered,
        [`k-table--${this.size}`]: true,
        "k-table--nowrap": this.nowrap,
        "k-table--auto": this.tableLayoutAuto,
        "k-table--min-content": this.minContent
      }
    },
    hasSum() {
      return this.columns.some(col => "sum" in col)
    }
  },
  methods: {
    //父组件调用，改变复选框状态
    onCheckedAll(b) {
      this.isCheckedAll = b
    },
    toggleCheckedAll(e) {
      this.$emit("togglechecked", e.target.checked)
    },
    getRowspan(obj, max) {
      if (obj.children && obj.children.length !== 0) {
        return 1
      }
      return max - obj.__level
    },
    getColspan(obj) {
      let arr = [],
        fn = obj => {
          if (obj.children && obj.children.length) {
            obj.children.forEach(c => {
              fn(c)
            })
          } else {
            arr.push(obj)
          }
        }
      fn(obj)
      return arr.length || 1
    },
    renderTableHead() {
      let columns = this.headColumns
      //记录总共行数
      let maxRowLength = 0
      //记录单元格序列号
      let __index = 0
      //标记每一行数据
      /**
       * addIndex，给每列添加一个index，对应col的序列
       *
       */
      let addIndex = (col, colChildren) => {
        if (colChildren.children && colChildren.children.length) {
          col.__index = col.__index + colChildren.children.length - 1
          colChildren.children.forEach(c => {
            addIndex(col, c)
          })
        }
      }
      //addLevel标记上层级，方便合并行和列
      let addLevel = (cols, i) => {
        cols.forEach(col => {
          //__level代表了第几行tr
          col.__index = __index++
          col.__level = i
          if (maxRowLength < i) {
            maxRowLength = i
          }
          if (col.children && col.children.length) {
            // col.__index = col.__index + col.children.length - 1
            addIndex(col, col)
            __index--
            addLevel(col.children, col.__level + 1)
          }
        })
      }
      //给数据添加行编号，方便后续循环时将单元格插入对应的行
      addLevel(columns, 0)
      //由于行号时从0开始的，所以要加1
      maxRowLength += 1
      //预先创建好所有的行
      let trs = Array.apply(null, { length: maxRowLength }).map(() => [])

      let renderTd = columns => {
        columns.forEach((col, i, arr) => {
          let content = null
          // console.log(col.name , typeof col.name)
          if(typeof col.name === 'function') {
            
            content = col.name()
          }else{
            content = col.name
          }
          if (this.hasIndex && this.indexText && col.field === this.__index) {
            content = this.indexText
          }
          if (this.hasAction && col.field === this.__action) {
            content = "操作"
          }
          if (this.hasCheckbox && col.field === this.__checkbox) {
            content = (
              <k-checkbox
                checked={this.isCheckedAll}
                onChange={this.toggleCheckedAll}
              />
            )
          } else if (this.hasRadio && col.field === this.__radio) {
            content = ""
          }
          const colspan = this.getColspan(col)
          const rowspan = this.getRowspan(col, maxRowLength)
          const cellProps = {
            props: {
              colspan,
              rowspan,
              resizeWidth: this.resizeWidth,
              tag: "th"
            },
            class: {
              "k-table-td-center":
                colspan > 1 ||
                col.field === this.__index ||
                col.field === this.__action ||
                col.field === this.__checkbox ||
                col.field === this.__radio
            },
            on: {
              handleResizeDown: (e, el) => {
                if (col.children && col.children.length) {
                  // console.log(col)
                  return
                }
                this.$emit("handleResizeDown", e, el, col.__index)
              }
            }
          }
          //如果有children，说明有列合并
          trs[col.__level].push(<k-cell {...cellProps}>{content}</k-cell>)
          if (col.children && col.children.length) {
            renderTd(col.children)
          }
        })
      }

      renderTd(columns)

      return trs.map(tr => <tr>{tr}</tr>)
    }
  },
  render() {
    return (
      <div class={this.headWrapperClasses}>
        <table class={this.headClasses}>
          <k-col-group columns={this.columns} />
          <thead>{this.renderTableHead()}</thead>
        </table>
      </div>
    )
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit(
        "head-mounted",
        this.hasSum ? getStyle(this.$el, "height") : "0px"
      )
    })
  }
}
