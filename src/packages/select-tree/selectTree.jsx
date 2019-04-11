import KDropdown from "karma-ui/packages/dropdown/dropdown"
import KTree from "karma-ui/packages/tree/tree"
import KIcon from "karma-ui/packages/icon/icon"
import loading from "karma-ui/directives/loading/index"
import ScrollBar from "karma-ui/packages/scrollbar/Scrollbar"
export default {
  name: "KSelectTree",
  components: {
    KDropdown,
    KTree,
    KIcon
  },
  props: {
    ...KTree.props,
    placeholder: {
      type: String,
      default: "请选择分类"
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.show,
      checkedData: this.selectedData,
      checkedKeys: this.selectedKeys.join(","),
      list: []
    }
  },
  methods: {
    isSameKeys(arr1, arr2) {
      const a1 = JSON.parse(JSON.stringify(arr1))
        .sort((x, y) => x - y)
        .join(",")
      const a2 = JSON.parse(JSON.stringify(arr2))
        .sort((x, y) => x - y)
        .join(",")
      return a1 === a2
    },
    checkedList() {
      let list = (
          <span class="k-select-tree-placeholder">{this.placeholder}</span>
        ),
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
      if (this.checkedData && this.checkedData.length) {
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
          tabindex: 1
        },
        class: [
          "k-select-tree",
          {
            ["k-select-tree--block"]: this.block
          }
        ],
        on: {
          focus: e => {
            this.visible = true
          },
          click: e => {
            e.stopPropagation()
          }
        }
      }
      return (
        <div {...p}>
          {this.checkedList()}
          {icon}
        </div>
      )
    },
    body() {
      const childField = this.childField,
        keyField = this.keyField
      let list = this.list
      let p = {
        props: {
          ...this.$props,
          selectedData: this.checkedData
        },
        on: {
          ...this.$listeners,
          "update:selectedData": d => {
            this.checkedData = d
          }
        }
      }
      if (this.visible) {
        p.directives = [
          {
            name: "loading",
            value: {
              loading: this.data.length === 0,
              content: "数据获取中..."
            }
          }
        ]
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
    checkedKeys(v, oldv) {
      let arr = v.split(",")
      if (arr && arr.length && !arr[0]) {
        arr = []
      }
      if (!this.isSameKeys(this.selectedKeys, arr)) {
        this.$emit("update:selectedKeys", arr)
      }
    },
    selectedKeys(v, oldv) {
      if (!this.isSameKeys(v, oldv)) {
        this.checkedKeys = v.join(",")
      }
    }
  },
  directives: {
    loading
  }
}
