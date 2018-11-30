export const props = {
  //是否为自动宽的表格：table-layout:auto,默认否
  tableLayoutAuto: Boolean,
  //原始数据
  data: Array,
  //列名及对应的描述
  //field必须要有
  //style里的宽度必须要有，否则在table-layout:fixed的情况下宽度为0
  /**
   *  [{field:'字段名',name:'文本描述',scopedSlots:'slotName',style:{}}]
   */
  columns: Array,
  //是否有边框
  bordered: {
    type: Boolean,
    default: true,
  },
  //表格尺寸
  size: {
    type: String,
    default: 'medium',
  },
  //是否有斑马线
  stripe: {
    type: Boolean,
    default: true
  },
  //是否鼠标滑入变色
  hover: {
    type: Boolean,
    default: true
  }
}