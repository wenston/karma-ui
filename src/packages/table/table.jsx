import KCol from './tableColumn'
export default {
  components: {
    KCol,
  },
  name: 'KTable',
  props: {
    data:Array,
    //是否有边框
    border:{
      type:Boolean,
      default: true
    },
  },
  computed: {
    tableClass() {
      return {
        'k-table': true,
        'k-table--border': this.border
      }
    },
    listeners() {
      return this.$listeners
    }
  },

  render() {
    const {tableClass, $attrs, $listeners} = this
    const tableProps = {
      class: tableClass,
      attrs: {
        ...$attrs
      },
      props: {},
      on: {
        ...$listeners
      }
    }
    return (
      <div class="k-table-wrapper">
        <table {...tableProps}>
          <thead>
            <tr>
              <k-col tag="th"
                >sdfsdf</k-col>
            </tr>
          </thead>
          <tbody>
            <tr>
            <k-col>2</k-col>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}