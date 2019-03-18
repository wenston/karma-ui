import { props } from "./_util/props"
import mixins from "./_mixins/"
import KColGroup from "./colGroup"
import KCell from "./tableCell"
import KCheckbox from "karma-ui/packages/checkbox/checkbox"
import KRadio from "karma-ui/packages/radio/radio"
import KIcon from "karma-ui/packages/icon/icon"
//data参数放在此处是由于可能存在left,main,right3个不同的实例，因为要保持数据的
//同步，所以这么做。（主要是在选择时）
let baseData = {
  checkedKeys: [], //保存复选的所有key
  checkedRows: [], //保存复选的所有行数据
  currentRadioValue: "",
  currentHighlightKey: ""
}
export default {
  mixins: [mixins],
  components: {
    KColGroup,
    KCell,
    KCheckbox,
    KRadio,
    KIcon
  },
  props: {
    ...props,
    bodyScopedSlots: Object, //接收来自KTable的插槽内容$scopedSlots
    //主体表格main、左固定表格left、右固定表格right
    //根据不同表格，有选择的渲染某些数据：复选和单选
    who: {
      type: String,
      default: "main"
    }
  },
  inject: ["__index", "__checkbox", "__radio", "__action"],
  data() {
    return {
      checkedKeys: [], //保存复选的所有key
      checkedRows: [], //保存复选的所有行数据
      currentRadioValue: "",
      currentHighlightKey: ""
    }
  },
  computed: {
    bodyWrapperClasses() {
      return {
        "k-table-body": true
      }
    },
    tableClasses() {
      return {
        "k-table": true,
        "k-table--bordered": this.bordered,
        [`k-table--${this.size}`]: true,
        "k-table--stripe": this.stripe,
        "k-table--auto": this.tableLayoutAuto,
        "k-table--nowrap": this.nowrap,
        "k-table--min-content": this.minContent
      }
    },
    tableStyles() {
      return {
        width: this.width
      }
    },
    trProps() {
      return {
        on: {
          mouseover: e => {
            console.log(e.target)
          },
          mouseout: () => {}
        }
      }
    }
  },
  watch: {
    currentValue: {
      immediate: true,
      handler(v) {
        this.currentRadioValue = v
      }
    },
    selectedKeys(keys) {
      //目前监控不到！为什么！
      this.checkedKeys = keys
    },
    selectedRows(rows) {
      this.checkedRows = rows
    }
  },
  methods: {
    //传入row,index，或者只传index都行，或者只传key
    setHighlightRow({ row, index, key }) {
      if (row) {
        this.currentHighlightKey = this.getRowKey(row, index, this.highlightKey)
      } else if (typeof index === "number") {
        const i = +index
        if (typeof i === "number") {
          this.currentHighlightKey = this.getRowKey(
            this.data[i],
            i,
            this.highlightKey
          )
        }
      } else if (key) {
        this.currentHighlightKey = key
      }
    },
    setCheckedRows(x) {
      this.checkedRows = x
    },
    setCheckedKeys(x) {
      this.checkedKeys = x
    },
    onCheckedAll(checked) {
      //当不选择时，不可以将checkedKeys直接清空，因为可能存在跨页选择的数据
      //checkedRows同上
      let set = new Set(this.checkedKeys)
      if (checked) {
        this.data.forEach(row => {
          const k = this.formatCheckedKey(row)
          set.add(k)
          let has = false
          for (let i = 0, len = this.checkedRows.length; i < len; i++) {
            if (k === this.formatCheckedKey(this.checkedRows[i])) {
              has = true
              break
            }
          }
          if (!has) {
            // this.checkedRows.push(JSON.parse(JSON.stringify(row)))
            this.checkedRows.push(row)
          }
        })
      } else {
        this.data.forEach(row => {
          const k = this.formatCheckedKey(row)
          set.delete(k)
          let j = -1
          for (let i = 0, len = this.checkedRows.length; i < len; i++) {
            if (k === this.formatCheckedKey(this.checkedRows[i])) {
              j = i
              break
            }
          }
          if (j > -1) {
            this.checkedRows.splice(j, 1)
          }
        })
      }
      this.checkedKeys = [...set]
      this.emitSelectChange()
      //NOTE: 如果出现选不中的情况，需检查传入的checkboxKey是否有问题
    },
    emitSelectChange(checked, row, index) {
      const { fixedLeft, fixedRight } = this.hasFixedColumns,
        // rows = JSON.parse(JSON.stringify(this.checkedRows)),
        rows = this.checkedRows,
        para = { checked, index, row, rows, keys: this.checkedKeys }
      if (fixedLeft && this.hasCheckbox && this.who === "left") {
        this.$emit("select-change", para)
      } else if (!fixedLeft && this.hasCheckbox && this.who === "main") {
        this.$emit("select-change", para)
      }
    },

    //复选，单行
    toggleRow(e, row, index) {
      const k = this.formatCheckedKey(row)
      let set = new Set(this.checkedKeys)
      if (e.target.checked) {
        set.add(k)
        let has = false
        for (let i = 0, len = this.checkedRows.length; i < len; i++) {
          if (k === this.formatCheckedKey(this.checkedRows[i])) {
            has = true
            break
          }
        }
        if (!has) {
          // this.checkedRows.push(JSON.parse(JSON.stringify(row)))
          this.checkedRows.push(row)
        }
      } else {
        set.delete(k)
        let j = -1
        for (let i = 0, len = this.checkedRows.length; i < len; i++) {
          if (k === this.formatCheckedKey(this.checkedRows[i])) {
            j = i
            break
          }
        }
        if (j > -1) {
          this.checkedRows.splice(j, 1)
        }
      }
      this.checkedKeys = [...set]
      // console.log(this.checkedKeys)
      this.emitSelectChange(e.target.checked, row, index)
    },
    //格式化checkboxKey/radioKey
    formatCheckedKey(row) {
      let keys = []
      let result = []
      if (this.checkboxKey && this.hasCheckbox) {
        keys = this.checkboxKey.trim().split(",")
      } else if (this.radioKey && this.hasRadio) {
        keys = this.radioKey.trim().split(",")
      }
      keys.forEach(key => {
        result.push(row[key])
      })
      return result.join(",")
    },
    //处理序号列、操作列、多选或者单选的情况
    addFields(row, col, index, cell) {
      //如果有序号列
      if (this.hasIndex && col.field === this.__index) {
        cell = index + 1
      }
      if (this.hasAction && col.field === this.__action) {
        cell = (
          <div>
            <k-icon
              title="新增行"
              class="k-table-icon-action"
              name="k-icon-add"
              onClick={e => {
                e.stopPropagation()
                this.$emit("add-row", { row, index })
              }}
            />
            <k-icon
              title="删除行"
              class="k-table-icon-action"
              name="k-icon-delete"
              onClick={e => {
                e.stopPropagation()
                this.$emit("delete-row", { row, index })
              }}
            />
          </div>
        )
      }
      //如果有复选框
      if (this.hasCheckbox && col.field === this.__checkbox) {
        let checked = false
        const k = this.formatCheckedKey(row)
        let set = new Set(this.checkedKeys)
        if (set.has(k)) {
          checked = true
        }
        cell = (
          // <k-checkbox
          //   value={this.formatCheckedKey(row)}
          //   type="arr"
          //   data-arr={this.checkedKeys}
          //   onChange={() => this.toggleRow($event, row, index)}
          // />
          <k-checkbox
            value={this.formatCheckedKey(row)}
            checked={checked}
            style="pointer-events:none;"
          />
        )
        //如果有单选框
      } else if (this.hasRadio && col.field === this.__radio) {
        const radioProps = {
          props: {
            modelValue: this.currentRadioValue,
            value: this.formatCheckedKey(row)
          },
          on: {
            modelValueChange: value => {
              this.currentRadioValue = value
              this.$emit("toggle-radio-row", { value, row, index })
            }
          }
        }
        cell = <k-radio {...radioProps} />
      }
      return cell
    },
    //获取有嵌套的数据列field,目前只支持2级嵌套
    getNestingField(columns) {
      let field = ""
      for (let i = 0, len = columns.length; i < len; i++) {
        const f = columns[i].field || ""
        const fields = f.trim().split(".")
        if (fields.length > 1) {
          field = fields[0]
          break
        }
      }

      return field
    },
    getRowKey(row, index, keys) {
      let k = []
      let arr = []
      if (keys) {
        arr = (keys + "").trim().split(/\s?\,\s?/)
      }
      arr.forEach(el => {
        if (el.toLowerCase() === "index") {
          k.push(index + "")
        } else if (row[el]) {
          k.push(row[el])
        }
      })
      return k.join(",")
    },
    //渲染tr
    renderTr(column, row, index) {
      let k = this.getRowKey(row, index, this.loopKey)
      const curHighlightRowKey = this.getRowKey(row, index, this.highlightKey)
      const trProps = {
        attrs: {
          "data-key": k,
          "data-highlight": curHighlightRowKey
        },
        key: k,
        class: {
          "k-table-tr-highlight": curHighlightRowKey == this.currentHighlightKey
        },
        on: {
          mouseover: () => {
            this.$emit("trmouseover", row, index)
          },
          mouseout: () => {
            this.$emit("trmouseout", row, index)
          },
          dblclick: () => {
            this.$emit("dblclick-row", { row, index })
          },
          click: () => {
            //处理高亮
            if (this.canHighlightRow) {
              this.currentHighlightKey = this.getRowKey(
                row,
                index,
                this.highlightKey
              )
              this.$emit("toggle-highlight", { row, index, value:curHighlightRowKey })
            }
            //可以在此处理复选单选
            const k = this.formatCheckedKey(row)
            if (this.hasCheckbox) {
              let checked = false
              let set = new Set(this.checkedKeys)
              if (set.has(k)) {
                set.delete(k)
                let j = -1
                for (let i = 0, len = this.checkedRows.length; i < len; i++) {
                  if (k === this.formatCheckedKey(this.checkedRows[i])) {
                    j = i
                    break
                  }
                }
                if (j > -1) {
                  this.checkedRows.splice(j, 1)
                }
              } else {
                set.add(k)
                checked = true
                let has = false
                for (let i = 0, len = this.checkedRows.length; i < len; i++) {
                  if (k === this.formatCheckedKey(this.checkedRows[i])) {
                    has = true
                    break
                  }
                }
                if (!has) {
                  // this.checkedRows.push(JSON.parse(JSON.stringify(row)))
                  this.checkedRows.push(row)
                }
              }
              this.checkedKeys = [...set]
              this.emitSelectChange(checked, row, index)
            } else if (this.hasRadio) {
              this.currentRadioValue = k
              this.$emit("toggle-radio-row", { value: k, row, index })
            }
          }
        }
      }
      return this.hover ? <tr {...trProps}>{column}</tr> : <tr>{column}</tr>
    },
    //渲染单元格
    renderTableCell(row, col, index) {
      const { width, ...restStyle } = { width: "", ...col.style }

      let cell = row[col.field]
      cell = this.addFields(row, col, index, cell)

      //如果有作用域插槽
      if (col.scopedSlots) {
        cell = this.bodyScopedSlots[col.scopedSlots]({
          row,
          index
        })
        //如果有自定义渲染函数
      } else if (col.customRender) {
        cell = col.customRender(row, index)
      }
      return <k-cell style={restStyle}>{cell}</k-cell>
    },
    //合并tbody行，只依据一个嵌套数据进行合并！
    renderMergeRow(bodyScopedSlots, columns, data) {
      let tbody = [],
        nestingField = this.getNestingField(columns)
      //TODO: 如果需支持多级嵌套表格，需优化以下内容
      data.forEach((row, index) => {
        const rowspan = row[nestingField].length || 1
        const tr = Array.apply(null, { length: rowspan }).map((n, i) => {
          const column = columns.map((col, icol) => {
            //获取此列样式
            const { width, ...restStyle } = { width: "", ...col.style }
            //获取此列的字段名、嵌套层级
            const fields = (col.field ? col.field : "").trim().split(".")
            const fieldsLength = fields.length

            //--start 定义单元格内容
            //目前只支持2级表格
            let cellContent = null
            const f = fields
            if (fieldsLength === 1) {
              cellContent = row[col.field]
            } else {
              cellContent = row[f[0]][i][f[1]]
            }
            cellContent = this.addFields(row, col, index, cellContent)
            //如果有作用域插槽
            if (col.scopedSlots) {
              cellContent = this.bodyScopedSlots[col.scopedSlots]({
                row,
                row1: row[f[0]][i],
                index,
                index1: i
              })
              //如果有自定义渲染函数
            } else if (col.customRender) {
              //TODO: row1是undefined，需检查
              cellContent = col.customRender({
                row,
                index,
                row1: row[f[0][i]],
                index1: i
              })
            }
            if (rowspan > 1) {
              if (fieldsLength === 1 && i === 0) {
                return (
                  <k-cell rowspan={rowspan} style={restStyle}>
                    {cellContent}
                  </k-cell>
                )
              } else if (fieldsLength === 1 && i !== 0) {
                return null
              }
              return <k-cell style={restStyle}>{cellContent}</k-cell>
            }
            return <k-cell style={restStyle}>{cellContent}</k-cell>
            //--end
          })
          return this.renderTr(column, row, index)
        })
        tbody.push(tr)
      })
      return tbody
    },
    //渲染表格的tbody
    renderTableBody() {
      const { bodyScopedSlots, columns, data } = this
      let tbody = [],
        //level是数据的层级，1是只有1层，2是有1层嵌套，3是有2层嵌套...
        level = 1
      if (columns.length !== 0) {
        columns.forEach(col => {
          const n = (col.field ? col.field : "").split(".").length
          if (level < n) {
            level = n
          }
        })
      }
      if (level > 1) {
        //如果有合并行的情况
        return this.renderMergeRow(bodyScopedSlots, columns, data)
      }
      if (data.length) {
        data.forEach((row, index) => {
          const column = columns.map(col => {
            return this.renderTableCell(row, col, index)
          })
          tbody.push(this.renderTr(column, row, index))
        })
      } else {
        let colspan = this.columns ? this.columns.length : 1
        let text =
          typeof this.emptyText === "function"
            ? this.emptyText()
            : this.emptyText
          text && tbody.push(
          <tr>
            <k-cell class="k-table-td-center" colspan={colspan}>{text}</k-cell>
          </tr>
        )
      }
      return tbody
    },
    bodyScroll(e) {
      this.$emit("bodyscroll", {
        target: e.target,
        left: e.target.scrollLeft,
        top: e.target.scrollTop
      })
    }
  },
  render() {
    const { bodyWrapperClasses, tableClasses } = this
    return (
      <div
        class={bodyWrapperClasses}
        onScroll={() => {
          this.bodyScroll($event)
        }}
      >
        <table class={tableClasses}>
          <k-col-group columns={this.columns} />
          <tbody>{this.renderTableBody()}</tbody>
        </table>
      </div>
    )
  }
}
