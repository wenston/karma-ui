import KCheckbox from "karma-ui/packages/checkbox/checkbox"
import KIcon from "karma-ui/packages/icon/icon"
import KTransition from "karma-ui/packages/transition/transition"
import KTreeList from "./treeList"
export default {
  components: { KCheckbox, KIcon, KTransition, KTreeList },
  props: {
    data: Object,
    keyField: String,
    textField: String,
    childField: String,
    icon: Array,
    size: String,
    isLastOne: Boolean, //是不是数组中最后一条数据
    active: [Number, String], //当前选择的节点数据
    spread: Boolean,//
  },
  data() {
    return {
      open: this.spread
    }
  },
  inject: ["tree"],
  methods: {
    leafIcon() {
      const icon = this.icon[2]
      return <k-icon class="k-tree-icon-leaf" name={icon} />
    },
    foldIcon() {
      const icon = this.icon[0]
      const p = {
        props: {
          name: icon
        },
        class: "k-tree-icon"
      }
      return <k-icon {...p} />
    },
    openIcon() {
      const icon = this.icon[1]
      const p = {
        props: {
          name: icon
        },
        class: "k-tree-icon"
      }
      return <k-icon {...p} />
    },
    renderText(item) {
      const textField = this.textField
      const p = {
        class: [
          "k-tree-text",
          {
            "k-tree-text--active": this.active == item[this.keyField]
          }
        ],
        on: {
          click: () => {
            // 暂时用不到这种方式
            // this.$emit("toggle", item)
            this.tree.currentValue = item[this.keyField]
          }
        }
      }
      return <span {...p}>{item[textField]}</span>
    }
  },
  watch: {
    spread(v) {
      this.open =v
    },
    open(v) {
      this.$emit('update:spread',v)
    }
  },
  render() {
    const childData = this.data[this.childField]
    const open = this.open
    //注意参数的传递！
    const child = {
      props: {
        ...this.$props,
        data: childData && childData.length ? childData : []
      },
      on: {
        toggle: e => {
          this.$emit("toggle", e)
        }
      },
      directives: [
        {
          name: "show",
          value: open
        }
      ]
    }
    const icon = open ? this.openIcon() : this.foldIcon()
    const itemProps = {
      class: [
        "k-tree-item",
        {
          "k-tree-item--dotted": this.isLastOne && open
        }
      ]
    }
    const item = (
      <div {...itemProps}>
        <span
          class="k-tree-icon-wrapper"
          onClick={() => {
            if (childData.length) {
              this.open = !open
              this.tree.$emit('expand', this.open, this.tree.toPure(this.data))
            }
          }}
        >
          {childData.length ? icon : this.leafIcon()}
        </span>
        {this.renderText(this.data)}
        <k-transition>
          <KTreeList {...child} />
        </k-transition>
      </div>
    )
    return item
  }
}
