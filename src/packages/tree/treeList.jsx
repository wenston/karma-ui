
import KTreeItem from "karma-ui/packages/tree/treeItem"

export default {
  name: 'KTreeList',
  components: {
    KTreeItem
  },
  props: {
    //树形组件的原始数据
    data: {
      type: Array,
      default: () => []
    },
    //折叠图标、展开图标
    icon: {
      type: Array,
      default: () => ["k-icon-plus-square", "k-icon-minus-square", 'k-icon-leaf']
    },
    //是否有复选框
    hasCheckbox: {
      type: Boolean,
      default: false
    },
    //key，用来选择用的字段名
    keyField: {
      type: String,
      default: 'Id'
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
    //大小尺寸
    size: String, //目前只支持两种：默认和big
    active: [String,Number],//当前选择的节点数据
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    treeProps() {
      return {
        class: [
          "k-tree",
          {
            "k-tree--big": this.size && this.size.trim() === "big"
          }
        ]
      }
    }
  },
  methods: {
    toggle(e) {
      //暂时用不到这种方式
      // this.$emit('toggle',e)
    }
  },
  render() {
    const {
      data: sourceData,
      treeProps,
      keyField,
      textField,
      childField,
      size,
      icon,
      active
    } = this
    const len = sourceData.length - 1
    const root = sourceData.map((item,i) => {
      const treeItemProps = {
        props: {
          keyField,
          textField,
          childField,
          data: item,
          icon,
          size,
          isLastOne: i === len,
          active,
          spread: item.__open__
        },
        on: {
          toggle: this.toggle,
          'update:spread':b=>{
            item.__open__ = b
          }
        }
      }
      return <k-tree-item {...treeItemProps} />
    })
    return <div {...treeProps}>{root}</div>
  }
}
