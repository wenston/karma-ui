export default {
  computed: {
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
      return { fixedLeft, fixedRight }
    },
  }
}