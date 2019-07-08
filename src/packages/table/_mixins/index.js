import { isObject } from "karma-ui/util/object.js"
export default {
  computed: {
    //第一步，提取有效数据
    c_filter_columns() {
      let columns = this.columns
      if (typeof columns === "function") {
        columns = columns()
      }
      let arr = []
      columns.forEach(col => {
        if (!!col && isObject(col)) {
          arr.push(col)
        } else if (typeof col === "function") {
          const c = { ...col() }
          if (!!c && isObject(c)) arr.push(c)
        }
      })
      return arr
    },
    //第二步，加工thead、tbody需要的数据
    headAndBodyColumns() {
      let columns = this.c_filter_columns
      let bodyColumns = [],
        fn = arr => {
          arr.forEach(col => {
            if (col.children && col.children.length) {
              fn(col.children)
            } else {
              // bodyColumns.push({...col})
              bodyColumns.push(col)
            }
          })
        }
      fn(columns)

      return { bodyColumns, headColumns: columns }
    },
    //第三步，预置一些列，如：index，checkbox，radio，action
    //形成最终的thead和tbody需要的列数据
    machiningColumns() {
      // let columns = this.columns
      let { bodyColumns, headColumns } = this.headAndBodyColumns
      const cellWidth = this.cellWidth
      const { fixedLeft } = this.hasFixedColumns
      //如果存在固定左侧列的情况，则index和checkbox或者radio列，默认也要固定
      //如果存在固定右侧列的情况，则index和checkbox或者radio不需要固定
      let obj = {
        style: {
          width: cellWidth,
          // backgroundColor: "#fafafa",
          textAlign: "center"
        }
      }
      if (fixedLeft) {
        obj.fixed = "left"
      }
      //处理复选或者单选
      if (this.hasCheckbox) {
        bodyColumns = [{ ...obj, field: "@_checkbox" }, ...bodyColumns]
        headColumns = [{ ...obj, field: "@_checkbox" }, ...headColumns]
      } else if (this.hasRadio) {
        bodyColumns = [{ ...obj, field: "@_radio" }, ...bodyColumns]
        headColumns = [{ ...obj, field: "@_radio" }, ...headColumns]
      }
      //处理有操作按钮的情况
      if (this.hasAction) {
        bodyColumns = [{ ...obj, field: "@_action" }, ...bodyColumns]
        headColumns = [{ ...obj, field: "@_action" }, ...headColumns]
      }
      //处理有序号的情况
      if (this.hasIndex) {
        bodyColumns = [{ ...obj, field: "@_index" }, ...bodyColumns]
        headColumns = [{ ...obj, field: "@_index" }, ...headColumns]
      }
      return { bodyColumns, headColumns }
    },
    //是否存在固定列（左，右）
    hasFixedColumns() {
      let fixedLeft = 0,
        fixedRight = 0,
        columns = this.c_filter_columns
      columns.forEach(col => {
        const f = col.fixed
        if (f === "left") {
          fixedLeft += 1
        } else if (f === "right") {
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
    cellWidth() {
      const size = {
        mini: "45",
        small: "45",
        medium: "45",
        big: "50",
        large: "55",
        huge: "60"
      }
      return size[this.size]
    },
    hasSum() {
      return this.machiningColumns.bodyColumns.some(col => "sum" in col)
    }
  },
  methods: {
    //判断是否是内置列
    $_is_built_in_column(field) {
      return (
        field === this.__index ||
        field === this.__action ||
        field === this.__checkbox ||
        field === this.__radio
      )
    },
    //获取单元格的style
    $_get_td_style(row, index, col, obj = {}) {
      const style =
        typeof col.style === "function" ? col.style(row, index, obj) : col.style
      const { width, ...restStyle } = { width: "", ...style }
      return restStyle
    },
    //获取传入的单元格的class
    $_get_td_class(row, index, col, obj = {}) {
      const tp = typeof col.cellClass
      let cls = ""
      if (tp === "function") {
        cls = col.cellClass(row, index, obj)
      }
      return Array.isArray(cls) ? cls.join(" ") : cls
    }
  }
}
