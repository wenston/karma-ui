import { props } from './_util/props'
import KTableHead from './tableHead'
import KTableBody from './tableBody'
export default {
  components: {
    KTableHead,
    KTableBody
  },
  name: 'KTable',
  props: {
    ...props
  },
  computed: {
    tableClass() {
      return {
        'k-table': true,
        'k-table--bordered': this.bordered,
        [`k-table--${this.size}`]: true,
        'k-table--stripe': this.stripe,
        'k-table--hover': this.hover,
        'k-table--auto': this.tableLayoutAuto
      }
    },
  },
  methods: {
    getTableProps() {
      const { tableClass, $slots, $attrs, $props, $listeners } = this
      return {
        class: tableClass,
        attrs: {
          ...$attrs,
        },
        props: {
          ...$props
        },
        on: {
          ...$listeners,
        },
      }
    },
  },
  render() {
    const props = {...this.$props}
    const tableBodyProps = {
      props: {
        ...props,
        bodyScopedSlots: this.$scopedSlots
      }
    }
    if(this.tableLayoutAuto) {
      return (
        <div class="k-table-wrapper">
          <table {...this.getTableProps()}>
            <k-table-head {...{props}}></k-table-head>
            <k-table-body {...tableBodyProps}
            ></k-table-body>
          </table>
        </div>
      )
    }
    return (
      <div class="k-table-wrapper">
        <k-table-head {...{props}}></k-table-head>
        <k-table-body {...tableBodyProps}
          ></k-table-body>
      </div>
    )
  },
}
