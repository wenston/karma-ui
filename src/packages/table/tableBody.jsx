import { props } from "./_util/props"
import mixins from "./_mixins/"
import KColGroup from "./colGroup"
import KCell from "./tableCell"
import KCheckbox from "karma-ui/packages/checkbox/checkbox"
import KRadio from "karma-ui/packages/radio/radio"
import KIcon from "karma-ui/packages/icon/icon"
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
      checkedKeys: this.selectedKeys || [], //保存复选的所有key
      checkedRows: this.selectedRows || [], //保存复选的所有行数据
      currentRadioValue: "",
      currentHighlightKey: ""
    }
  },
  computed: {
    bodyWrapperClasses() {
      return ["k-tbodywrapper"]
    },
    tableClasses() {
      return ["k-table", "k-tbody", { "k-table--auto": !this.minContent }]
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
      this.checkedKeys = keys
    },
    selectedRows: {
      immediate: true,
      handler(rows) {
        this.checkedRows = rows
        //收集keys
        let keys = []
        this.checkedRows.forEach(r => {
          const k = this.formatCheckedKey(r)
          keys.push(k)
        })
        this.checkedKeys = keys
        this.emitSelectChange()
      }
    }
  },
  methods: {
    bodyScroll(e) {},

    //父级调用
    onCheckedAll(checked) {
      //当不选择时，不可以将checkedKeys直接清空，因为可能存在跨页选择的数据
      //checkedRows同上
      let set = new Set(this.checkedKeys)
      if (checked) {
        this.data.forEach((row, index) => {
          if (this.canCheckRow(row, index)[1]) {
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
          }
        })
      } else {
        this.data.forEach((row, index) => {
          if (this.canCheckRow(row, index)[1]) {
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
          }
        })
      }
      this.checkedKeys = [...set]
      this.emitSelectChange()
      //NOTE: 如果出现选不中的情况，需检查传入的checkboxKey是否有问题
    },
    emitSelectChange(checked, row, index) {
      let { fixedLeft, fixedRight } = this.hasFixedColumns,
        // rows = JSON.parse(JSON.stringify(this.checkedRows)),
        rows = this.checkedRows,
        para = { checked, index, row, rows, keys: this.checkedKeys }
      if (this.canCheckRow(row, index)[1]) {
        // if (fixedLeft && this.hasCheckbox && this.who === "left") {
        //   this.$emit("select-change", para)
        // } else if (!fixedLeft && this.hasCheckbox && this.who === "main") {
        //   // console.log(para)
        //   this.$emit("select-change", para)
        // }
        this.$emit("select-change", para)
      }
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
    canCheckRow(row = {}, index) {
      let can = [false, true]
      if (this.checkable && typeof this.checkable === "function") {
        can = this.checkable(row, index)
      }
      return can
    },
    //tbody渲染
    renderTBody() {
      let tbody = []
      this.data.forEach((row, index) => {
        tbody.push(this.renderTr(row, index))
      })
      return tbody
    },

    //处理序号列、操作列、多选或者单选的情况
    addFields(row, col, index, cell) {
      let [ck, canCk] = this.canCheckRow(row, index)
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
        //如果可以操作选中

        if (canCk) {
          cell = (
            <k-checkbox
              value={this.formatCheckedKey(row)}
              checked={checked}
              style="pointer-events:none;"
            />
          )
        } else {
          cell = (
            <k-checkbox
              value={this.formatCheckedKey(row)}
              checked={ck}
              disabled={!canCk}
              style="pointer-events:none;"
            />
          )
        }
        //如果有单选框
      } else if (this.hasRadio && col.field === this.__radio) {
        const radioProps = {
          props: {
            modelValue: this.currentRadioValue,
            value: this.formatCheckedKey(row),
            disabled: !canCk
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
    //单元格渲染
    renderTd(row, index, col) {
      const style =
        typeof col.style === "function" ? col.style(row, index) : col.style
      const { width, ...restStyle } = { width: "", ...style }
      let cont = null
      if (col.customRender) {
        if (typeof col.customRender === "function") {
          cont = col.customRender(row, index)
        } else {
          cont = col.customRender
        }
      } else if (col.scopedSlots) {
        cont = this.bodyScopedSlots[col.scopedSlots]({
          row,
          index
        })
      } else if (col.field) {
        cont = row[col.field]
        cont = this.addFields(row, col, index, cont)
      }
      let cellProps = {
        class: {
          "k-text-center": this.$_is_built_in_column(col.field)
        },
        style: restStyle
      }
      return <k-cell {...cellProps}>{cont}</k-cell>
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
    //渲染数据的一行
    renderTr(row, index) {
      let k = this.getRowKey(row, index, this.loopKey)
      const curHighlightRowKey = this.getRowKey(row, index, this.highlightKey)
      let tds = []
      this.columns.forEach(col => {
        tds.push(this.renderTd(row, index, col))
      })
      let trProps = {
        attrs: {
          "data-key": k,
          "data-highlight": curHighlightRowKey
        },
        key: k,
        class: {
          "k-table-tr-highlight": curHighlightRowKey == this.currentHighlightKey
        },
        on: {
          dblclick: () => {
            this.$emit("dblclick-row", { row, index })
          },
          click: () => {
            if (this.canHighlightRow) {
              this.currentHighlightKey = this.getRowKey(
                row,
                index,
                this.highlightKey
              )
              this.$emit("toggle-highlight", {
                row,
                index,
                value: curHighlightRowKey
              })
            }
            //可以在此处理复选单选
            const k = this.formatCheckedKey(row)
            if (this.canCheckRow(row, index)[1]) {
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
      }
      return <tr {...trProps}>{tds}</tr>
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
          {this.$slots.colgroup}
          <tbody>{this.renderTBody()}</tbody>
        </table>
      </div>
    )
  }
}
