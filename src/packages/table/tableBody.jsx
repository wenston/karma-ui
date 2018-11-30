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
    bodyScopedSlots: Object,//接收来自KTable的插槽内容$scopedSlots
  },
  computed: {
    bodyWrapperClasses() {
      return {
        'k-table-body': true
      }
    },
    tableClasses() {
      return {
        'k-table': true,
        'k-table--bordered': this.bordered,
        [`k-table--${this.size}`]: true,
        'k-table--stripe': this.stripe,
        'k-table--hover': this.hover
      }
    }
  },
  methods: {
    //获取有嵌套的数据列field
    getNestingField(columns) {
      let field = ''
      for(let i = 0,len=columns.length;i<len;i++) {
        const fields = columns[i].field.trim().split('.')
        if(fields.length>1) {
          field = fields[0]
          break
        }
      }
      
      return field
    },
    //渲染单元格
    renderTableCell(row,col,index) {
      const {width,...restStyle} = {width:'',...col.style}
      let cell = row[col.field]
      if(col.scopedSlots) {
        cell = this.bodyScopedSlots[col.scopedSlots]({
          row,index
        })
      }else if(col.customRender) {
        cell = col.customRender(row,index)
      }
      return <k-cell style={restStyle}>{cell}</k-cell>
    },
    //合并行时，只依据一个嵌套数据进行合并！
    renderMergeRow(bodyScopedSlots,columns,data) {
      let tbody = []
        , nestingField = this.getNestingField(columns)
      //TODO: 如果需支持多级嵌套表格，需优化以下内容
      data.forEach((row,index)=>{
        const rowspan = row[nestingField].length || 1
        const tr = Array.apply(null,{length:rowspan}).map((n,i)=>{
          const column = columns.map((col,icol)=>{
            //获取此列样式
            const {width,...restStyle} = {width: '',...col.style}
            //获取此列的字段名、嵌套层级
            const fields = col.field.trim().split('.')
            const fieldsLength = fields.length


            //--start 定义单元格内容
            //目前只支持2级表格
            let cellContent = null
            if(fieldsLength===1) {
              cellContent = row[col.field]
            }else{
              const f = fields
              cellContent = row[f[0]][i][f[1]]
            }
            if(rowspan>1) {
              if(fieldsLength===1 && i === 0) {

                return <k-cell rowspan={rowspan} 
                  style={restStyle}>{cellContent}</k-cell>
              }else if(fieldsLength===1 && i !== 0) {
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
      const {bodyScopedSlots, columns, data} = this
      let tbody = []
        //level是数据的层级，1是只有1层，2是有1层嵌套，3是有2层嵌套...
        , level = 1
      if(columns.length!==0) {
        columns.forEach(col=>{
          const n = col.field.split('.').length
          if(level<n) {
            level = n
          }
        })
      }
      if(level>1) {
        //如果有合并行的情况
        return this.renderMergeRow(bodyScopedSlots,columns,data)
      }
      data.forEach((row,index)=>{
        const column = columns.map(col=>{
          return this.renderTableCell(row, col, index)
        })
        tbody.push(<tr>{column}</tr>)
      })
      return tbody
    }
  },
  render() {
    const { bodyWrapperClasses, tableClasses} = this
    if(this.tableLayoutAuto) {
      return <tbody>{this.renderTableBody()}</tbody>
    }
    return (
      <div class={bodyWrapperClasses}>
        <table class={tableClasses}>
          <k-col-group columns={this.columns}></k-col-group>
          <tbody>
            {this.renderTableBody()}
          </tbody>
        </table>
      </div>
    )
  }

}