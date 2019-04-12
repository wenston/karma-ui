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
    spread: Boolean //
  },
  data() {
    return {
      open: this.spread
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
      const { keyField, childField } = this
      //将此节点及父级相关的节点push到selectedData
      let arr = getAllParent(
        this.tree.sourceData,
        item[keyField],
        keyField,
        childField
      )
      let set = new Set(this.tree.checkedKeys.map(k => k + ""))
      let checkedData = this.tree.checkedData
      // console.log(arr)
      let vals = []
      arr.forEach(el => {
        vals.push(el[keyField] + "")
      })

      if (checked) {
        //只要有一个子级被选中，则父级就被选中
        if (this.selectedRule === "some") {
          vals.forEach(k => {
            set.add(k)
          })
          //只有所有的子级都被选中，父级才会被选中
        } else if (this.selectedRule === "every") {
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
        if (this.selectedRule === "some") {
          //取消选中此项，
          //并判断同级有没有被选中，如果所有同级都没有被选中，则父级取消选中
          set = this.cancelChecked(arr, set)
        } else if (this.selectedRule === "every") {
          //如果有一个没有被选中，则父级取消选中
          set = this.cancelChecked(arr, set, "every")
        }
      }
      this.tree.checkedKeys = [...set]
      // this.$emit('')
      // console.log(this.tree.checkedKeys)
    },
    selectChilds(item, checked) {
      const { keyField, childField } = this

      let set = new Set(this.tree.checkedKeys.map(t => t + ""))
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
            this.tree.currentValue = item[keyField]
          }
        }
      }
      const text = <span {...p}>{item[textField]}</span>
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
              this.tree.$emit('select',checked,this.tree.toPure(item))
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
    }
  },
  watch: {
    spread(v) {
      this.open = v
    },
    open(v) {
      this.$emit("update:spread", v)
    }
  },
  render() {
    const childData = this.item[this.childField]
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
              this.tree.$emit("expand", this.open, this.tree.toPure(this.item))
            }
          }}
        >
          {childData.length ? icon : this.leafIcon()}
        </span>
        {this.renderText(this.item)}
        <k-transition onAfter-transition={()=>{
          this.tree.$emit('after-transition')
        }}>
          <KTreeList {...child} />
        </k-transition>
      </div>
    )
    return item
  }
}
