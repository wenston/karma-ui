import { scrollIntoViewIfNeed } from "karma-ui/util/dom"
import KDropdown from "karma-ui/packages/dropdown/dropdown"
import KTree from "karma-ui/packages/tree/tree"
import KIcon from "karma-ui/packages/icon/icon"
import loading from "karma-ui/directives/loading/index"
import ScrollBar from "karma-ui/packages/scrollbar/Scrollbar"
//TODO: 需增加clearable
export default {
  name: "KSelectTree",
  components: {
    KDropdown,
    KTree,
    KIcon
  },
  //根据hasCheckbox判断是否是多选
  props: {
    ...KTree.props,
    show: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择分类"
    },
    block: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    },
    clearable: Boolean,
    //textField对应的值，text参数的作用是在树形数据懒加载时用的。因为懒加载
    //数据是空的，所以找不到对应的名字，故需要在组件外部事先给出来
    text: [String, Number],
    hasActions: {
      type: Boolean,
      default: true
    },
    lazyTree: Boolean,
    lazyLayer: {
      type: Boolean,
      default: true
    },
    nearBy:Boolean,
    whiteList: Array
  },
  data() {
    return {
      visible: this.show,
      checkedData: this.selectedData,
      checkedKeys: this.selectedKeys.join(","),
      list: [],
      currentVal: this.value,
      currentText: this.text, //currentVal对应的具体值
      isSearching: false,
      layerElem: null
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
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
      if (this.hasCheckbox) {
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
      } else {
        return <div class="k-select-tree-checked-one">{this.currentText}</div>
      }
    },
    title() {
      let icon = null
      if (
        (this.checkedData && this.checkedData.length) ||
        (this.clearable &&
          this.currentVal !== "" &&
          this.currentVal !== undefined)
      ) {
        icon = (
          <k-icon
            class="k-select-tree-clear"
            name="k-icon-close"
            tabindex="-1"
            onFocus={e => {
              e.stopPropagation()
            }}
            onClick={e => {
              if (this.checkedData && this.checkedData.length) {
                this.checkedKeys = ""
              } else if (
                this.currentVal !== "" &&
                this.currentVal !== undefined &&
                this.clearable
              ) {
                this.currentVal = ""
                this.currentText = ""
              }
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
            ["k-select-tree--block"]: this.block,
            ["k-select-tree--simple"]: this.simple
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
    scrollIntoView() {
      //滚动到可视区内
      this.$nextTick(() => {
        const bodyElem = this.layerElem.querySelector(".k-select-tree-body")
        const el = bodyElem.querySelector(
          `[data-tree-key="${this.currentVal}"]`
        )
        if (el && bodyElem) {
          scrollIntoViewIfNeed(el, bodyElem)
        }
      })
    },
    body() {
      const childField = this.childField,
        keyField = this.keyField,
        textField = this.textField
      let list = this.list
      let p = {
        ref: "tree",
        props: {
          ...this.$props,
          value: this.currentVal,
          selectedData: this.checkedData,
          lazy: this.lazyTree
        },
        on: {
          ...this.$listeners,
          searching: b => {
            this.isSearching = b
          },
          "after-transition": () => {
            this.scrollIntoView()
          },
          valueChange: v => {
            this.scrollIntoView()
            this.currentVal = v
            if (!this.hasCheckbox) {
              if (v !== "" && v !== undefined) {
                if (!this.isSearching) this.visible = false
              }
            }
          },
          reconfirm: () => {
            if (!this.hasCheckbox) this.visible = false
          },
          toggle: arr => {
            if (arr.length) {
              const item = arr[arr.length - 1]
              this.currentText = item[textField]
            }
            this.$emit("toggle", arr)
          },
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
        bodyClassName: "k-select-tree-body",
        lazyLayer: this.lazyLayer,
        nearBy:this.nearBy,
        whiteList: this.whiteList
      },
      on: {
        "update:show": v => {
          this.visible = v
        },
        getLayerElement: elem => {
          this.layerElem = elem
          this.$emit('getLayerElement',elem)
        }
      }
    }
    return <KDropdown {...p} />
  },
  watch: {
    text(t) {
      this.currentText = t
    },
    currentVal(v) {
      this.$emit("valueChange", v)
    },
    value(v) {
      this.currentVal = v
    },
    visible(v) {
      this.$emit("update:show", v)
      this.$nextTick(() => {
        if (this.$refs.tree) this.$refs.tree.onSelect()
      })
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
