import { getStyle } from 'karma-ui/util/dom'
import { props } from './_util/props'
import mixins from './_mixins/'
import KTableHead from './tableHead'
import KTableBody from './tableBody'
import KColGroup from './colGroup'
export default {
  mixins: [mixins],
  components: {
    KTableHead,
    KTableBody,
    KColGroup,
  },
  name: 'KTable',
  props: {
    ...props,
  },
  data() {
    return {
      isCheckedAll: false,
      currentScrollTarget: null,
      timeout: null,
    }
  },
  provide: {
    __index: '@_index',
    __checkbox: '@_checkbox',
    __radio: '@_radio',
  },
  computed: {
    leftWrapperClasses() {
      const { fixedLeft } = this.hasFixedColumns
      return {
        'k-table-wrapper': true,
        'k-table-wrapper--fixed_left': fixedLeft,
      }
    },
    rightWrapperClasses() {
      const { fixedRight } = this.hasFixedColumns
      return {
        'k-table-wrapper': true,
        'k-table-wrapper--fixed_right': fixedRight,
      }
    },
    tableClass() {
      return {
        'k-table': true,
        'k-table--bordered': this.bordered,
        [`k-table--${this.size}`]: true,
        'k-table--stripe': this.stripe,
        'k-table--auto': this.tableLayoutAuto,
        'k-table--nowrap': this.nowrap,
      }
    },
    cellWidth() {
      const size = {
        mini: '28',
        small: '30',
        medium: '33',
        big: '36',
        large: '40',
        huge: '46',
      }
      return size[this.size]
    },
    // tableBodyProps() {
    //   return {
    //     props: {
    //       ...this.$props,
    //       isCheckedAll: this.isCheckedAll,
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
    getTableProps() {
      const { tableClass, $attrs, $listeners } = this
      return {
        class: tableClass,
        attrs: {
          ...$attrs,
        },
        on: {
          ...$listeners,
        },
      }
    },
    toggleCheckedAll(b) {
      this.isCheckedAll = b
    },
    emitSelectChange(arr) {
      this.$emit('select-change', arr)
    },
    //对columns数据进行加工后再使用
    machiningColumns() {
      let columns = this.columns
      const cellWidth = this.cellWidth
      const { fixedLeft } = this.hasFixedColumns
      //如果存在固定左侧列的情况，则index和checkbox或者radio列，默认也要固定
      //如果存在固定右侧列的情况，则index和checkbox或者radio不需要固定
      let obj = {
        style: { width: cellWidth },
      }
      if (fixedLeft) {
        obj.fixed = 'left'
      }
      //处理复选或者单选
      if (this.hasCheckbox) {
        columns = [{ ...obj, field: '@_checkbox' }, ...columns]
      } else if (this.hasRadio) {
        columns = [{ ...obj, field: '@_radio' }, ...columns]
      }
      //处理有序号的情况
      if (this.hasIndex) {
        columns = [{ ...obj, field: '@_index' }, ...columns]
      }
      return columns
    },
    //获取滚动条的宽度
    //TODO: 可以优化，不必要每次都计算
    getScrollBarWidth(el) {
      // 刚开始是获取的el的滚动条宽度
      // 此时存在一个问题：如果width是fit-content时，滚动条宽度为0！
      // 所以还是直接采用创建节点来计算滚动条宽度的方法
      // console.log(el)
      // const oldOverflowY = getStyle(el, 'overflowY')
      // el.style.overflowY = 'hidden'
      // const w = el.clientWidth
      // el.style.overflowY = oldOverflowY
      // const wScroll = el.clientWidth
      // return w - wScroll
      const div = document.createElement('div')
      div.style.cssText = `
        width:100px;
        height:100px;
        position:absolute;
        top:-9999px;
      `
      document.body.appendChild(div)
      const w = div.clientWidth
      div.style.overflowY = 'scroll'
      const wScroll = div.clientWidth
      document.body.removeChild(div)
      return w - wScroll
    },
    //如果出现了纵向滚动条，
    //在table-layout:fixed和width:100%的情况下，
    //thead的列宽和tbody的列宽对不上,
    //此时需要给thead外层的div一个padding-right:滚动条宽度
    //才能对齐
    justifyColumns() {
      this.$nextTick(() => {
        if (this.height) {
          const mainTable = this.$refs.mainTable,
            body = mainTable.querySelector('.k-table-body'),
            head = mainTable.querySelector('.k-table-head'),
            scrollbarWidth = this.getScrollBarWidth(body),
            leftTable = this.$refs.leftTable,
            rightTable = this.$refs.rightTable
          head.style.paddingRight = scrollbarWidth + 'px'

          if (leftTable) {
            leftTable.querySelector('.k-table-head').style.paddingRight =
              scrollbarWidth + 'px'
          }
          if (rightTable) {
            rightTable.querySelector('.k-table-head').style.paddingRight =
              scrollbarWidth + 'px'
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
          const mainTableEl = mainTable.querySelector('table')
          const w = getStyle(mainTableEl, 'width')
          // console.log(mw)
          // console.log(leftTable.querySelectorAll('table'))
          if (leftTable) {
            const tables = leftTable.querySelectorAll('table'),
              th = [...mainTable.querySelectorAll('thead th')].slice(
                0,
                fixedLeft,
              )
            tables.forEach(table => {
              table.style.width = w
            })
            let thWidth = 0
            th.forEach(el => {
              thWidth += parseFloat(getStyle(el, 'width'))
            })
            leftTable.style.width = thWidth + 'px'
            leftTable.style.overflowX = 'hidden'
          }
          if (rightTable) {
            //NOTE: 右固定表格，在props的width为100%时是不需要做定位处理的
            //因为此时的右固定表格，一直处于右侧，且主表格宽度是100%的
            //所以不存在位置上的差异
            //但在width:fit-content时，是需要做特殊的处理的，因为此时的宽度
            //不随窗口大小变化，如果窗口过宽，就会出现表格占不满容器，
            //而右固定表格位于最右侧，就出现了覆盖不了主表格的情况
            const tables = rightTable.querySelectorAll('table'),
              th = [...mainTable.querySelectorAll('thead th')]
                .reverse()
                .slice(0, fixedRight)
            tables.forEach(table => {
              table.style.width = w
            })
            let thWidth = 0,
              barWidth = this.getScrollBarWidth(
                rightTable.querySelector('.k-table-body'),
              )
            th.forEach(el => {
              thWidth += parseFloat(getStyle(el, 'width'))
            })
            // console.log(barWidth)
            rightTable.style.width = thWidth + barWidth + 'px'
            rightTable.scrollTo(99999, 0)
            rightTable.style.overflowX = 'hidden'
            if (this.width.toLowerCase() === 'fit-content') {
              rightTable.style.right = 'auto'
              let left = mainTable.clientWidth - thWidth - barWidth
              const maxLeft = parseFloat(w) - thWidth
              left = left > maxLeft ? maxLeft : left
              rightTable.style.left = left + 'px'
            }
          }
        }
      })
    },
    mainTableScroll() {
      const { mainTable, leftTable, rightTable } = this.$refs,
        scrollLeft = mainTable.scrollLeft,
        clsLeft = 'k-table-wrapper--fixed_left_shadow',
        clsRight = 'k-table-wrapper--fixed_right_shadow'

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
        leftTableBody = leftTable.querySelector('.k-table-body')
        if (this.currentScrollTarget !== leftTableBody) {
          leftTableBody.scrollTop = top
        }
      }
      if (rightTable) {
        rightTableBody = rightTable.querySelector('.k-table-body')
        if (this.currentScrollTarget !== rightTableBody) {
          rightTableBody.scrollTop = top
        }
      }
      mainTableBody = mainTable.querySelector('.k-table-body')
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
        const tr = table.querySelectorAll('.k-table-body table tbody tr')
        tr[index].classList[isIn ? 'add' : 'remove']('k-table-tr-hover')
      }
    },
  },
  mounted() {
    this.justifyColumns()
    this.calcColumnsWidth()
    this.mainTableScroll()
    window.addEventListener('resize', this.justifyColumns)
    window.addEventListener('resize', this.calcColumnsWidth)
    window.addEventListener('resize', this.mainTableScroll)
  },
  updated() {
    this.justifyColumns()
    this.calcColumnsWidth()
    this.mainTableScroll()
  },
  destroyed() {
    window.removeEventListener('resize', this.justifyColumns)
    window.removeEventListener('resize', this.calcColumnsWidth)
    window.removeEventListener('resize', this.mainTableScroll)
  },
  render() {
    const { fixedLeft, fixedRight } = this.hasFixedColumns
    const columns = this.machiningColumns()
    let props = { ...this.$props, columns, isCheckedAll: this.isCheckedAll }
    let tableBodyProps = {
      props: {
        ...props,
        bodyScopedSlots: this.$scopedSlots,
      },
      style: {
        height: this.height,
      },
      on: {
        'select-change':this.emitSelectChange,
        bodyscroll: this.bodyScroll,
        trmouseover: this.trMouseover,
        trmouseout: this.trMouseout,
      }
    }

    //table的thead
    const thead = (
      <k-table-head
        {...{ props }}
        ref="theadWrapper"
        onTogglechecked={this.toggleCheckedAll}
      />
    )
    //表格主体
    const mainTable = (
      <div
        class="k-table-wrapper"
        ref="mainTable"
        onScroll={this.mainTableScroll}
      >
        {thead}
        <k-table-body
          {...tableBodyProps}
          who="main"
        />
      </div>
    )
    //固定列时，复制出来的另一个左固定表格
    let fixedLeftTable = null
    if (fixedLeft) {
      fixedLeftTable = (
        <div class={this.leftWrapperClasses} ref="leftTable">
          {thead}
          <k-table-body
            {...tableBodyProps}
            who="left"
          />
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
            who="right"
          />
        </div>
      )
    }
    return (
      <div class="k-table-outer">
        {mainTable}
        {fixedLeftTable}
        {fixedRightTable}
      </div>
    )
  },
}
