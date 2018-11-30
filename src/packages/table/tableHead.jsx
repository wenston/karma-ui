import { props } from './_util/props'
import KColGroup from './colGroup'
import KCell from './tableCell'
export default {
  components: {
    KColGroup,
    KCell
  },
  props: {
    ...props,
  },
  computed: {
    headWrapperClasses() {
      return {
        'k-table-head': true
      }
    },
    headClasses() {
      return {
        'k-table': true,
        'k-table--bordered': this.bordered,
        [`k-table--${this.size}`]: true,
      }
    }
  },
  methods: {
    renderTableHead() {
      const ths = this.columns.map(col=>{
        const name = col.name || col.field || ''
        return <k-cell tag="th">{name}</k-cell>
      })
      return <tr>{ths}</tr>
    }
  },
  render() {
    if(this.tableLayoutAuto) {
      return <thead>{this.renderTableHead()}</thead>
    }
    return (
      <div class={this.headWrapperClasses}>
        <table class={this.headClasses}>
          <k-col-group columns={this.columns}></k-col-group>
          <thead>{this.renderTableHead()}</thead>
        </table>
      </div>
    )
  }
}