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
  },
  //是否有序号index
  hasIndex: {
    type: Boolean,
    default: true,
  },
  //序号index对应的表头描述
  indexName: {
    type: String,
    default: '#'
  },
  //是否支持复选框，支持复选时，单选就不起作用
  hasCheckbox: {
    type: Boolean,
    default: false,
  },
  //支持复选的情况下，需指定一个唯一标示的key，默认是Id，可以自定义
  //自定义的情况下，可以是多个key以逗号分隔，如：'ProId,StoreId'
  //从而确保key的唯一性
  checkboxKey: {
    type: String,
    default: 'Id'
  },
  //是否支持单选
  hasRadio: {
    type: Boolean,
    default: false
  },
  //表格宽度，默认情况下：tableLayoutAuto情况下是100%
  //fixed情况下，无默认宽度
  //NOTE: 宽度是给table元素的
  // 取消此width参数，因为：在出现纵向滚动条的情况下，表头和主体可能会对不齐
  // width: {
  //   type: String,
  //   default: ''
  // },
  //表格主题tbody高度，有高度的情况下，可以实现表头固定
  //NOTE: 是给表格主题外部div的高度
  height: {
    type: String,
    default: ''
  }
}