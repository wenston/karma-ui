import { getStyle, offset } from "karma-ui/util/dom"
import { props } from "./_util/props"
import mixins from "./_mixins/"
import KTableHead from "./tableHead"
import KTableBody from "./tableBody"
import KTableFoot from "./tableFoot"
import KColGroup from "./colGroup"
export default {
  mixins: [mixins],
  components: {
    KColGroup,
    KTableHead,
    KTableBody,
    KTableFoot
  },
  name: "KTable",
  props: {
    ...props
  },
  model: {
    prop: "vvv",
    event: "vvvChange"
  },
  data() {
    return {
      theadTop: 0,
      tfootBottom: 0,
      currentResizeTd: null,
      showBaseLine: false,
    }
  },
  provide() {
    return {
      __index: "@_index",
      __checkbox: "@_checkbox",
      __radio: "@_radio",
      __action: "@_action"
    }
  },
  computed: {
    // c_columns() {
    //   let c = this.columns.map(item => {
    //     if (item) {
    //       let col = typeof item === "function" ? item() : item
    //       return col
    //     }
    //   })
    //   return c
    // },
    tableWrapperClasses() {
      return ["k-tablebox"]
    },
    colGroup() {
      return <k-col-group columns={this.machiningColumns.bodyColumns} />
    }
  },
  methods: {
    onTableWrapperScroll() {
      const { thead, tfoot, tableWrapper } = this.$refs
      if (thead && tfoot && tableWrapper) {
        const tar = tableWrapper
        const scrollTop = tar.scrollTop
        const scrollLeft = tar.scrollLeft
        const theadEl = thead.$el
        const tfootEl = tfoot.$el
        const scrollHeight = tar.scrollHeight
        const clientHeight = tar.clientHeight
        this.theadTop = scrollTop
        theadEl.style.top = scrollTop + "px"
        this.tfootBottom = scrollHeight - clientHeight - scrollTop
        tfootEl.style.bottom = this.tfootBottom + "px"
      }
    },
    init() {
      this.$nextTick(() => {
        this.onTableWrapperScroll()
        window.addEventListener("resize", this.onTableWrapperScroll)
      })
    },
    //e是事件对象，el是当前要调整宽度的单元格，index是第几个单元格
    handleResizeDown(e, el, index) {
      this.currentResizeTd = el
      document.addEventListener("mousemove", this.handleResizeMove)
      document.addEventListener("mouseup", this.handleResizeUp)
      const scrollLeft = this.$refs.mainTable.scrollLeft
      const tdOldWidth = parseFloat(getStyle(el, "width"))
      const totalHeight = getStyle(this.$refs.mainTable, "height")
      const baseLine = this.$refs.baseLine
      const left = offset(el, this.$el).left + tdOldWidth - scrollLeft
      baseLine.style.height = totalHeight
      baseLine.style.left = left + "px"
      this.currentResizeTd.startX = e.clientX
      this.currentResizeTd.tdOldWidth = tdOldWidth
      this.currentResizeTd.baseLineLeft = left
      this.currentResizeTd.colIndex = index
      this.showBaseLine = true
    },
    handleResizeMove(e) {
      const el = this.currentResizeTd
      const dx = e.clientX - el.startX
      // const scrollLeft = this.$refs.mainTable.scrollLeft
      // this.$refs.baseLine.style.left = scrollLeft + el.baseLineLeft + dx + "px"
      this.$refs.baseLine.style.left = el.baseLineLeft + dx + "px"
    },
    handleResizeUp(e) {
      const { mainTable, leftTable, rightTable } = this.$refs
      this.resizeColumnWidth(mainTable, e)
      leftTable && this.resizeColumnWidth(leftTable, e)
      rightTable && this.resizeColumnWidth(rightTable, e)

      this.showBaseLine = false
      this.currentResizeTd = null
      document.removeEventListener("mousemove", this.handleResizeMove)
      document.removeEventListener("mouseup", this.handleResizeUp)
    },
    resizeColumnWidth(t, e) {
      const { colIndex, startX, tdOldWidth } = this.currentResizeTd
      if (t) {
        const head = t.querySelector(".k-table-head"),
          body = t.querySelector(".k-table-body"),
          foot = t.querySelector(".k-table-foot"),
          resize = el => {
            if (el) {
              const cols = el.querySelectorAll("col")
              if (cols) {
                cols[+colIndex].style.width =
                  tdOldWidth + e.clientX - startX + "px"
              }
            }
          }
        head && resize(head)
        body && resize(body)
        foot && resize(foot)
      }
    },
    //调整列宽时，显示出来一个基准线
    rBaseLine() {
      if (this.resizeWidth) {
        const p = {
          class: {
            "k-table-base-line": true
          },
          ref: "baseLine",
          directives: [
            {
              name: "show",
              value: this.showBaseLine
            }
          ]
        }
        return <div {...p} />
      }
    },
  },
  updated() {
    this.onTableWrapperScroll()
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onTableWrapperScroll)
  },
  render() {
    const { bodyColumns, headColumns } = this.machiningColumns
    //对columns进行初步处理，剔除null/undefined/false/''等无效的列

    // 2. 整理出来colgroup
    const colgroup = <template slot="colgroup">{this.colGroup}</template>
    const tableWrapperProps = {
      ref: "mainTable",
      class: this.tableWrapperClasses,
      style: {
        height: this.height
      },
      on: {
        scroll: this.onTableWrapperScroll
      }
    }
    let baseProps = {
      props: {
        ...this.$props,
        columns: bodyColumns
      }
    }
    let headProps = {
      props: {
        ...baseProps.props,
        columns: headColumns,
        top: this.theadTop
      },
      on: {
        handleResizeDown: this.handleResizeDown
      }
    }
    return (
      <div class="k-tableouter">
        <div {...tableWrapperProps}>
          <KTableHead {...headProps} ref="thead">
            {colgroup}
          </KTableHead>
          <KTableBody {...baseProps} bodyScopedSlots={this.$scopedSlots}>
            {colgroup}
          </KTableBody>
          <KTableFoot {...baseProps} ref="tfoot" bottom={this.tfootBottom}>
            {colgroup}
          </KTableFoot>
        </div>
        {this.rBaseLine()}
      </div>
    )
  }
}
