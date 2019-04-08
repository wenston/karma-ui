import KDropdown from "karma-ui/packages/dropdown/dropdown"
import KTree from "karma-ui/packages/tree/tree"
import KIcon from "karma-ui/packages/icon/icon"
import loading from "karma-ui/directives/loading/index"
import ScrollBar from "karma-ui/packages/scrollbar/Scrollbar"
export default {
  name: "KSelectTree",
  components: {
    KDropdown,
    // KInput,
    KTree,
    KIcon
  },
  props: {
    ...KTree.props,
    block: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.show,
      checkedData: this.selectedData,
      checkedKeys: this.selectedKeys.join(",")
    }
  },
  methods: {
    checkedList() {
      let list = null,
        textField = this.textField,
        keyField = this.keyField,
        checkedData = this.checkedData
      if (checkedData && checkedData.length) {
        list = checkedData.map((item, i) => {
          return item[textField] + (i === checkedData.length - 1 ? "" : "，")
        })
      }
      return (
        <ScrollBar speed={10} class="k-select-tree-checked-list">
          <div class="k-select-tree-checked">{list}</div>
        </ScrollBar>
      )
    },
    title() {
      let icon = null
      if (this.selectedData && this.selectedData.length) {
        icon = (
          <k-icon
            class="k-select-tree-clear"
            name="k-icon-close"
            onClick={e => {
              this.checkedKeys = ""
              e.stopPropagation()
            }}
          />
        )
      }
      const p = {
        attrs: {
          tabindex: 1,
        },
        class: [
          'k-select-tree',
          {
            ["k-select-tree--block"]: this.block
          }
        ],
        on: {
          focus: e=>{
            this.visible = true
          },
          click: e=> {
            e.stopPropagation()
          }
        }
      }
      return (
        <div
          {...p}
        >
          {this.checkedList()}
          {icon}
        </div>
      )
    },
    body() {
      const p = {
        props: { ...this.$props, selectedData: this.checkedData },
        on: {
          ...this.$listeners,
          "update:selectedData": d => {
            this.checkedData = d
          }
        }
      }
      return <KTree {...p} />
    }
  },
  render() {
    const title = this.title()
    const body = this.body()
    const p = {
      props: {
        show: this.visible,
        title,
        body,
        bodyClassName: "k-select-tree-body"
      },
      on: {
        "update:show": v => {
          this.visible = v
        }
      }
    }
    return <KDropdown {...p} />
  },
  watch: {
    visible(v) {
      this.$emit("update:show", v)
    },
    show(v) {
      this.visible = v
    },
    selectedData(d) {
      this.checkedData = d
    },
    checkedData(d) {
      this.$emit("update:selectedData", d)
    },
    checkedKeys(v) {
      this.$emit("update:selectedKeys", v.split(","))
    },
    selectedKeys(v) {
      this.checkedKeys = v.join(",")
    }
  },
  directives: {
    loading
  }
}
