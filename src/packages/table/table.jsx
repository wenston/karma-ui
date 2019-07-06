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
    ...props
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
      fixedNum: +this.leftFixedNumber
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
      const { thead, tfoot,tbody, mainTable } = this.$refs
      if (mainTable) {
        const tar = mainTable
        const scrollTop = tar.scrollTop
        const scrollLeft = tar.scrollLeft
        const scrollHeight = tar.scrollHeight
        const clientHeight = tar.clientHeight
        if (thead) {
          const theadEl = thead.$el
          theadEl.style.top = scrollTop + "px"
          if (scrollTop > 0) {
            theadEl.classList.add("k-theadwrapper-shadow")
          } else {
            theadEl.classList.remove("k-theadwrapper-shadow")
          }
          if(this.leftFixedNumber) {

            this.fixedLeftThead(theadEl,scrollLeft)
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
          if(this.leftFixedNumber) {

            this.fixedLeftTfoot(tfootEl,scrollLeft)
          }
        }
        if(tbody) {

          this.fixedLeftTbody(tbody.$el,scrollLeft)
        }
        /* 
        let tds = []

        let trths = tar.querySelectorAll(
          ".k-table > thead > tr,.k-table>tbody>tr,.k-table>tfoot>tr"
        )
        trths.forEach(el=>{
          let childTds = [...el.querySelectorAll('td, th')].slice(0,+this.leftFixedNumber)
          tds.push(...childTds)
        })
        if (scrollLeft > 0) {
          tds.forEach(td => {
            td.classList.add("k-table-fixed-td-body")
            td.style.transform = `translateX(${scrollLeft}px)`
          })
        } else {
          tds.forEach(td => {
            td.classList.remove("k-table-fixed-td-body")
            td.style.removeProperty("transform")
          })
        }
        */
      }
    },
    fixedLeftThead(el,scrollLeft) {
      const n = +this.leftFixedNumber
      let arrThs = []
      let trs = el.querySelectorAll('.k-table>thead>tr')
      let trLength = trs.length
      trs.forEach(tr=>{
        [...tr.querySelectorAll('th')].slice(0,n).forEach(th=>{
          const colspan = th.getAttribute('colspan')
          const rowspan = th.getAttribute('rowspan')
          if(trLength==rowspan) {
            arrThs.push(th)
          }
        })
        
      })
      this.classAndPropertyChange('head',arrThs,scrollLeft)
    },
    fixedLeftTfoot(el,scrollLeft) {
      const n = +this.leftFixedNumber
      let arrThs = []
      let trs = el.querySelectorAll('.k-table>tfoot>tr')
      trs.forEach(tr=>{
        [...tr.querySelectorAll('th')].slice(0,n).forEach(th=>{
          arrThs.push(th)
        })
      })
      this.classAndPropertyChange('foot',arrThs,scrollLeft)
    },
    fixedLeftTbody(el,scrollLeft) {
      const n = +this.leftFixedNumber
      let arrTds = []
      let trs = el.querySelectorAll('.k-table>tbody>tr')
      trs.forEach(tr=>{
        [...tr.querySelectorAll('td')].slice(0,n).forEach(td=>{
          arrTds.push(td)
        })
      })
      this.classAndPropertyChange('body',arrTds,scrollLeft)
    },
    classAndPropertyChange(which,elems,scrollLeft) {
      const klass = which === 'head'?'k-table-fixed-td-head':
        which==='foot'?'k-table-fixed-td-foot':'k-table-fixed-td-body'
      if(scrollLeft>0) {
        elems.forEach(el=>{
          el.classList.add(klass)
          el.style.transform = `translateX(${scrollLeft}px)`
        })
      }else{
        elems.forEach(el=>{
          el.classList.remove(klass)
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
