import KCheckbox from "karma-ui/packages/checkbox/checkbox"
import KIcon from "karma-ui/packages/icon/icon"
import KTransition from "karma-ui/packages/transition/transition"
import KTreeList from "./treeList"
import { selectChilds, selectParent } from "./_util"
import props from "./props"
export default {
  components: { KCheckbox, KIcon, KTransition, KTreeList },
  props: {
    ...props,
    item: Object,
    isLastOne: Boolean, //是不是数组中最后一条数据
    active: [Number, String], //当前选择的节点数据
    spread: Boolean, //
    scopedSlots: Object,
    canck: {
      type: Boolean,
      default: undefined
    }
  },
  data() {
    return {
      open: this.spread,
      //是否处于加载下一级数据之中
      loading: false
    }
  },
  inject: ["tree"],
  methods: {
    canCheck(item) {
      if(this.checkable) {
        return this.checkable(item)
      }
      return true
    },
    isSelected(item) {
      //console.log(item,this.selectedData)
      const set = new Set(this.tree.checkedKeys.map(t => t + ""))
      const v = item[this.keyField] + ""
      return set.has(v)
    },
    leafIcon() {
      const icon = this.icon[2]
      if (icon) return <k-icon class="k-tree-icon-leaf" name={icon} />
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
    loadingIcon() {
      const p = {
        props: {
          name: "k-icon-loading"
        },
        class: "k-loading__icon k-tree-icon"
      }
      return <k-icon {...p} />
    },
    renderText(item) {
      const { textField, keyField, active, hasCheckbox } = this
      const p = {
        attrs: {
          "data-tree-key": item[keyField] //为了查找dom
        },
        class: [
          "k-tree-text",
          {
            "k-tree-text--active": active == item[keyField]
          }
        ],
        on: {
          click: () => {
            // 暂时用不到这种方式
            // this.$emit("toggle", item)
            this.tree.isSearching = false
            if (this.tree.currentValue === item[keyField]) {
              //用在selectTree组件中，
              //当搜索匹配后，再次点击的确认事件
              this.tree.$emit("reconfirm")
            }
            this.tree.currentValue = item[keyField]
          }
        }
      }
      let text = null
      if (this.scopedSlots && this.scopedSlots.default) {
        text = (
          <span {...p}>
            {this.scopedSlots.default({
              item
            })}
          </span>
        )
      } else {
        text = <span {...p}>{item[textField]}</span>
      }
      if (hasCheckbox) {
        const checkProp = {
          class: "k-tree-checkbox",
          props: {
            checked: this.isSelected(item),
            value: item[keyField]
          },
          on: {
            checkedChange: checked => {
              //选中、取消选中子级所有节点
              // this.selectChilds(item, checked)
              this.tree.checkedKeys = selectChilds(
                item,
                this.tree.checkedKeys,
                checked,
                this.keyField,
                this.childField,
                this.selectedRule,
                this.checkable
              )
              //选中、取消选中父级所有节点
              // this.selectParent(item, checked)
              this.tree.checkedKeys = selectParent(
                this.tree.sourceData,
                item,
                this.tree.checkedKeys,
                checked,
                this.keyField,
                this.childField,
                this.selectedRule,
                this.checkable
              )
              //复选或者取消复选时，当前节点数据
              this.tree.$emit("select", checked, item)
              //选中、取消选中时，应向组件外抛出事件，把数据发送出去
              //发送的数据为扁平的数组
              //从tree组件将数组发出去
              //见tree组件中的createCheckedDataByCheckedKeys方法
            }
          },
          nativeOn: {
            click: e => {
              e.stopPropagation()
            }
          }
        }
        if(this.canck!==undefined) {
          checkProp.props.disabled=!this.canck
        }
        return [<k-checkbox {...checkProp} />, text]
      }
      return text
    },
    renderIconWrapper() {
      let icon = this.foldIcon()
      if (this.open) {
        icon = this.openIcon()
      } else {
        if (this.loading) {
          icon = this.loadingIcon()
        }
      }
      if (this.item[this.leafField]) {
        icon = this.leafIcon()
      }
      let p = {
        class: "k-tree-icon-wrapper"
      }
      if (!this.item[this.leafField]) {
        p.on = {
          click: e => {
            this.handleIconClick()
          }
        }
      }
      return <span {...p}>{icon}</span>
    },
    //点击图标后展开、折叠、加载的操作
    handleIconClick() {
      let item = this.item,
        childField = this.childField,
        childData = this.item[childField],
        leafField = this.leafField
      if (this.lazy) {
        if (!this.open) {
          if (!childData || childData.length === 0) {
            this.loading = true
            this.lazyLoad(item)
              .then(data => {
                if (data.length) {
                  data.forEach(el => {
                    el.__open__ = false
                  })
                  this.$set(this.item, childField, data)
                }
                this.$nextTick(() => {
                  this.open = true
                  this.tree.$emit("expand", this.open, item)
                })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
                console.warn("树形结构中的lazyLoad加载数据失败！")
              })
          } else {
            this.open = true
          }
        } else {
          this.open = false
        }
      } else {
        this.open = !this.open
        if (childData && childData.length) {
          this.tree.$emit("expand", this.open, item)
        }
      }
    }
  },
  watch: {
    spread(v) {
      this.open = v
    },
    open(v) {
      this.$emit("update:spread", v, this.$el)
    }
  },
  render() {
    const childField = this.childField
    const childData = this.item[childField]
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
    if(this.checkable) {
      child.props.canck = this.checkable(this.item) && this.canck
      // console.log(this.item.Name,child.props.canck)
    }
    const itemProps = {
      class: [
        "k-tree-item",
        {
          "k-tree-item--dotted": this.isLastOne && open
        }
      ]
    }
    return (
      <div {...itemProps}>
        <div class="k-tree-item-k">
          {this.renderIconWrapper()}
          {this.renderText(this.item)}
        </div>
        <k-transition
          onAfter-transition={() => {
            this.tree.$emit("after-transition")
          }}
        >
          <KTreeList {...child} />
        </k-transition>
      </div>
    )
  }
}
