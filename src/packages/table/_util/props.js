export const props = {
  //是否为自动宽的表格：table-layout:auto,默认否
  tableLayoutAuto: Boolean,
  //原始数据
  data: Array,
  //列名及对应的描述
  //field必须要有
  //style里的宽度如果没有指定，则会有一个默认的120px的宽度，见colGroup.jsx
  /**
   *
   *  [{field:'字段名',name:'字段描述',scopedSlots:'slotName',style:{},sum:true}]
   * sum：是否需要汇总，类型：Boolean,String,Number,Function
   */
  columns: Array,
  //是否有边框
  bordered: {
    type: Boolean,
    default: true
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
  //支持单选的情况下，需指定一个唯一的标示，同checkboxKey
  radioKey: {
    type: String,
    default: 'Id'
  },
  //是否支持单选
  hasRadio: {
    type: Boolean,
    default: false
  },
  //单选时，选中的radioKey对应的值
  currentValue: {
    type: [Number,String]
  },
  //表格宽度，默认情况下：是100%，即：各个列都是等宽
  //，且各个列的宽之和是等于表格总宽度的
  //取值是css的width可以接收的任何属性
  //fixed情况下，无默认宽度
  //对应的是table的宽度是不是min-content，默认是100%

  minContent: Boolean,
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
  //是否允许文本换行
  nowrap: {
    type: Boolean,
    default: false
  },
  //tfoot 合计的文本描述
  sumText: {
    type: String,
    default: "合计"
  },
  //可调整列宽
  resizeWidth: Boolean,
}
