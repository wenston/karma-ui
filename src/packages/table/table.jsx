import { getStyle } from 'karma-ui/util/dom'
import { props } from './_util/props'
import KTableHead from './tableHead'
import KTableBody from './tableBody'
import KColGroup from './colGroup'
export default {
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
    }
  },
  provide: {
    __index: '@_index',
    __checkbox: '@_checkbox',
    __radio: '@_radio',
  },
  computed: {
    wrapperClasses() {
      const { fixedLeft, fixedRight } = this.hasFixedColumns
      return {
        'k-table-wrapper': true,
        'k-table-wrapper--fixed_left': fixedLeft,
      }
    },
    tableClass() {
      return {
        'k-table': true,
        'k-table--bordered': this.bordered,
        [`k-table--${this.size}`]: true,
        'k-table--stripe': this.stripe,
        'k-table--hover': this.hover,
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
    //是否存在固定列（左，右）
    hasFixedColumns() {
      let fixedLeft = false,
        fixedRight = false
      this.columns.forEach(col => {
        const f = col.fixed
        if (f) {
          if (typeof f === 'boolean') {
            fixedLeft = f
          } else if (typeof f === 'string') {
            const ff = f.trim().toLowerCase()
            if (ff === 'right') {
              fixedRight = true
            }
            if (ff !== 'right') {
              fixedLeft = true
            }
          }
        }
      })
      return { fixedLeft, fixedRight }
    },
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
    //如果el有滚动条，就获取滚动条的宽度
    getScrollBarWidth(el) {
      // console.log(el)
      const oldOverflowY = getStyle(el, 'overflowY')
      el.style.overflowY = 'hidden'
      const w = el.clientWidth
      el.style.overflowY = oldOverflowY
      const wScroll = el.clientWidth
      console.log(w - wScroll)
      return w - wScroll
    },
    //如果出现了纵向滚动条，
    //在table-layout:fixed和width:100%的情况下，
    //thead的列宽和tbody的列宽对不上,
    //此时需要给thead外层的div一个padding-right:滚动条宽度
    //才能对齐
    justifyColumns() {
      if (this.height) {
        const body = this.$refs.tbodyWrapper.$el,
          head = this.$refs.theadWrapper.$el,
          scrollbarWidth = this.getScrollBarWidth(body)
        head.style.paddingRight = scrollbarWidth + 'px'
      }
    },
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
    }
    //table的tbody
    const tbody = (
      <k-table-body
        {...tableBodyProps}
        ref="tbodyWrapper"
        onSelect-change={this.emitSelectChange}
      />
    )
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
      <div class="k-table-wrapper">
        {thead}
        {tbody}
      </div>
    )
    //固定列时，复制出来的另一个左表格
    let fixedLeftTable = null
    if (fixedLeft) {
      fixedLeftTable = (
        <div class={this.wrapperClasses}>
          {thead}
          {tbody}
        </div>
      )
    }
    return (
      <div class="k-table-outer">
        {mainTable}
        {fixedLeftTable}
      </div>
    )
  },
  mounted() {
    this.$nextTick(() => {
      this.justifyColumns()
    })
  },
  updated() {
    this.$nextTick(() => {
      this.justifyColumns()
    })
  },
}
