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
    active: [String, Number], //当前选择的节点数据,
    canck: {
      type: Boolean,
      default: undefined
    }
  },
  data() {
    return {
      // dataList: this.data
    }
  },
  watch: {
    // data(d) {
    //   this.dataList = d
    // }
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
    },
    canCheck(item) {
      if(this.checkable) {
        return this.checkable(item)
      }
      return true
    },
  },
  render() {
    let { data: sourceData, treeProps } = this
    const len = sourceData.length - 1
    const root = sourceData.map((item, i) => {
      const treeItemProps = {
        key: item[this.keyField],
        props: {
          ...this.$props,
          item,
          isLastOne: i === len,
          spread: item.__open__
        },
        on: {
          toggle: this.toggle,
          "update:spread": (b, el) => {
            // console.log(this.$children)
            item.__open__ = b
            
            if (b) {
              this.$children.forEach(child => {
                if (child.$el != el) {
                  child.open = false
                } else {
                  child.open = true
                }
              })
            }
          }
        }
      }
      //只要父级不能选，则其子级就不能选
      //
      if(this.checkable) {
        // treeItemProps.props.canck = !this.canCheck(item)
        // let c = this.canck && this.canCheck(item)
        let c
        if(this.canck!==undefined) {
          c = this.canck
        }
        if(c || c === undefined) {
          if(this.checkable) {
            c=this.checkable(item)
          }
        }
        treeItemProps.props.canck = c
      }
      return <k-tree-item {...treeItemProps} />
    })
    return <div {...treeProps}>{root}</div>
  }
}
