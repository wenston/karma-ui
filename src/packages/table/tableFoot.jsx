import { getStyle } from "karma-ui/util/dom"
import { props } from "./_util/props"
import KCell from "./tableCell"
import KColGroup from "./colGroup"
export default {
  components: {
    KCell,
    KColGroup
  },
  props: {
    ...props
  },
  computed: {
    tableClasses() {
      return {
        "k-table": true,
        "k-table--bordered": this.bordered,
        [`k-table--${this.size}`]: true,
        "k-table--nowrap": this.nowrap,
        "k-table--min-content": this.minContent
      }
    },
    hasSum() {
      return this.columns.some(col => "sum" in col)
    }
  },
  methods: {
    isObject: any =>
      Object.prototype.toString.call(any).toLowerCase() === "[object object]",
    getColSum(field) {
      const f = field.split(".")
      let t = 0
      if (f.length === 1 && f[0]) {
        this.data.forEach(el => {
          t += +el[f[0]]
        })
      } else {
        const me = this
        let isEnd = false
        function fnObj(obj, fields) {
          for (let i = 0, len = fields.length; i < len; i++) {
            const fd = fields[i]
            if (Array.isArray(obj[fd])) {
              fn(obj[fd], fields.slice(1))
            } else if (me.isObject(obj[fd])) {
              fnObj(obj[fd], fields.slice(1))
            } else {
              t += +obj[fd]
              isEnd = true
              break
            }
          }
        }
        function fn(data, fields) {
          for (let i = 0, len = fields.length; i < len; i++) {
            const fd = fields[i]
            for (let j = 0, jlen = data.length; j < jlen; j++) {
              const dd = data[j]

              if (Array.isArray(dd[fd])) {
                dd[fd].forEach(el => {
                  fnObj(el, fields.slice(1))
                })
              } else {
                if (me.isObject(dd[fd])) {
                  fnObj(dd[fd], fields.slice(1))
                } else {
                  t += +dd[fd]
                  isEnd = true
                  break
                }
              }
            }
            if (isEnd) break
          }
        }
        fn(this.data, f)
      }
      return t
    },
    getSumContent(col, i) {
      const { sum, field } = col
      const type = typeof sum
      if (type === "string" || type === "number") {
        return sum
      } else {
        const total = this.getColSum(field)
        if(type === 'function') {
          //total是算出来的总和，i是此列的序号
          return sum(total,i)
        }else if(type === 'boolean') {
          return total
        }
      }
      return null
    },
    renderTd() {
      const { sumText } = this
      const tds = this.columns.map((col, i) => {
        const content = i === 0 ? sumText : this.getSumContent(col, i)
        return <k-cell>{content}</k-cell>
      })
      return <tr>{tds}</tr>
    }
  },
  render() {
    if (this.hasSum) {
      const { tableClasses } = this
      return (
        <div class="k-table-foot">
          <table class={tableClasses}>
            <k-col-group columns={this.columns} />
            <tfoot>{this.renderTd()}</tfoot>
          </table>
        </div>
      )
    }
    return false
  },
  mounted() {
    this.$nextTick(()=>{
      this.$emit('foot-mounted', getStyle(this.$el,'height'))
    })
  }
}