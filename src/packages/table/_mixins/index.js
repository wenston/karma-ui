export default {
  computed: {
    c_filter_columns() {
      let columns = this.columns
      if(typeof columns === 'function') {
        columns = columns()
      }
      let arr = []
      columns.forEach(col=>{
        if(!!col && Object.prototype.toString.call(col).toLowerCase() ==="[object object]") {
          arr.push(col)
        }
      })
      return arr
      // return columns.filter(
      //   col =>
      //     !!col &&
      //     Object.prototype.toString.call(col).toLowerCase() ===
      //       "[object object]"
      // )
    },
    headAndBodyColumns() {
      let columns = this.c_filter_columns
      let bodyColumns = [],
        fn = (arr) => {
          arr.forEach(col => {
            if(col.children && col.children.length) {
              fn(col.children)
            }else{
              // bodyColumns.push({...col})
              bodyColumns.push(col)
            }
          })
        }
      fn(columns)
      return {bodyColumns,headColumns: columns}
      
    },
    //是否存在固定列（左，右）
    hasFixedColumns() {
      let fixedLeft = 0,
        fixedRight = 0,
        columns = this.c_filter_columns
      columns.forEach(col => {
        const f = col.fixed
        if (f === 'left') {
          fixedLeft += 1
        } else if (f === 'right') {
          fixedRight += 1
        }
      })
      if (fixedLeft > 0) {
        if (this.hasCheckbox || this.hasRadio) {
          fixedLeft += 1
        }
        if (this.hasIndex) {
          fixedLeft += 1
        }
      }
      return {
        fixedLeft,
        fixedRight
      }
    },
  }
}