import { props } from "./_util/props"
import KCell from "./tableCell"
import mixins from "./_mixins/"
export default {
  name: "KTFoot",
  mixins: [mixins],
  components: {
    KCell
  },
  props: {
    ...props,
    bottom: Number
  },
  computed: {
    tableWrapperClasses() {
      return ["k-tfootwrapper"]
    },
    tableClasses() {
      return [
        "k-table",
        "k-tfoot",
        {
          // "k-tfootshadow": this.bottom > 0,
          "k-table--auto": !this.minContent
        }
      ]
    }
  },
  methods: {
    getSumTotal(col, iCol) {
      const { sum, field } = col
      const type = typeof sum
      if (type === "undefined" || (type === "boolean" && !sum)) {
        return null
      }
      if (type === "string" || type === "number") {
        return sum
      } else {
        let total = 0
        if (field) {
          this.data.forEach(row => {
            total += +row[field]
          })
        }
        total = total || ""
        if (type === "function") {
          return sum(total)
        } else if (type === "boolean") {
          return total
        }
      }
    },
    renderTd() {
      //只自动计算一级数据，如果有二级数据，需要自己算哦
      const tds = this.columns.map((col, i) => {
        const content = i === 0 ? this.sumText : this.getSumTotal(col, i)
        const p = {
          props: {
            tag: "th"
          },
          style: this.$_get_td_style(null, null, col, { tfoot: true }),
          class:  [
            col.cellClass
              ? this.$_get_td_class(null, null, col, { tfoot: true })
              : ""
          ]
        }
        return <k-cell {...p}>{content}</k-cell>
      })
      return <tr>{tds}</tr>
    }
  },
  render() {
    const { tableClasses, tableWrapperClasses } = this
    const wrapperProps = {
      class: tableWrapperClasses
    }
    return (
      <div {...wrapperProps}>
        <table class={tableClasses}>
          {this.$slots.colgroup}
          <tfoot>{this.renderTd()}</tfoot>
        </table>
      </div>
    )
  }
}
