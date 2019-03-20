import { getStyle, offset } from "karma-ui/util/dom"
import { props } from "./_util/props"
import mixins from "./_mixins/"
import KTableHead from "./tableHead"
import KTableBody from "./tableBody"
import KTableFoot from "./tableFoot"
export default {
  mixins: [mixins],
  components: {
    KTableHead,
    KTableBody,
    KTableFoot
  },
  name: "KTable",
  props: {
    ...props
  },
  model: {
    prop: "currentValue",
    event: "currentValueChange"
  },
  data() {
    return {
      currentScrollTarget: null,
      timeout: null,
      headHeight: "",
      footHeight: "",
      showBaseLine: false,
      currentResizeTd: null //当前要调整列宽的单元格
    }
  },
  provide: {
    __index: "@_index",
    __checkbox: "@_checkbox",
    __radio: "@_radio",
    __action: "@_action"
  },
  computed: {
    leftWrapperClasses() {
      const { fixedLeft } = this.hasFixedColumns
      return {
        "k-table-wrapper": true,
        "k-table-wrapper--fixed_left": fixedLeft
      }
    },
    rightWrapperClasses() {
      const { fixedRight } = this.hasFixedColumns
      return {
        "k-table-wrapper": true,
        "k-table-wrapper--fixed_right": fixedRight
      }
    },
    tableClass() {
      return {
        "k-table": true,
        "k-table--bordered": this.bordered,
        [`k-table--${this.size}`]: true,
        "k-table--stripe": this.stripe,
        "k-table--auto": this.tableLayoutAuto,
        "k-table--nowrap": this.nowrap
      }
    },
    cellWidth() {
      const size = {
        mini: "45",
        small: "45",
        medium: "45",
        big: "50",
        large: "55",
        huge: "60"
      }
      return size[this.size]
    }
    // tableBodyProps() {
    //   return {
    //     props: {
    //       ...this.$props,
    //       bodyScopedSlots: this.$scopedSlots
    //     },
    //     style: {
    //       height: this.height
    //     },
    //     on: {
    //       'select-change':'emitSelectChange',
    //       bodyscroll:'bodyScroll',
    //       trmouseover: 'trMouseover',
    //       trmouseout:'trMouseout'
    //     }
    //   }
    // }
  },
  methods: {
    setHighlightRow(e) {
      if (this.$refs.mainTbodyWrapper) {
        this.$refs.mainTbodyWrapper.setHighlightRow(e)
      }
      if (this.$refs.leftTbodyWrapper) {
        this.$refs.leftTbodyWrapper.setHighlightRow(e)
      }
      if (this.$refs.rightTbodyWrapper) {
        this.$refs.rightTbodyWrapper.setHighlightRow(e)
      }
    },
    setSelectedRows(x) {
      this.$refs.mainTbodyWrapper.setCheckedRows(x)
    },
    setSelectedKeys(x) {
      this.$refs.mainTbodyWrapper.setCheckedKeys(x)
    },
    getTableProps() {
      const { tableClass, $attrs, $listeners } = this
      return {
        class: tableClass,
        attrs: {
          ...$attrs
        },
        on: {
          ...$listeners
        }
      }
    },
    toggleCheckedAll(b) {
      const {
        leftTbodyWrapper,
        mainTbodyWrapper,
        rightTbodyWrapper
      } = this.$refs
      leftTbodyWrapper && leftTbodyWrapper.onCheckedAll(b)
      mainTbodyWrapper && mainTbodyWrapper.onCheckedAll(b)
      rightTbodyWrapper && rightTbodyWrapper.onCheckedAll(b)
    },
    emitSelectChange(e) {
      //{checked,rows,row,index}
      this.$refs.theadWrapper.onCheckedAll(
        e.rows.length === this.$props.data.length
      )
      this.$emit("update:selectedRows", e.rows)
      this.$emit("update:selectedKeys", e.keys)
      this.$emit("select-change", /*JSON.parse(JSON.stringify(e))*/ e)
    },
    emitRadioChange(e) {
      //{radioKey的值value，row,index}
      this.$emit("currentValueChange", e.value)
      //向组件外发射
      this.$emit("radio-change", e)
    },
    //对columns数据进行加工后再使用
    machiningColumns() {
      // let columns = this.columns
      let columns = this.headAndBodyColumns.bodyColumns
      let headColumns = this.headAndBodyColumns.headColumns
      const cellWidth = this.cellWidth
      const { fixedLeft } = this.hasFixedColumns
      //如果存在固定左侧列的情况，则index和checkbox或者radio列，默认也要固定
      //如果存在固定右侧列的情况，则index和checkbox或者radio不需要固定
      let obj = {
        style: {
          width: cellWidth,
          backgroundColor: "#fafafa",
          textAlign: "center"
        }
      }
      if (fixedLeft) {
        obj.fixed = "left"
      }
      //处理复选或者单选
      if (this.hasCheckbox) {
        columns = [{ ...obj, field: "@_checkbox" }, ...columns]
        headColumns = [{ ...obj, field: "@_checkbox" }, ...headColumns]
      } else if (this.hasRadio) {
        columns = [{ ...obj, field: "@_radio" }, ...columns]
        headColumns = [{ ...obj, field: "@_radio" }, ...headColumns]
      }
      //处理有操作按钮的情况
      if (this.hasAction) {
        columns = [{ ...obj, field: "@_action" }, ...columns]
        headColumns = [{ ...obj, field: "@_action" }, ...headColumns]
      }
      //处理有序号的情况
      if (this.hasIndex) {
        columns = [{ ...obj, field: "@_index" }, ...columns]
        headColumns = [{ ...obj, field: "@_index" }, ...headColumns]
      }
      return { columns, headColumns }
    },
    //获取滚动条的宽度
    //TODO: 可以优化，不必要每次都计算
    getScrollBarWidth(el) {
      // 刚开始是获取的el的滚动条宽度
      // 此时存在一个问题：如果width是fit-content时，滚动条宽度为0！
      // 所以还是直接采用创建节点来计算滚动条宽度的方法
      // console.log(el)

      //注意：计算当前元素的滚动条宽度时，如果直接在
      //该元素上进行样式操作，如：overflow:hidden
      //会造成宽度闪动（由于突然没有了滚动条）
      //此时，更好的做法是克隆一个相同的节点，并计算
      const w1 = getStyle(el, "width")
      const h1 = getStyle(el, "height")
      el = el.cloneNode(true)
      el.style.width = w1
      el.style.height = h1
      el.style.position = "absolute"
      el.style.top = "-9999px"

      document.body.appendChild(el)
      const oldOverflowY = getStyle(el, "overflowY")
      el.style.overflowY = "hidden"
      const w = el.clientWidth
      el.style.overflowY = oldOverflowY
      const wScroll = el.clientWidth
      document.body.removeChild(el)
      return w - wScroll
      // const div = document.createElement('div')
      // div.style.cssText = `
      //   width:100px;
      //   height:100px;
      //   position:absolute;
      //   top:-9999px;
      // `
      // document.body.appendChild(div)
      // const w = div.clientWidth
      // div.style.overflowY = 'scroll'
      // const wScroll = div.clientWidth
      // document.body.removeChild(div)
      // return w - wScroll
    },
    //如果出现了纵向滚动条，
    //在table-layout:fixed和width:100%的情况下，
    //thead的列宽和tbody的列宽对不上,
    //此时需要给thead外层的div一个padding-right:滚动条宽度
    //才能对齐
    getBarWidthWhenAuto(el) {
      const width = parseFloat(getStyle(el,'width'))
      const childTable = el.querySelector('.k-table')
      const w =  parseFloat(getStyle(childTable,'width'))
      return width - w
    },
    justifyColumns() {
      this.$nextTick(() => {
        if (!this.$refs.mainTable) {
          return
        }
        if (this.height || this.maxHeight) {
          const mainTable = this.$refs.mainTable,
            body = mainTable.querySelector(".k-table-body"),
            head = mainTable.querySelector(".k-table-head"),
            foot = mainTable.querySelector(".k-table-foot"),
            scrollbarWidth = this.minContent?0:this.getBarWidthWhenAuto(body),
            leftTable = this.$refs.leftTable,
            rightTable = this.$refs.rightTable
          head && (head.style.paddingRight = scrollbarWidth + "px")
          foot && (foot.style.paddingRight = scrollbarWidth + "px")
          if (leftTable) {
            leftTable.querySelector(".k-table-head").style.paddingRight =
              scrollbarWidth + "px"
          }
          if (rightTable) {
            rightTable.querySelector(".k-table-head").style.paddingRight =
              scrollbarWidth + "px"
          }
        }
      })
    },
    //当有固定列时，需要根据主体表格宽度动态计算那些固定的总列宽
    calcColumnsWidth() {
      this.$nextTick(() => {
        const { leftTable, rightTable, mainTable } = this.$refs,
          { fixedLeft, fixedRight } = this.hasFixedColumns

        if (leftTable || rightTable) {
          //获取主体表格的table实际宽度，以便在窗口大小变化时动态赋给left和right表格的table元素
          const mainTableEl = mainTable.querySelector("table")
          const w = getStyle(mainTableEl, "width")
          // console.log(mw)
          // console.log(leftTable.querySelectorAll('table'))
          if (leftTable) {
            const tables = leftTable.querySelectorAll("table"),
              th = [...mainTable.querySelectorAll("thead th")].slice(
                0,
                fixedLeft
              )
            !this.minContent &&
              tables.forEach(table => {
                table.style.width = w
              })
            let thWidth = 0
            th.forEach(el => {
              thWidth += parseFloat(getStyle(el, "width"))
            })
            leftTable.style.width = thWidth + "px"
            leftTable.style.overflow = "hidden"
          }
          if (rightTable) {
            //NOTE: 右固定表格，在props的width为100%时是不需要做定位处理的
            //因为此时的右固定表格，一直处于右侧，且主表格宽度是100%的
            //所以不存在位置上的差异
            //但在width:fit-content时，是需要做特殊的处理的，因为此时的宽度
            //不随窗口大小变化，如果窗口过宽，就会出现表格占不满容器，
            //而右固定表格位于最右侧，就出现了覆盖不了主表格的情况
            const tables = rightTable.querySelectorAll("table"),
              th = [...mainTable.querySelectorAll("thead th")]
                .reverse()
                .slice(0, fixedRight)
            !this.minContent &&
              tables.forEach(table => {
                table.style.width = w
              })
            const mainWrapperWidth = parseFloat(getStyle(mainTable, "width"))
            const mainTBodyWrapperWidth = parseFloat(
              getStyle(mainTable.querySelector(".k-table-body"), "width")
            )
            let right = mainWrapperWidth - mainTBodyWrapperWidth
            right = right < 0 ? 0 : right
            rightTable.style.right = right + "px"

            const rightTableBodyWidth = parseFloat(
              getStyle(rightTable.querySelector(".k-table-body"), "width")
            )
            const rightTableWidth = parseFloat(
              getStyle(rightTable.querySelector(".k-table-body table"), "width")
            )
            const barWidth = rightTableBodyWidth - rightTableWidth
            let thWidth = 0
            th.forEach(el => {
              thWidth += parseFloat(getStyle(el, "width"))
            })
            rightTable.style.width = thWidth + barWidth + "px"
            // th[0].scrollIntoView()
            rightTable.scrollTo(99999, 0)
            rightTable.style.overflowX = "hidden"
            // let thWidth = 0,
            //   barWidth = this.getScrollBarWidth(
            //     rightTable.querySelector('.k-table-body'),
            //   )
            // th.forEach(el => {
            //   thWidth += parseFloat(getStyle(el, 'width'))
            // })
            // rightTable.style.width = thWidth + barWidth + 'px'
            // rightTable.scrollTo(99999, 0)
            // rightTable.style.overflowX = 'hidden'
            // if (this.width.toLowerCase() === 'fit-content') {
            //   rightTable.style.right = 'auto'
            //   let left = mainTable.clientWidth - thWidth - barWidth
            //   const maxLeft = parseFloat(w) - thWidth
            //   left = left > maxLeft ? maxLeft : left
            //   rightTable.style.left = left + 'px'
            // }
          }
        }
      })
    },
    mainTableScroll() {
      //如果此表格放在了可能会从dom中移除的组件中，则
      //mainTable可能会出现undefined的问题，
      //故需对mainTable进行判断
      const { mainTable, leftTable, rightTable } = this.$refs,
        scrollLeft = mainTable ? mainTable.scrollLeft : 0,
        clsLeft = "k-table-wrapper--fixed_left_shadow",
        clsRight = "k-table-wrapper--fixed_right_shadow"

      if (leftTable) {
        if (scrollLeft > 0) {
          leftTable.classList.add(clsLeft)
        } else {
          leftTable.classList.remove(clsLeft)
        }
      }
      if (rightTable) {
        const mainScrollWidth = mainTable.scrollWidth,
          mainClientWidth = mainTable.clientWidth
        if (mainTable.scrollLeft >= mainScrollWidth - mainClientWidth) {
          rightTable.classList.remove(clsRight)
        } else {
          rightTable.classList.add(clsRight)
        }
      }
    },
    bodyScroll({ top, left, target }) {
      //NOTE: 主体表格滚动的时候，左右表格也滚动
      //左右表格滚动的时候，主体表格也要滚动，
      //此时就造成了一个循环，并且scrollTop给表格自己赋值时，
      //会导致滚动的距离非常短
      //所以用了一个50ms的延迟，
      //当鼠标滚轮滚动时，如果当前target是滚动对象
      //就忽略自身，只有当不是自身时，才赋值scrollTop
      //当用户切换表格并滚动的速度小于50ms时，此做法就会有问题，
      //好在用户的操作不会那么快，所以也能解决问题
      //有其他的办法吗？
      //h5端什么表现？
      clearTimeout(this.timeout)
      if (this.currentScrollTarget === null) {
        this.currentScrollTarget = target
      }
      const { leftTable, rightTable, mainTable } = this.$refs
      let leftTableBody, rightTableBody, mainTableBody
      if (leftTable) {
        leftTableBody = leftTable.querySelector(".k-table-body")
        if (this.currentScrollTarget !== leftTableBody) {
          leftTableBody.scrollTop = top
        }
      }
      if (rightTable) {
        rightTableBody = rightTable.querySelector(".k-table-body")
        if (this.currentScrollTarget !== rightTableBody) {
          rightTableBody.scrollTop = top
        }
      }
      mainTableBody = mainTable.querySelector(".k-table-body")
      if (this.currentScrollTarget !== mainTableBody) {
        mainTableBody.scrollTop = top
      }
      this.timeout = setTimeout(() => {
        this.currentScrollTarget = null
      }, 50)
    },
    trMouseover(row, index) {
      const { leftTable, mainTable, rightTable } = this.$refs
      this.hoverTr(mainTable, index)
      this.hoverTr(leftTable, index)
      this.hoverTr(rightTable, index)
    },
    trMouseout(row, index) {
      const { leftTable, mainTable, rightTable } = this.$refs
      this.hoverTr(mainTable, index, false)
      this.hoverTr(leftTable, index, false)
      this.hoverTr(rightTable, index, false)
    },
    hoverTr(table, index, isIn = true) {
      if (table) {
        const tr = table.querySelectorAll(".k-table-body table tbody tr")
        tr[index].classList[isIn ? "add" : "remove"]("k-table-tr-hover")
      }
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

    emitAddRow(e) {
      this.$emit("add-row", e)
    },
    emitDeleteRow(e) {
      this.$emit("delete-row", e)
    },
    emitHighlight(e) {
      this.setHighlightRow(e)
      this.$emit('update:highlightValue',e.value)
      this.$emit("toggle-highlight", e)
    },
    emitDblclickRow(e) {
      this.$emit("dblclick-row", e)
    },
    handleSort(type, col) {
      const { name, field } = col
      this.$emit("sort", { type, field, name })
    }
  },
  mounted() {
    this.justifyColumns()
    this.calcColumnsWidth()
    this.mainTableScroll()
    window.addEventListener("resize", this.justifyColumns)
    window.addEventListener("resize", this.calcColumnsWidth)
    window.addEventListener("resize", this.mainTableScroll)
  },
  updated() {
    this.justifyColumns()
    this.calcColumnsWidth()
    this.mainTableScroll()
  },
  destroyed() {
    window.removeEventListener("resize", this.justifyColumns)
    window.removeEventListener("resize", this.calcColumnsWidth)
    window.removeEventListener("resize", this.mainTableScroll)
  },
  render() {
    const { fixedLeft, fixedRight } = this.hasFixedColumns
    const { columns, headColumns } = this.machiningColumns()
    let props = { ...this.$props, columns }
    // console.log(props)
    let heightStyle = {}
    if (this.height) {
      heightStyle.height = `calc(${this.height} - ${this.headHeight ||
        "0px"} - ${this.footHeight || "0px"})`
    } else if (this.maxHeight) {
      heightStyle.maxHeight = `calc(${this.maxHeight} - ${this.headHeight ||
        "0px"} - ${this.footHeight || "0px"})`
    }
    let tableBodyProps = {
      props: {
        ...props,
        bodyScopedSlots: this.$scopedSlots
      },
      style: heightStyle,
      on: {
        "add-row": this.emitAddRow,
        "delete-row": this.emitDeleteRow,
        "select-change": this.emitSelectChange,
        "toggle-radio-row": this.emitRadioChange,
        "toggle-highlight": this.emitHighlight,
        "dblclick-row": this.emitDblclickRow,
        bodyscroll: this.bodyScroll,
        //TODO: 由于是js控制的hover后背景变色，如果有合并行的情况，会有不准确的问题。待修正
        trmouseover: this.trMouseover,
        trmouseout: this.trMouseout
      }
    }

    //table的thead
    const thead = (
      <k-table-head
        {...{ props }}
        head-columns={headColumns}
        ref="theadWrapper"
        onHandleResizeDown={this.handleResizeDown}
        onTogglechecked={this.toggleCheckedAll}
        onHead-mounted={headHeight => {
          this.headHeight = headHeight
        }}
        onSort={this.handleSort}
      />
    )
    //table的tfoot
    const tfoot = (
      <k-table-foot
        {...{ props }}
        onFoot-mounted={footHeight => {
          this.footHeight = footHeight
        }}
      />
    )
    // console.log(columns)
    //主表格
    const mainTable = (
      <div
        class="k-table-wrapper"
        ref="mainTable"
        onScroll={this.mainTableScroll}
      >
        {thead}
        <k-table-body {...tableBodyProps} ref="mainTbodyWrapper" who="main" />
        {tfoot}
      </div>
    )
    //固定列时，复制出来的另一个左固定表格
    let fixedLeftTable = null
    if (fixedLeft) {
      fixedLeftTable = (
        <div class={this.leftWrapperClasses} ref="leftTable">
          {thead}
          <k-table-body {...tableBodyProps} ref="leftTbodyWrapper" who="left" />
          {tfoot}
        </div>
      )
    }
    //右侧固定列时，复制出右固定表格
    let fixedRightTable = null
    if (fixedRight) {
      fixedRightTable = (
        <div class={this.rightWrapperClasses} ref="rightTable">
          {thead}
          <k-table-body
            {...tableBodyProps}
            ref="rightTbodyWrapper"
            who="right"
          />
          {tfoot}
        </div>
      )
    }
    return (
      <div
        class={{
          "k-table-outer": true,
          "k-no-select": this.showBaseLine && this.resizeWidth
        }}
      >
        {mainTable}
        {fixedLeftTable}
        {fixedRightTable}
        {this.rBaseLine()}
      </div>
    )
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
  }
}
