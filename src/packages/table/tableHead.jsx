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
  inject: ["__index", "__checkbox", "__radio"],
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
        "k-table--min-content": this.minContent
      }
    }
  },
  methods: {
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
      let columns = JSON.parse(JSON.stringify(this.headColumns))
      //记录总共行数
      let maxRowLength = 0
      //标记每一行数据
      let addLevel = (cols, i) => {
        cols.forEach(col => {
          //__level代表了第几行tr
          col.__level = i
          if (maxRowLength < i) {
            maxRowLength = i
          }
          if (col.children && col.children.length) {
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
          let content = col.name || col.field
          if (this.hasIndex && this.indexName && col.field === this.__index) {
            content = this.indexName
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
              tag: "th"
            },
            class: {
              'k-table-td-center': colspan>1
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
    // 有children的合并列，没有children的合并行
    // 合并列的colspan是children.length
    // renderTableHead() {
    //   const ths = this.columns.map(col => {
    //     let name = col.name || col.field || ''
    //     if (this.hasIndex && this.indexName && col.field === this.__index) {
    //       name = this.indexName
    //     }
    //     if (this.hasCheckbox && col.field === this.__checkbox) {
    //       name = (
    //         <k-checkbox
    //           checked={this.isCheckedAll}
    //           onChange={this.toggleCheckedAll}
    //         />
    //       )
    //     } else if (this.hasRadio && col.field === this.__radio) {
    //       name = ''
    //     }
    //     return <k-cell tag="th">{name}</k-cell>
    //   })
    //   return <tr>{ths}</tr>
    // },
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
  }
}
