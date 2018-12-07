import { props } from './_util/props'
import KColGroup from './colGroup'
import KCell from './tableCell'
import KCheckbox from 'karma-ui/packages/checkbox/checkbox'
import KRadio from 'karma-ui/packages/radio/radio'
export default {
  components: {
    KColGroup,
    KCell,
    KCheckbox,
    KRadio,
  },
  props: {
    ...props,
  },
  data() {
    return {
      isCheckedAll: false,
    }
  },
  inject: ['__index', '__checkbox', '__radio'],
  computed: {
    headWrapperClasses() {
      return {
        'k-table-head': true,
      }
    },
    headClasses() {
      return {
        'k-table': true,
        'k-table--bordered': this.bordered,
        [`k-table--${this.size}`]: true,
        'k-table--nowrap': this.nowrap
      }
    },
    headStyles() {
      return {
        width: this.width
      }
    }
  },
  methods: {
    toggleCheckedAll(e) {
      this.$emit('togglechecked', e.target.checked)
    },
    renderTableHead() {
      const ths = this.columns.map(col => {
        let name = col.name || col.field || ''
        if (this.hasIndex && this.indexName && col.field === this.__index) {
          name = this.indexName
        }
        if (this.hasCheckbox && col.field === this.__checkbox) {
          name = (
            <k-checkbox
              checked={this.isCheckedAll}
              onChange={this.toggleCheckedAll}
            />
          )
        } else if (this.hasRadio && col.field === this.__radio) {
          name = ''
        }
        return <k-cell tag="th">{name}</k-cell>
      })
      return <tr>{ths}</tr>
    },
  },
  render() {
    // if (this.tableLayoutAuto) {
    //   return <thead>{this.renderTableHead()}</thead>
    // }
    return (
      <div class={this.headWrapperClasses}>
        <table class={this.headClasses}
          style={this.headStyles}>
          <k-col-group columns={this.columns} />
          <thead>{this.renderTableHead()}</thead>
        </table>
      </div>
    )
  },
}
