//为什么表头和表尾不采取数据驱动改变top和bottom？
//因为：减少dom重绘的次数！
//hover变色也是这样
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
    ...props,
    leftFixedNumber: [Number, String],
    rightFixedNumber: [Number, String]
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  data() {
    return {
      tfootBottom: 0,
      currentResizeTd: null,
      showBaseLine: false,
      hoverIndex: -1,
      scrollLeft: 0,
      cellsTimeout: null,
      cells: {
        theadLeftThs: [],
        theadRightThs: [],
        tbodyLeftTds: [],
        tbodyRightTds: [],
        tfootLeftTds: [],
        tfootRightTds: []
      },
      rightTranslate: 0
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
      return [
        "k-tablebox",
        `k-tablebox--${this.size}`,
        {
          "k-tablebox--stripe": this.stripe,
          "k-tablebox--bordered": !this.simple && this.bordered,
          "k-tablebox--simple": this.simple
        }
      ]
    },
    colGroup() {
      return <k-col-group columns={this.machiningColumns.bodyColumns} />
    },
    rColGroup() {
      return <template slot="colgroup">{this.colGroup}</template>
    }
  },
  watch: {
    leftFixedNumber(n) {
      this.fixedNum = +n
    },
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
    onMouseoutTr(e) {
      const tar = e.currentTarget
      tar.classList.remove("k-table-tr-hover")
    },
    onMouseoverTr(e) {
      const tar = e.currentTarget
      tar.classList.add("k-table-tr-hover")
    },
    handleSort(type, col) {
      const { name, field } = col
      this.$emit("sort", { type, field, name })
    },
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
      if (this.$refs.thead) {
        if (cant === 0) {
          this.$refs.thead.onCheckedAll(
            sourceDataLength > 0 && e.rows.length === sourceDataLength
          )
        } else {
          this.$refs.thead.onCheckedAll(
            sourceDataLength > 0 && e.rows.length === sourceDataLength - cant
          )
        }
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
      const { thead, tfoot, tbody, mainTable } = this.$refs
      if (mainTable) {
        const tar = mainTable
        const scrollTop = tar.scrollTop
        const scrollHeight = tar.scrollHeight
        const clientHeight = tar.clientHeight
        this.scrollLeft = tar.scrollLeft
        if (thead) {
          const theadEl = thead.$el
          theadEl.style.top = scrollTop + "px"
          if (scrollTop > 0) {
            theadEl.classList.add("k-theadwrapper-shadow")
          } else {
            theadEl.classList.remove("k-theadwrapper-shadow")
          }
          if (this.leftFixedNumber || this.rightFixedNumber) {
            this.fixedLeftThead(theadEl)
          }
        }
        if (tfoot) {
          const tfootEl = tfoot.$el
          const bottom = scrollHeight - clientHeight - scrollTop
          tfootEl.style.bottom = bottom + "px"
          if (bottom > 0) {
            tfootEl.querySelector(".k-table").classList.add("k-tfootshadow")
          } else {
            tfootEl.querySelector(".k-table").classList.remove("k-tfootshadow")
          }
          if (this.leftFixedNumber || this.rightFixedNumber) {
            this.fixedLeftTfoot(tfootEl)
          }
        }
        if (tbody && this.data.length) {
          this.fixedLeftTbody(tbody.$el)
        }
        //500ms获取一次dom节点，降低读取dom的频率，提高性能
        //去掉应该也没问题！
        clearTimeout(this.cellsTimeout)
        this.cellsTimeout = setTimeout(() => {
          this.clearCells()
        }, 500)
      }
    },
    clearCells() {
      for (let k in this.cells) {
        this.cells[k] = []
      }
    },
    fixedLeftThead(el) {
      if (this.cells.theadLeftThs.length && this.cells.theadRightThs.length) {
        this.classAndPropertyChange(
          "head",
          this.cells.theadLeftThs,
          this.cells.theadRightThs
        )
        return
      }
      let arrThs = []
      let arrThs_r = []
      const n = +this.leftFixedNumber
      const n_r = +this.rightFixedNumber
      let trs = el.querySelectorAll(".k-table>thead>tr")
      let trLength = trs.length
      let left_kua_hang = []
      let right_kua_hang = [] //第一行跨行数，第二行跨行数，...
      //已经找过的所有行数
      let left_collect_row_num = 0
      let right_collect_row_num = 0
      trs.forEach((tr, iTr) => {
        left_kua_hang.push(0)
        right_kua_hang.push(0)
        const ths = [...tr.querySelectorAll("th")]
        if (left_collect_row_num < trLength && n) {
          //已经找到的所有列数
          let collect_num = left_kua_hang.reduce((pre, item) => {
            return pre + item
          }, 0)
          //本行是否已经找过
          let searched_this_row = false
          ths.slice(0, n).forEach(th => {
            const colspan = +th.getAttribute("colspan")
            const rowspan = +th.getAttribute("rowspan")
            if (collect_num < n) {
              arrThs.push(th)
              collect_num += colspan
              if (!searched_this_row) {
                searched_this_row = true
                left_collect_row_num = iTr + 1
              }
              if (rowspan != 1) {
                left_kua_hang[left_kua_hang.length - 1] =
                  left_kua_hang[left_kua_hang.length - 1] + 1
              }
            }
          })
        }

        if (right_collect_row_num < trLength && n_r) {
          let collect_num = right_kua_hang.reduce((pre, item) => {
            return pre + item
          }, 0)
          let searched_this_row = false
          ths
            .slice(-1 * n_r)
            .reverse()
            .forEach(th => {
              const colspan = +th.getAttribute("colspan")
              const rowspan = +th.getAttribute("rowspan")
              if (collect_num < n_r) {
                arrThs_r.push(th)
                collect_num += colspan
                if (!searched_this_row) {
                  searched_this_row = true
                  right_collect_row_num = iTr + 1
                }

                if (rowspan != 1) {
                  right_kua_hang[right_kua_hang.length - 1] =
                    right_kua_hang[right_kua_hang.length - 1] + 1
                }
              }
            })
        }
      })
      this.cells.theadRightThs = arrThs_r
      this.cells.theadLeftThs = arrThs
      this.classAndPropertyChange("head", arrThs, arrThs_r)
    },
    fixedLeftTfoot(el) {
      if (this.cells.tfootLeftTds.length && this.cells.tfootRightTds.length) {
        this.classAndPropertyChange(
          "foot",
          this.cells.tfootLeftTds,
          this.cells.tfootRightTds
        )
        return
      }
      const n = +this.leftFixedNumber
      const n_r = +this.rightFixedNumber
      let arrThs = []
      let arrThs_r = []
      let trs = el.querySelectorAll(".k-table>tfoot>tr")
      trs.forEach(tr => {
        const ths = [...tr.querySelectorAll("th")]
        n &&
          ths.slice(0, n).forEach(th => {
            arrThs.push(th)
          })
        n_r &&
          ths.slice(-1 * n_r).forEach(th => {
            arrThs_r.push(th)
          })
      })
      this.cells.tfootRightTds = arrThs_r
      this.cells.tfootLeftTds = arrThs
      this.classAndPropertyChange("foot", arrThs, arrThs_r)
    },
    fixedLeftTbody(el) {
      if (this.cells.tbodyLeftTds.length && this.cells.tbodyRightTds.length) {
        this.classAndPropertyChange(
          "body",
          this.cells.tbodyLeftTds,
          this.cells.tbodyRightTds
        )
        return
      }
      const n = +this.leftFixedNumber
      const n_r = +this.rightFixedNumber
      let arrTds = []
      let arrTds_r = []
      let trs = el.querySelectorAll(".k-table>tbody>tr")
      trs.forEach(tr => {
        let tds = [...tr.querySelectorAll("td")]
        n &&
          tds.slice(0, n).forEach(td => {
            arrTds.push(td)
          })
        n_r &&
          tds.slice(-1 * n_r).forEach(th => {
            arrTds_r.push(th)
          })
      })
      this.cells.tbodyRightTds = arrTds_r
      this.cells.tbodyLeftTds = arrTds
      this.classAndPropertyChange("body", arrTds, arrTds_r)
    },
    classAndPropertyChange(which, elems, elems_r) {
      const scrollLeft = this.scrollLeft
      const mainTable = this.$refs.mainTable
      const clientWidth = mainTable.clientWidth
      const scrollWidth = mainTable.scrollWidth
      const klass_left =
        which === "head"
          ? "k-table-fixed-td-head"
          : which === "foot"
          ? "k-table-fixed-td-foot"
          : "k-table-fixed-td-body"
      const klass_right =
        which === "head"
          ? "k-table-fixed-td-right-head"
          : which === "foot"
          ? "k-table-fixed-td-right-foot"
          : "k-table-fixed-td-right-body"
      if (scrollLeft > 0) {
        elems.forEach(el => {
          el.classList.add(klass_left)
          el.style.transform = `translateX(${scrollLeft}px)`
        })
      } else {
        elems.forEach(el => {
          el.classList.remove(klass_left)
          el.style.removeProperty("transform")
        })
      }
      if (clientWidth < scrollWidth && scrollLeft + clientWidth < scrollWidth) {
        elems_r.forEach(el => {
          el.classList.add(klass_right)
          this.rightTranslate = scrollLeft + clientWidth - scrollWidth + 1
          el.style.transform = `translateX(${this.rightTranslate}px)`
        })
      } else {
        this.rightTranslate = 0
        elems_r.forEach(el => {
          el.classList.remove(klass_right)
          el.style.removeProperty("transform")
        })
      }
    },
    init() {
      this.$nextTick(() => {
        this.onTableWrapperScroll()
        window.addEventListener("resize", this.onTableWrapperScroll)
      })
    },
    //e是事件对象，el是当前要调整宽度的单元格，index是第几个单元格
    handleResizeDown(e, el, index, col) {
      this.currentResizeTd = el
      document.addEventListener("mousemove", this.handleResizeMove)
      document.addEventListener("mouseup", this.handleResizeUp)
      const scrollLeft = this.scrollLeft
      const tdOldWidth = parseFloat(getStyle(el, "width"))
      const totalHeight = getStyle(this.$refs.mainTable, "height")
      const baseLine = this.$refs.baseLine
      let left = offset(el, this.$el).left + tdOldWidth - scrollLeft
      baseLine.style.height = totalHeight
      if (col.fixed) {
        left = left + scrollLeft
      } else if (this.leftFixedNumber && index <= this.leftFixedNumber) {
        left += scrollLeft
      } else if (
        this.rightFixedNumber &&
        index >=
          this.machiningColumns.bodyColumns.length - 1 - this.rightFixedNumber
      ) {
        left = left + this.rightTranslate
      }
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
    },
    rTfoot(baseProps) {
      if (this.hasSum) {
        const colgroup = <template slot="colgroup">{this.colGroup}</template>
        return (
          <KTableFoot {...baseProps} ref="tfoot">
            {colgroup}
          </KTableFoot>
        )
      }
    },
    rMainTable() {}
  },
  updated() {
    this.clearCells()
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
        height: this.height,
        maxHeight: this.maxHeight,
        minHeight: this.minHeight
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
        columns: headColumns
      },
      on: {
        handleResizeDown: this.handleResizeDown,
        togglechecked: this.toggleCheckedAll,
        sort: this.handleSort
      }
    }
    let bodyProps = {
      props: {
        ...baseProps.props,
        hoverIndex: this.hoverIndex,
        bodyScopedSlots: this.$scopedSlots
      },
      on: {
        "add-row": this.emitAddRow,
        "delete-row": this.emitDeleteRow,
        "dblclick-row": this.emitDblclickRow,
        "toggle-radio-row": this.emitRadioChange,
        "toggle-highlight": this.emitHighlight,
        "select-change": this.emitSelectChange,
        "mouseover-tr": this.onMouseoverTr,
        "mouseout-tr": this.onMouseoutTr,
        "update:hoverIndex": i => {
          this.hoverIndex = i
        }
      }
    }
    let footProps = null
    if (this.hasSum) {
      footProps = {
        props: {
          ...baseProps.props
        }
      }
    }
    return (
      <div class="k-tableouter">
        <div {...tableWrapperProps}>
          {this.hasThead ? (
            <KTableHead {...headProps} ref="thead">
              {colgroup}
            </KTableHead>
          ) : null}

          <KTableBody {...bodyProps} ref="tbody">
            {colgroup}
          </KTableBody>
          {this.hasSum ? (
            <KTableFoot {...footProps} ref="tfoot">
              {colgroup}
            </KTableFoot>
          ) : null}
        </div>
        {this.rBaseLine()}
      </div>
    )
  }
}
