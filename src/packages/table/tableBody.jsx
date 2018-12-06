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
    isCheckedAll: Boolean, //接收由tableHead组件间接传过来的全选操作
    bodyScopedSlots: Object, //接收来自KTable的插槽内容$scopedSlots
  },
  inject: ['__index', '__checkbox', '__radio'],
  data() {
    return {
      checkedKeys: [], //保存复选的所有key
      checkedRows: [], //保存复选的所有行数据
    }
  },
  computed: {
    bodyWrapperClasses() {
      return {
        'k-table-body': true,
      }
    },
    tableClasses() {
      return {
        'k-table': true,
        'k-table--bordered': this.bordered,
        [`k-table--${this.size}`]: true,
        'k-table--stripe': this.stripe,
        'k-table--hover': this.hover,
        'k-table--nowrap': this.nowrap,
        'k-table--auto': this.tableLayoutAuto,
      }
    },
    tableStyles() {
      return {
        
      }
    }
  },
  watch: {
    isCheckedAll(nv, ov) {
      //当不选择时，不可以将checkedKeys直接清空，因为可能存在跨页选择的数据
      //checkedRows同上
      let set = new Set(this.checkedKeys)
      if (nv) {
        this.data.forEach(row => {
          const k = this.formatCheckedKey(row)
          set.add(k)
          let has = false
          for(let i=0,len=this.checkedRows.length;i<len;i++) {
            if(k===this.formatCheckedKey(this.checkedRows[i])) {
              has = true
              break
            }
          }
          if(!has) {
            this.checkedRows.push(JSON.parse(JSON.stringify(row)))
          }
        })
      } else {
        this.data.forEach(row => {
          const k = this.formatCheckedKey(row)
          set.delete(k)
          let j = -1
          for(let i=0,len=this.checkedRows.length;i<len;i++) {
            if(k===this.formatCheckedKey(this.checkedRows[i])) {
              j = i
              break
            }
          }
          if(j>-1) {
            this.checkedRows.splice(j,1)
          }
        })
      }
      this.checkedKeys = [...set]
      this.emitSelectChange()
      //NOTE: 如果出现选不中的情况，需检查传入的checkboxKey是否有问题
    },
  },
  methods: {
    emitSelectChange() {
      this.$emit('select-change', JSON.parse(JSON.stringify(this.checkedRows)))
    },
    //复选，单行
    toggleRow(e,row,index) {
      const k = this.formatCheckedKey(row)
      let set = new Set(this.checkedKeys)
      if(e.target.checked) {
        set.add(k)
        let has = false
        for(let i=0,len=this.checkedRows.length;i<len;i++) {
          if(k===this.formatCheckedKey(this.checkedRows[i])) {
            has = true
            break
          }
        }
        if(!has) {
          this.checkedRows.push(JSON.parse(JSON.stringify(row)))
        }
      }else{
        set.delete(k)
        let j = -1
        for(let i=0,len=this.checkedRows.length;i<len;i++) {
          if(k===this.formatCheckedKey(this.checkedRows[i])) {
            j = i
            break
          }
        }
        if(j>-1) {
          this.checkedRows.splice(j,1)
        }
      }
      this.checkedKeys = [...set]
      this.emitSelectChange()
    },
    //格式化checkboxKey
    formatCheckedKey(row) {
      let keys = this.checkboxKey.trim().split(','),
        result = ''
      keys.forEach(key => {
        result = result + row[key]
      })
      return result
    },
    //处理序号列、多选或者单选的情况
    addFields(row, col, index, cell) {
      //如果有序号列
      if (this.hasIndex && col.field === this.__index) {
        cell = index + 1
      }
      //如果有复选框
      if (this.hasCheckbox && col.field === this.__checkbox) {
        cell = (
          <k-checkbox
            value={this.formatCheckedKey(row)}
            type="arr"
            data-arr={this.checkedKeys}
            onChange={()=>this.toggleRow($event,row,index)}
          />
        )
        //如果有单选框
      } else if (this.hasRadio && col.field === this.__radio) {
        cell = <k-radio />
      }
      return cell
    },
    //获取有嵌套的数据列field,目前只支持2级嵌套
    getNestingField(columns) {
      let field = ''
      for (let i = 0, len = columns.length; i < len; i++) {
        const fields = columns[i].field.trim().split('.')
        if (fields.length > 1) {
          field = fields[0]
          break
        }
      }

      return field
    },
    //渲染单元格
    renderTableCell(row, col, index) {
      const { width, ...restStyle } = { width: '', ...col.style }

      let cell = row[col.field]
      cell = this.addFields(row, col, index, cell)

      //如果有作用域插槽
      if (col.scopedSlots) {
        cell = this.bodyScopedSlots[col.scopedSlots]({
          row,
          index,
        })
        //如果有自定义渲染函数
      } else if (col.customRender) {
        cell = col.customRender(row, index)
      }
      return <k-cell style={restStyle}>{cell}</k-cell>
    },
    //合并tbody行，只依据一个嵌套数据进行合并！
    renderMergeRow(bodyScopedSlots, columns, data) {
      let tbody = [],
        nestingField = this.getNestingField(columns)
      //TODO: 如果需支持多级嵌套表格，需优化以下内容
      data.forEach((row, index) => {
        const rowspan = row[nestingField].length || 1
        const tr = Array.apply(null, { length: rowspan }).map((n, i) => {
          const column = columns.map((col, icol) => {
            //获取此列样式
            const { width, ...restStyle } = { width: '', ...col.style }
            //获取此列的字段名、嵌套层级
            const fields = col.field.trim().split('.')
            const fieldsLength = fields.length

            //--start 定义单元格内容
            //目前只支持2级表格
            let cellContent = null
            const f = fields
            if (fieldsLength === 1) {
              cellContent = row[col.field]
            } else {
              cellContent = row[f[0]][i][f[1]]
            }
            cellContent = this.addFields(row, col, index, cellContent)
            //如果有作用域插槽
            if (col.scopedSlots) {
              cellContent = this.bodyScopedSlots[col.scopedSlots]({
                row,
                row1:row[f[0]][i],
                index,
                index1:i
              })
              //如果有自定义渲染函数
            } else if (col.customRender) {
              //TODO: row1是undefined，需检查
              cellContent = col.customRender({row, index,row1:row[f[0][i]],index1:i})
            }
            if (rowspan > 1) {
              if (fieldsLength === 1 && i === 0) {
                return (
                  <k-cell rowspan={rowspan} style={restStyle}>
                    {cellContent}
                  </k-cell>
                )
              } else if (fieldsLength === 1 && i !== 0) {
                return null
              }
              return <k-cell style={restStyle}>{cellContent}</k-cell>
            }
            return <k-cell style={restStyle}>{cellContent}</k-cell>
            //--end
          })
          return <tr>{column}</tr>
        })
        tbody.push(tr)
      })
      return tbody
    },
    //渲染表格的tbody
    renderTableBody() {
      const { bodyScopedSlots, columns, data } = this
      let tbody = [],
        //level是数据的层级，1是只有1层，2是有1层嵌套，3是有2层嵌套...
        level = 1
      if (columns.length !== 0) {
        columns.forEach(col => {
          const n = col.field.split('.').length
          if (level < n) {
            level = n
          }
        })
      }
      if (level > 1) {
        //如果有合并行的情况
        return this.renderMergeRow(bodyScopedSlots, columns, data)
      }
      data.forEach((row, index) => {
        const column = columns.map(col => {
          return this.renderTableCell(row, col, index)
        })
        tbody.push(<tr>{column}</tr>)
      })
      return tbody
    },
  },
  render() {
    const { bodyWrapperClasses, tableClasses } = this
    // if (this.tableLayoutAuto) {
    //   return <tbody>{this.renderTableBody()}</tbody>
    // }
    return (
      <div class={bodyWrapperClasses}>
        <table class={tableClasses}
          style={this.tableStyles}>
          <k-col-group columns={this.columns} />
          <tbody>{this.renderTableBody()}</tbody>
        </table>
      </div>
    )
  }
}
