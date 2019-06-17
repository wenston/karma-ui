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
  watch: {},
  methods: {
    bodyScroll(e) {},
    //tbody渲染
    renderTBody() {
      let tbody = []
      this.data.forEach((row, index) => {
        tbody.push(this.renderTr(row, index))
      })
      return tbody
    },
    //单元格渲染
    renderTd(row, index, col) {
      let cont = null
      if (col.customRender) {
        if (typeof col.customRender === "function") {
          cont = col.customRender(row, index)
        } else {
          cont = col.customRender
        }
      } else if (col.scopedSlots) {
        cont = this.bodyScopedSlots[col.scopedSlots]({
          row,index
        })
      } else if (col.field) {
        cont = row[col.field]
      }
      return <k-cell>{cont}</k-cell>
    },
    //渲染数据的一行
    renderTr(row, index) {
      let tr = []
      this.columns.forEach(col => {
        tr.push(this.renderTd(row, index, col))
      })
      return <tr>{tr}</tr>
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
