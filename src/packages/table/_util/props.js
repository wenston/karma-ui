export const props = {
  //点击某一行时，是否支持高亮显示
  canHighlightRow: {
    type: Boolean,
    default: false
  },
  //高亮时的唯一标示，如Id
  highlightKey: {
    type: String,
    default: "index,Id"
  },
  //高亮时，highlightKey对应的值
  //可以通过设置此值，来高亮某行
  //用以替代setHighlightRow方法
  //支持sync
  highlightValue: {
    type: [String, Number],
    default: ""
  },
  //循环行时的那个key，指的是字段名
  //loopKey可以是以逗号分隔的多个字段名，也可以是单个
  loopKey: {
    type: [String, Number],
    //index是指的数据行号
    default: "index,Id"
  },
  //原始数据
  data: {
    type: Array,
    default() {
      return []
    }
  },
  //列名及对应的描述
  //field必须要有
  //style里的宽度如果没有指定，则会有一个默认的120px的宽度，见colGroup.jsx
  /**
   *
   *  [{
   *    field:'字段名',
   *    name:'字段描述',
   *    scopedSlots:'slotName',
   *    style:{},
   *    sum:true,
   *    sorter:true
   *  }]
   * sum：是否需要汇总，类型：Boolean,String,Number,Function
   * sorter: 是否排序，Boolean
   */
  columns: {
    type: [Array, Function],
    default: () => []
  },
  //是否有边框
  bordered: {
    type: Boolean,
    default: true
  },
  //简易表格，只有下边框
  simple: {
    type: Boolean,
    default: false
  },
  //表格尺寸
  size: {
    type: String,
    default: "medium"
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
    default: false
  },
  //是否有操作按钮
  //默认只有添加和删除操作
  hasAction: {
    type: Boolean,
    default: false
  },
  //是否有表头
  hasThead: {
    type: Boolean,
    default: true
  },
  //序号index对应的表头描述
  indexText: {
    type: String,
    default: "#"
  },
  //是否支持复选框，支持复选时，单选就不起作用
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  //支持复选的情况下，需指定一个唯一标示的key，默认是Id，可以自定义
  //自定义的情况下，可以是多个key以逗号分隔，如：'ProId,StoreId'
  //从而确保key的唯一性
  checkboxKey: {
    type: String,
    default: "Id"
  },
  //可否选择某行，返回布尔值数组
  //[当前行是否被选中，当前行是否能被选中操作]的函数，接收两个参数，row、index
  //checkable的选中数据，不在selectedRows和selectedKeys里体现！
  checkable: Function,
  //支持sync，保存的是选择的行数据
  //selectedRows和selectedKeys里不包括不能进行选择操作的数据！
  //两个要同时使用，否则可能会出现问题！
  selectedRows: {
    type: Array,
    default: () => []
  },
  //支持sync，保存的是checkboxKey作为key 的数组
  selectedKeys: {
    type: Array,
    default: () => []
  },
  //支持单选的情况下，需指定一个唯一的标示，同checkboxKey
  radioKey: {
    type: String,
    default: "Id"
  },
  //是否支持单选
  hasRadio: {
    type: Boolean,
    default: false
  },
  //单选时，选中的radioKey对应的值
  value: {
    type: [Number, String]
  },
  //表格宽度，true表明是固定宽，false是auto，自动横向拉伸至100%
  minContent: {
    type: Boolean,
    default: true
  },
  //表格主题tbody高度，有高度的情况下，可以实现表头固定
  //NOTE: 是给表格主题外部div的高度
  height: {
    type: String,
    default: ""
  },
  maxHeight: {
    type: String,
    default: ""
  },
  minHeight: {
    type: String,
    default: ''
  },
  //是否允许文本换行
  // nowrap: {
  //   type: Boolean,
  //   default: false
  // },
  //tfoot 合计的文本描述
  sumText: {
    type: String,
    default: "合计"
  },
  //可调整列宽
  resizeWidth: {
    type: Boolean,
    default: false
  },
  emptyText: {
    type: [String, Function],
    default: "暂无相关数据"
  },
  leftFixedNumber: [Number,String]
}
