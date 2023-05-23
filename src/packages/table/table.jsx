//为什么表头和表尾不采取数据驱动改变top和bottom？
//因为：减少dom重绘的次数！
//hover变色也是这样
//优化
/**
 * 2020-01-15：当不需要汇总时，从原来的不渲染tfoot改为display:none
 * 原因：列宽的调整在动态显隐tfoot时，会造成底部列宽和tbody列宽不一致！
 */
import { getStyle, offset, scrollIntoViewIfNeed } from "karma-ui/util/dom"
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
    leftFixedNumber: {
      type: [Number, String],
      default: 0
    },
    rightFixedNumber: {
      type: [Number, String],
      default: 0
    }
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
      rightTranslate: 0,
      leftSticky: [],
      rightSticky: []
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
    },
    tdMinWidth: () => 20
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
    },
    data: {
      immediate: true,
      handler(d) {
        let b = false
        const { thead } = this.$refs
        if (d.length) {
          if (thead) {
            //设置表头的全选复选框状态
            const keys = [...this.selectedKeys.map(s => s + '')]
            if (keys.length) {
              const ks = d.map(el => {
                return el[this.checkboxKey] + ''
              })
              if (keys.length >= ks.length) {
                let _b = true
                let i = 0
                let len = ks.length

                while (i < len) {
                  if (!keys.some(k => k === ks[i])) {
                    _b = false
                    break
                  }
                  i++
                }
                if (_b) {
                  b = true
                }

              }
            }
          }
        }
        thead && thead.onCheckedAll(b)
      }
    },
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
    handleDrop(obj) {
      this.$emit('drag-drop', obj)
    },
    setHighlightRow(e) {
      if (this.$refs.tbody) {
        this.$refs.tbody.setHighlightRow(e)
      }
    },
    toggleCheckedAll(b) {
      const { tbody } = this.$refs
      this.$emit('select-change-all', b)
      tbody && tbody.onCheckedAll(b)
    },
    emitSelectChange(e) {
      this.$emit("update:selectedRows", e.rows)
      this.$emit("update:selectedKeys", e.keys)
      this.$emit("select-change", e)
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
    emitClickRow(e) {
      this.$emit("click-row", e)
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
          // theadEl.style.top = scrollTop + "px"
          if (scrollTop > 0) {
            theadEl.classList.add("k-theadwrapper-shadow")
            // theadEl.classList.add("k-thead-sticky")
          } else {
            theadEl.classList.remove("k-theadwrapper-shadow")
            // theadEl.classList.remove("k-thead-sticky")
          }
          if (this.leftFixedNumber || this.rightFixedNumber) {
            this.fixedLeftThead(theadEl)
          }
        }
        if (tfoot) {
          const tfootEl = tfoot.$el
          const bottom = scrollHeight - clientHeight - scrollTop
          // tfootEl.style.bottom = bottom + "px"
          const footTable = tfootEl.querySelector(".k-table")
          if (bottom > 0) {
            footTable.classList.add("k-tfootshadow")
            // tfootEl.classList.add("k-tfoot-sticky")
          } else {
            footTable.classList.remove("k-tfootshadow")
            // tfootEl.classList.remove("k-tfoot-sticky")
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
        // console.log(elems)
        elems.forEach((el, i) => {
          el.classList.add(klass_left)
          // el.style.left = `${scrollLeft}px`
        })
      } else {
        elems.forEach(el => {
          el.classList.remove(klass_left)
          // el.style.removeProperty("left")
        })
      }
      if (clientWidth < scrollWidth && scrollLeft + clientWidth < scrollWidth) {
        elems_r.forEach(el => {
          el.classList.add(klass_right)
          this.rightTranslate = scrollLeft + clientWidth - scrollWidth + 1
          // el.style.left = `${this.rightTranslate}px`
        })
      } else {
        this.rightTranslate = 0
        elems_r.forEach(el => {
          el.classList.remove(klass_right)
          // el.style.removeProperty("left")
        })
      }
    },
    init() {
      this.$nextTick(() => {
        this.setStickLeft()
        this.setStickRight()
        this.onTableWrapperScroll()
        window.addEventListener("resize", this.onTableWrapperScroll)
      })
    },
    setStickLeft() {
      if (this.leftFixedNumber) {
        const { thead, tbody, tfoot } = this.$refs
        // const tds = [...tbody.$el.querySelector('.k-table>thead>tr>td')]
        const tds = [...tbody.$el.querySelectorAll('.k-tbody>tbody>tr:first-child>td')]
          .slice(0, this.leftFixedNumber)
        tds.forEach(td => {
          td.style.removeProperty('position')
          td.style.removeProperty('left')
        })
        this.leftSticky = tds.map(td => td.offsetLeft + 'px')
        tbody.$el.querySelectorAll('.k-tbody>tbody>tr').forEach(tr => {
          [...tr.querySelectorAll('td')].slice(0, this.leftFixedNumber - 0).forEach((td, i) => {
            td.style.position = 'sticky'
            td.style.left = this.leftSticky[i]
          })
        })
        thead.$el.querySelectorAll('.k-table>thead>tr').forEach(tr => {
          [...tr.querySelectorAll('th')].slice(0, this.leftFixedNumber - 0).forEach((td, i) => {
            td.style.position = 'sticky'
            td.style.left = this.leftSticky[i]
          })
        })
        tfoot.$el.querySelectorAll('.k-tfoot>tfoot>tr').forEach(tr => {
          [...tr.querySelectorAll('th')].slice(0, this.leftFixedNumber - 0).forEach((td, i) => {
            td.style.position = 'sticky'
            td.style.left = this.leftSticky[i]
          })
        })
      }
    },
    setStickRight() {
      if (this.rightFixedNumber) {
        const { thead, tbody, tfoot } = this.$refs
        // const tds = [...tbody.$el.querySelector('.k-table>thead>tr>td')]
        const tds = [...tbody.$el.querySelectorAll('.k-tbody>tbody>tr:first-child>td')]
          .slice(-1 * this.rightFixedNumber).reverse()
        tds.forEach(td => {
          td.style.removeProperty('position')
          td.style.removeProperty('right')
        })
        this.rightSticky = []
        let ws = tds.map(td => td.offsetWidth)
        tds.forEach((td, i) => {
          if (i === 0) {
            this.rightSticky.push(0)
          } else {
            this.rightSticky.push(ws.slice(0, i).reduce((total, num) => total + num))
          }
        })
        // console.log(this.rightSticky)
        tbody.$el.querySelectorAll('.k-tbody>tbody>tr').forEach(tr => {
          [...tr.querySelectorAll('td')].slice(-1 * this.rightFixedNumber).reverse().forEach((td, i) => {
            td.style.position = 'sticky'
            td.style.right = this.rightSticky[i] + 'px'
          })
        })
        thead.$el.querySelectorAll('.k-table>thead>tr').forEach(tr => {
          [...tr.querySelectorAll('th')].slice(-1 * this.rightFixedNumber).reverse().forEach((td, i) => {
            td.style.position = 'sticky'
            td.style.right = this.rightSticky[i] + 'px'
          })
        })
        tfoot.$el.querySelectorAll('.k-tfoot>tfoot>tr').forEach(tr => {
          [...tr.querySelectorAll('th')].slice(-1 * this.rightFixedNumber).reverse().forEach((td, i) => {
            td.style.position = 'sticky'
            td.style.right = this.rightSticky[i] + 'px'
          })
        })
      }
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
      // console.log(this.leftFixedNumber,index, col.fixed)
      // if (col.fixed) {
      //   //目前没有实现这种方式
      //   left = left + scrollLeft
      // } else 
      if (this.leftFixedNumber && index < this.leftFixedNumber) {
        // left += scrollLeft
        // console.log('??')
      } else if (
        this.rightFixedNumber &&
        index >=
        this.machiningColumns.bodyColumns.length - 1 - this.rightFixedNumber
      ) {
        // left = left + this.rightTranslate
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
      this.init()
    },
    resizeColumnWidth(t, e) {
      const { colIndex, startX, tdOldWidth } = this.currentResizeTd
      const { bodyColumns } = this.machiningColumns
      // const col = bodyColumns[colIndex]
      // const width = col.style&&col.style.width?col.style.width:120

      if (t) {
        const head = t.querySelector(".k-theadwrapper"),
          body = t.querySelector(".k-tbodywrapper"),
          foot = t.querySelector(".k-tfootwrapper"),
          resize = el => {
            if (el) {
              const cols = el.querySelectorAll("col")
              if (cols) {
                let w = tdOldWidth + e.clientX - startX
                const { __index, __level, ...col } = bodyColumns[colIndex]
                if (w != tdOldWidth) {
                  if (w < this.tdMinWidth) {
                    w = this.tdMinWidth
                  }
                  if (this.minContent) {
                    // cols[+colIndex].style.width = w + "px"
                    cols[+colIndex].width = w
                  } else {
                    //当宽度是100%时，目前没有好办法精准调整列宽
                    cols[+colIndex].width = w
                  }
                  if (w != tdOldWidth) {
                    this.$emit('resize', { width: w, col, index: colIndex })
                  }
                }
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
    scrollTo(obj) {
      if (this.$refs.mainTable) {
        this.$refs.mainTable.scrollTo(obj)
      }
    },
    scrollBy(obj) {
      if (this.$refs.mainTable) {
        this.$refs.mainTable.scrollBy(obj)
      }
    },

    scrollIntoViewIfNeed(elem, offset = 0) {
      if (this.$refs.mainTable && elem) {
        scrollIntoViewIfNeed(elem, this.$refs.mainTable, offset)
      }
    }
  },
  updated() {
    this.init()
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
    // 整理出来colgroup
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
        sort: this.handleSort,
        drop: this.handleDrop
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
        "click-row": this.emitClickRow,
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
    // if (this.hasSum) {
    footProps = {
      props: {
        ...baseProps.props,
      },
      directives: [
        {
          name: 'show',
          value: this.hasSum
        }
      ]
    }
    // }
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

          <KTableFoot {...footProps} ref="tfoot">
            {colgroup}
          </KTableFoot>
        </div>
        {this.rBaseLine()}
      </div>
    )
  }
}
