import KCheckbox from "karma-ui/packages/checkbox/checkbox"
import KIcon from "karma-ui/packages/icon/icon"
import KTransition from "karma-ui/packages/transition/transition"
import KTreeList from "./treeList"
import getAllParent from "karma-ui/util/getAllParent"
import props from "./props"
export default {
  components: { KCheckbox, KIcon, KTransition, KTreeList },
  props: {
    ...props,
    item: Object,
    isLastOne: Boolean, //是不是数组中最后一条数据
    active: [Number, String], //当前选择的节点数据
    spread: Boolean, //
    scopedSlots: Object
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
    isSelected(item) {
      //console.log(item,this.selectedData)
      const set = new Set(this.tree.checkedKeys.map(t => t + ""))
      const v = item[this.keyField] + ""
      return set.has(v)
    },
    cancelChecked(data, set, rule = "some") {
      //data是当前数据及其所有父级，set是selectedKeys
      //如果data只有1，则代表只选择了顶级一层的数据
      const { keyField, childField } = this
      if (data.length === 1) {
        const v = data[0][keyField] + ""
        set.delete(v)
      } else {
        function deleteFromSet(data, set) {
          let len = data.length,
            i = len - 1
          do {
            if (i === len - 1) {
              set.delete(data[i][keyField] + "")
            } else {
              //搜集所有同级，判断是否有一个被选中
              let has = false
              if (rule === "every") {
                has = true
              }
              for (
                let j = 0, jlen = data[i][childField].length;
                j < jlen;
                j++
              ) {
                const c = data[i][childField][j]
                if (rule === "some") {
                  if (set.has(c[keyField] + "")) {
                    has = true
                    break
                  }
                } else if (rule === "every") {
                  if (!set.has(c[keyField] + "")) {
                    has = false
                    break
                  }
                }
              }
              if (has) {
                break
              } else {
                deleteFromSet(data.slice(0, -1), set)
              }
            }
            i = i - 1
          } while (i >= 0)
        }
        deleteFromSet(data, set)
      }
      return set
    },
    selectParent(item, checked) {
      const { keyField, childField, selectedRule } = this
      let set = new Set(this.tree.checkedKeys.map(k => k + ""))

      if (selectedRule === "some" || selectedRule === "every") {
        //将此节点及父级相关的节点push到selectedData
        let arr = getAllParent(
          this.tree.sourceData,
          item[keyField],
          keyField,
          childField
        )
        let checkedData = this.tree.checkedData
        // console.log(arr)
        let vals = []
        arr.forEach(el => {
          vals.push(el[keyField] + "")
        })

        if (checked) {
          //只要有一个子级被选中，则父级就被选中
          if (selectedRule === "some") {
            vals.forEach(k => {
              set.add(k)
            })
            //只有所有的子级都被选中，父级才会被选中
          } else if (selectedRule === "every") {
            //arr长度是1时代表只选择了一个根节点数据，此时不用向上找父级了
            if (arr.length === 1) {
              set.add(vals[0])
            } else {
              function everySelect(arr, set) {
                let len = arr.length,
                  i = len - 1
                do {
                  if (i === len - 1) {
                    set.add(arr[i][keyField] + "")
                  } else {
                    const childs = arr[i][childField]
                    if (childs && childs.length) {
                      let has = true
                      for (let j = 0; j < childs.length; j++) {
                        const item = childs[j]
                        if (!set.has(item[keyField] + "")) {
                          has = false
                          break
                        }
                      }
                      if (has) {
                        everySelect(arr.slice(0, -1), set)
                      } else {
                        break
                      }
                    }
                  }
                  i = i - 1
                } while (i >= 0)
              }
              everySelect(arr, set)
            }
          }
        } else {
          if (selectedRule === "some") {
            //取消选中此项，
            //并判断同级有没有被选中，如果所有同级都没有被选中，则父级取消选中
            set = this.cancelChecked(arr, set)
          } else if (selectedRule === "every") {
            //如果有一个没有被选中，则父级取消选中
            set = this.cancelChecked(arr, set, "every")
          }
        }
        this.tree.checkedKeys = [...set]
      } else {
        if (checked) {
          set.add(item[keyField])
        } else {
          set.delete(item[keyField])
        }
        this.tree.checkedKeys = [...set]
      }
    },
    selectChilds(item, checked) {
      const { keyField, childField, selectedRule } = this

      let set = new Set(this.tree.checkedKeys.map(t => t + ""))
      if (selectedRule === "some" || selectedRule === "every") {
        function selectChildren(data, set, type = "add") {
          data.forEach(el => {
            set[type](el[keyField] + "")
            if (el[childField] && el[childField].length) {
              selectChildren(el[childField], set, type)
            }
          })
        }
        if (item[childField] && item[childField].length) {
          if (checked) {
            selectChildren(item[childField], set)
          } else {
            selectChildren(item[childField], set, "delete")
          }
        }
      } else {
        if (checked) {
          set.add(item[keyField])
        } else {
          set.delete(item[keyField])
        }
      }
      this.tree.checkedKeys = [...set]
    },
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
            if(this.tree.currentValue === item[keyField]) {
              //用在selectTree组件中，
              //当搜索匹配后，再次点击的确认事件
              this.tree.$emit('reconfirm')
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
              this.selectChilds(item, checked)
              //选中、取消选中父级所有节点
              this.selectParent(item, checked)
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
        {this.renderIconWrapper()}
        {this.renderText(this.item)}
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
