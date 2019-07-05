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
    prop: "value",
    event: "valueChange"
  },
  data() {
    return {
      theadTop: 0,
      tfootBottom: 0,
      currentResizeTd: null,
      showBaseLine: false
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
    tableWrapperClasses() {
      return ["k-tablebox"]
    },
    colGroup() {
      return <k-col-group columns={this.machiningColumns.bodyColumns} />
    }
  },
  watch: {
    highlightValue: {
      immediate: true,
      handler(v) {
        this.$nextTick(() => {
          this.setHighlightRow({ key: v })
        })
      }
    }
  },
  methods: {
    setHighlightRow(e) {
      if (this.$refs.tbody) {
        this.$refs.tbody.setHighlightRow(e)
      }
    },
    toggleCheckedAll(b) {
      const { tbody } = this.$refs
      tbody && tbody.onCheckedAll(b)
    },
    canCheckRow(row = {}, index) {
      let can = [false, true]
      if (this.checkable && typeof this.checkable === "function") {
        can = this.checkable(row, index)
      }
      return can
    },
    emitSelectChange(e) {
      //{checked,rows,row,index}
      const sourceDataLength = this.$props.data.length
      let cant = 0
      this.$props.data.forEach((row, index) => {
        if (!this.canCheckRow(row, index)[1]) {
          cant += 1
        }
      })
      if (cant === 0) {
        this.$refs.thead.onCheckedAll(
          sourceDataLength > 0 && e.rows.length === sourceDataLength
        )
      } else {
        this.$refs.thead.onCheckedAll(
          sourceDataLength > 0 && e.rows.length === sourceDataLength - cant
        )
      }
      this.$emit("update:selectedRows", e.rows)
      this.$emit("update:selectedKeys", e.keys)
      this.$emit("select-change", /*JSON.parse(JSON.stringify(e))*/ e)
    },
    emitHighlight(e) {
      this.setHighlightRow(e)
      this.$emit("update:highlightValue", e.value)
      this.$emit("toggle-highlight", e)
    },
    emitRadioChange(e) {
      //{radioKey的值value，row,index}
      this.$emit("valueChange", e.value)
      //向组件外发射
      this.$emit("radio-change", e)
    },
    emitDblclickRow(e) {
      this.$emit("dblclick-row", e)
    },
    emitAddRow(e) {
      this.$emit("add-row", e)
    },
    emitDeleteRow(e) {
      this.$emit("delete-row", e)
    },
    onTableWrapperScroll() {
      const { thead, tfoot, mainTable } = this.$refs
      if (thead && tfoot && mainTable) {
        const tar = mainTable
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
      baseLine.style.left = left + 1 + "px"
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
        const head = t.querySelector(".k-theadwrapper"),
          body = t.querySelector(".k-tbodywrapper"),
          foot = t.querySelector(".k-tfootwrapper"),
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
          class: ["k-table-base-line"],
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
    }
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
      class: [
        this.tableWrapperClasses,
        {
          "k-no-select": this.showBaseLine
        }
      ],
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
      class: {
        ...baseProps.class
      },
      props: {
        ...baseProps.props,
        columns: headColumns,
        top: this.theadTop
      },
      on: {
        handleResizeDown: this.handleResizeDown,
        togglechecked: this.toggleCheckedAll
      }
    }
    let bodyProps = {
      props: {
        ...baseProps.props
      },
      on: {
        "add-row": this.emitAddRow,
        "delete-row": this.emitDeleteRow,
        "dblclick-row": this.emitDblclickRow,
        "toggle-radio-row": this.emitRadioChange,
        "toggle-highlight": this.emitHighlight,
        "select-change": this.emitSelectChange
      }
    }
    return (
      <div class="k-tableouter">
        <div {...tableWrapperProps}>
          <KTableHead {...headProps} ref="thead">
            {colgroup}
          </KTableHead>
          <KTableBody
            {...bodyProps}
            ref="tbody"
            bodyScopedSlots={this.$scopedSlots}
          >
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
