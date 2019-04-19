import KTreeItem from "karma-ui/packages/tree/treeItem"
import props from "./props"
export default {
  name: "KTreeList",
  components: {
    KTreeItem
  },
  props: {
    ...props,
    scopedSlots: Object,
    active: [String, Number] //当前选择的节点数据
  },
  data() {
    return {}
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
    let { data: sourceData, treeProps } = this
    const len = sourceData.length - 1
    const root = sourceData.map((item, i) => {
      const treeItemProps = {
        props: {
          ...this.$props,
          item,
          isLastOne: i === len,
          spread: item.__open__
        },
        on: {
          toggle: this.toggle,
          "update:spread": b => {
            item.__open__ = b
          }
        }
      }
      return <k-tree-item {...treeItemProps} />
    })
    return <div {...treeProps}>{root}</div>
  }
}
