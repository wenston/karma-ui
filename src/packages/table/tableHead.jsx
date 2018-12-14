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
    headColumns: Array,
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
        'k-table--nowrap': this.nowrap,
      }
    },
    headStyles() {
      return {
        width: this.width,
      }
    },
  },
  methods: {
    toggleCheckedAll(e) {
      this.$emit('togglechecked', e.target.checked)
    },
    getRowspan(arr) {
      let i = 1
      let fn = arr => {
        let j = 1
        arr.forEach(el => {
          if (el.children && el.children.length) {
            j += 1
            fn(el.children)
          }
          if (j > i) {
            i = j
          }
        })
      }
      fn(arr)
      return i
    },
    getColspan(obj) {
      let arr = [],
        fn = obj => {
          if (obj.children && obj.children.length) {
            obj.children.forEach(c => {
              fn(c)
            })
          } else {
            arr.push(obj)
          }
        }
      fn(obj)
      return arr.length || 1
    },
    renderTr(columns) {},
    // renderTableHead() {
    //   let columns = JSON.parse(JSON.stringify(this.headColumns))
    //   let addLevel = (cols,i) => {
    //     cols.forEach(col => {
    //       //__level代表了第几行tr
    //       col.__level = i
    //       if (col.children && col.children.length) {
    //         addLevel(col.children,col.__level+1)
    //       }
    //     })
    //   }
    //   addLevel(columns,0)
    //   const maxRowspan = this.getRowspan(columns)
    //   let trs = Array.apply(null, { length: maxRowspan }).map(() => [])
      
    //   let renderTd = columns => {
        
    //   }
      
    //   return trs
    // },
    // 有children的合并列，没有children的合并行
    // 合并列的colspan是children.length
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
    return (
      <div class={this.headWrapperClasses}>
        <table class={this.headClasses} style={this.headStyles}>
          <k-col-group columns={this.columns} />
          <thead>{this.renderTableHead()}</thead>
        </table>
      </div>
    )
  },
}
