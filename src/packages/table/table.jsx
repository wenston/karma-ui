import { props } from './_util/props'
import KTableHead from './tableHead'
import KTableBody from './tableBody'
import KColGroup from './colGroup'
export default {
  components: {
    KTableHead,
    KTableBody,
    KColGroup
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
    tableClass() {
      return {
        'k-table': true,
        'k-table--bordered': this.bordered,
        [`k-table--${this.size}`]: true,
        'k-table--stripe': this.stripe,
        'k-table--hover': this.hover,
        'k-table--auto': this.tableLayoutAuto,
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
      this.$emit('select-change',arr)
    }
  },
  render() {
    let columns = this.columns
    const cellWidth = this.cellWidth
    if (this.hasCheckbox) {
      columns = [
        {
          style: { width: cellWidth },
          field: '@_checkbox',
        },
        ...columns,
      ]
    } else if (this.hasRadio) {
      columns = [
        {
          style: { width: cellWidth },
          field: '@_radio',
        },
        ...columns,
      ]
    }
    if (this.hasIndex) {
      columns = [
        {
          style: { width: cellWidth },
          field: '@_index',
        },
        ...columns,
      ]
    }

    let props = { ...this.$props, columns, isCheckedAll: this.isCheckedAll }
    let tableBodyProps = {
      props: {
        ...props,
        bodyScopedSlots: this.$scopedSlots,
      },
    }
    if (this.tableLayoutAuto) {
      return (
        <div class="k-table-wrapper">
          <table {...this.getTableProps()}>
            <k-col-group columns={this.columns} />
            <k-table-head
              {...{ props }}
              onTogglechecked={this.toggleCheckedAll}
            />
            <k-table-body {...tableBodyProps}
              onSelect-change={this.emitSelectChange} />
          </table>
        </div>
      )
    }

    tableBodyProps = {
      ...tableBodyProps,
      style: {
        height: this.height
      }
    }
    return (
      <div class="k-table-wrapper">
        <k-table-head {...{ props }}
          onTogglechecked={this.toggleCheckedAll} />
        <k-table-body {...tableBodyProps}
          onSelect-change={this.emitSelectChange} />
      </div>
    )
  },
}
