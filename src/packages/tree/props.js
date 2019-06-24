export default {
  //树形组件的原始数据
  data: {
    type: Array,
    default: () => []
  },
  //折叠图标、展开图标、叶子节点图标
  icon: {
    type: Array,
    default: () => ["k-icon-plus-square", "k-icon-minus-square", "k-icon-leaf"]
  },
  //是否有复选框
  hasCheckbox: {
    type: Boolean,
    default: false
  },
  //key，用来选择用的字段名
  keyField: {
    type: String,
    default: "Id"
  },
  //子节点字段名
  childField: {
    type: String,
    default: "Childs"
  },
  //展示出来的文本，字段名
  textField: {
    type: String,
    default: "Name"
  },
  leafField: {
    type: String,
    default: 'IsLeaf'
  },
  //大小尺寸
  size: String, //目前只支持两种：默认和big

  //用户选择的数据(拍平的数据)，支持sync
  selectedData: {
    type: Array,
    default: () => []
  },
  //用户选择的keyField对应的值（拍平的数组），支持sync
  selectedKeys: {
    type: Array,
    default: () => []
  },
  //复选控制，选中时的规则设置，selectedRule为some时，代表子级只要有一个被选中，则父级就被选中
  //为every时，代表子级所有都被选中时，父级才被选中
  selectedRule: {
    type: [String,Boolean],
    default: "some" //every
  },
  lazy: {
    type: Boolean,
    default: false
  },
  lazyLoad: Function,
  //是否是手风琴效果
  accordion: {
    type: Boolean,
    default: true
  }
}
