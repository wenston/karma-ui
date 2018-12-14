export default {
  computed: {
    headAndBodyColumns() {
      let bodyColumns = [],
        fn = (arr) => {
          arr.forEach(col => {
            if(col.children && col.children.length) {
              fn(col.children)
            }else{
              bodyColumns.push({...col})
            }
          })
        }
      fn(this.columns)
      return {bodyColumns,headColumns: this.columns}
      
    },
    //是否存在固定列（左，右）
    hasFixedColumns() {
      let fixedLeft = 0,
        fixedRight = 0
      this.columns.forEach(col => {
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