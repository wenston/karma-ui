import { scrollIntoViewIfNeed } from "karma-ui/util/dom"
import KInput from "karma-ui/packages/input/input.jsx.vue"
import KButton from "karma-ui/packages/button/button.jsx"
import { layer } from "karma-ui/packages/layer/index"
import esc from "karma-ui/util/esc"
import KIcon from "karma-ui/packages/icon/icon"
import KOption from "karma-ui/packages/option/option"
import KCheckbox from "karma-ui/packages/checkbox/checkbox"
import ScrollBar from "karma-ui/packages/scrollbar/Scrollbar"
import loading from "karma-ui/directives/loading/index"
export default {
  name: "KSelect2",
  components: {
    KInput,
    KButton,
    KIcon,
    KOption,
    KCheckbox,
    ScrollBar
  },
  props: {
    //数据源，目前只支持Array类型
    data: [Array, Object],
    //多选的值，可以是数组、字符串（可以用逗号分隔）、单个数值
    value: [Array, String, Number],
    //选择基准关键字
    keyField: {
      type: String,
      default: "Id"
    },
    //描述，data中的字段名
    textField: {
      type:String,
      default: 'Name'
    },
    placeholder: String,
    searchPlaceholder: {
      type: String,
      default: "请输入关键字"
    },
    //模糊匹配需要搜索的字段
    searchField: {
      type: [String, Array],
      default: "Name"
    },
    block: Boolean,
    simple: Boolean,
    noStyle: Boolean,
    lazy: {
      type: Boolean,
      default: true
    },
    layerWidth: {
      type: [String, Boolean],
      default: "auto"
    },
    layerMinWidthEqual: Boolean,
    show: {
      type: Boolean,
      default: false
    },
    scrollElement: {
      type: Element,
      default: null
    },
    nearby: Boolean,
    footer: [Function, Array, Object, String, Number]
  },
  data() {
    let arr = []
    if (this.value) {
      arr = this.toArray(this.value)
    }
    return {
      //存储用户选择
      dataValue: arr,
      //下拉列表实例
      layerIns: null,
      //搜索关键字
      searchText: "",
      //记录状态：下拉列表是否可见
      visible: this.show,
      //全选
      isCheckedAll: false,
      //通过键盘上下箭头选择的当前数据行的index
      currentIndex: -1,
      disabledArr: []
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  computed: {
    filterData() {
      let arr = []
      if (this.searchText.trim() !== "") {
        //将用户输入，转化成关键字数组，以逐个匹配
        const arrText = this.searchText.toLowerCase().split(/\s+/)
        const arrField =
          typeof this.searchField === "string"
            ? [this.searchField]
            : Array.isArray(this.searchField)
              ? this.searchField
              : []
        if (arrField.length === 0) {
          console.warn(`${this.$options.name}是否没有传入searchField参数？`)
        }
        //搜索出来
        this.data.forEach(item => {
          let has = false
          arrField.forEach(field => {
            const fieldText = (item[field] + "").toLowerCase()
            arrText.forEach(text => {
              text = (text + "").trim()
              if (fieldText.indexOf(text) > -1) {
                has = true
              }
            })
          })
          if (has) {
            arr.push({ ...item })
          }
        })
      } else {
        arr = this.data
      }
      return arr
    }
  },
  methods: {
    setDisabled(arr) {
      this.disabledArr = arr
    },
    toArray(v) {
      let arr = []
      if (Array.isArray(v)) {
        arr = JSON.parse(JSON.stringify(v))
      } else if (typeof v === "string") {
        arr = v.split(/\s*,\s*/)
      } else if (typeof v === "number") {
        arr = [v + ""]
      }
      return arr
    },
    rBox() {
      const p = {
        ref: "boxInput",
        props: {
          active: this.visible,
          readonly: true,
          placeholder: this.dataValue.length ? "" : this.placeholder,
          block: true,
          simple: this.simple
        }
        // on: {
        //   focus: e => {
        //     this.showLayer()
        //   }
        // }
      }
      return <k-input {...p} />
    },
    //搜索匹配框、全选
    rSearchInput() {
      const p = {
        class: "k-select2-searchinput",
        props: {
          clearable: true,
          size: "small",
          placeholder: this.searchPlaceholder,
          block: true,
          value: this.searchText,
          simple: this.simple,
          autofocus: true
          // active: this.visible
        },
        ref: "searchInput",
        on: {
          valueChange: v => {
            this.currentIndex = -1
            this.searchText = v
          },
          input: e => { }
        }
      }
      return (
        <div>
          <k-input {...p}></k-input>
        </div>
      )
    },
    //数据列表
    rList() {
      const filterData = this.filterData
      if (filterData) {
        let list = []
        if (Array.isArray(filterData)) {
          list = filterData.map((item, index) => {
            const p = {
              ref: "filterDataList" + item[this.keyField],
              class: "k-select2-checkbox",
              props: {
                text: item[this.textField],
                value: item[this.keyField],
                checked: this.dataValue.some(id => id == item[this.keyField]),
                disabled: this.disabledArr.some(id => id == item[this.keyField])
              },
              on: {
                checkedChange: checked => {
                  let set = new Set(this.dataValue)
                  const v = item[this.keyField] + ""
                  if (checked) {
                    set.add(v)
                  } else {
                    set.delete(v)
                  }
                  this.dataValue = [...set]
                  this.emitValue()
                  // this.$forceUpdate()
                }
              }
            }
            const itemClass = {
              "k-select2-list-item": true,
              "k-select2-list-item-hover": this.currentIndex === index
            }
            return (
              <div class={itemClass}>
                <k-checkbox {...p} />
                {this.$scopedSlots.default
                  ? this.$scopedSlots.default({
                    row: item,
                    index
                  })
                  : null}
              </div>
            )
          })
        } else {
          for (let k in filterData) {
            // list.push(
            //   <div>
            //     <k-checkbox text={dataList[k]} />
            //   </div>
            // )
          }
        }
        const select2ListProp = {
          class: "k-select2-list",
          directives: [
            {
              name: "loading",
              value: {
                loading: this.data.length === 0
              }
            }
          ]
        }
        return <div {...select2ListProp}>{list}</div>
      }
    },
    //用户选择的数据名称列表
    rCheckedList() {
      const dataValue = this.dataValue
      const filterData = this.data
      const keyField = this.keyField
      const textField = this.textField
      let arr = []
      let list = null
      if (dataValue.length) {
        if (Array.isArray(filterData)) {
          filterData.forEach(item => {
            if (dataValue.some(el => el == item[keyField])) {
              arr.push(item)
            }
          })
        }
      }
      if (arr.length > 0) {
        list = arr.map(item => {
          return (
            <div class="k-select2-checked-item">
              <span class="k-select2-checked-name">{item[textField]}</span>
              <k-icon
                name="k-icon-close-circle"
                class="k-select2-checked-del"
                onClick={e => {
                  const k = item[keyField] + ""
                  const i = dataValue.indexOf(k)
                  this.dataValue.splice(i, 1)
                  this.emitValue()
                  e.stopPropagation()
                }}
              ></k-icon>
            </div>
          )
        })
        return (
          <ScrollBar speed={10} class="k-select2-checked-list">
            <div class="k-select2-checked-box">{list}</div>
          </ScrollBar>
        )
      }
    },
    rCheckedAll() {
      if(this.dataValue.length && this.dataValue.length === this.data.length) {
        this.isCheckedAll = true
      }
      const checkProps = {
        props: {
          checked: this.isCheckedAll,
          text: '全选'
        },
        on: {
          checkedChange: b => {
            if (b) {
              let set = new Set(this.dataValue)
              const filterData = this.filterData
              if (this.disabledArr.length) {
                filterData.forEach(el => {
                  if (this.disabledArr.indexOf(el[this.keyField]) < 0) {
                    set.add(el[this.keyField] + "")
                  }
                })
              } else {
                filterData.forEach(el => {
                  set.add(el[this.keyField] + "")
                })
              }
              this.dataValue = [...set]
            } else {
              this.dataValue = []
            }

            this.emitValue()
            // this.$forceUpdate()
          }
        }
      }
      return (
        <span class="k-select2-check-all">
          <k-checkbox {...checkProps} />
        </span>
      )
    },
    hideLayer() {
      this.visible = false
      if (this.layerIns) {
        this.layerIns.hide()
        this.removeUpdownEvent()
      }
    },
    showLayer() {
      const input = this.$refs.searchInput
      const showAndFocusAndBind = () => {
        this.layerIns.show(input && input.focus)
        input && input.focus()
        this.visible = true
        this.addUpdownEvent()
      }
      if(!this.layerIns) {
        this.initIns(showAndFocusAndBind)
      }else{
        showAndFocusAndBind()
      }
      
    },
    //实例化option列表
    initIns(callback) {
      this.$nextTick(() => {
        if (!this.layerIns) {
          this.createLayer()
        }
        const footer = <div class="k-select2-footer">{this.rCheckedAll()}
          {this.$slots.footer || this.footer}
        </div>
        this.layerIns.init(
          this,
          {
            header: this.rSearchInput(),
            default: this.rList(),
            footer
          },
          {
            width: this.layerWidth,
            layerMinWidthEqual: this.layerMinWidthEqual,
            canCloseByClickoutside: true,
            scrollElement: this.scrollElement,
            nearby: this.nearby
          }
        )
        if (callback) {
          callback()
        }
      })
    },
    isSame(v, ov) {
      if (!v || !ov) {
        return false
      }
      let arr = this.toArray(v)
      let oArr = this.toArray(ov)
      let str = arr.sort((x, y) => x - y).join(",")
      let oStr = oArr.sort((x, y) => x - y).join(",")
      return str === oStr
    },
    emitValue() {
      let v = JSON.parse(JSON.stringify(this.dataValue))
      if (Array.isArray(this.value)) {
        this.$emit("valueChange", v)
      } else if (typeof this.value === "string") {
        this.$emit("valueChange", v.filter(el => !!el).join(","))
      } else {
        this.$emit("valueChange", v)
      }
    },
    scrollIntoViewIfNeed(index) {
      const key = this.filterData[index][this.keyField]
      const currentEl = this.$refs["filterDataList" + key].$el
      if (currentEl) scrollIntoViewIfNeed(currentEl, this.layerIns.$refs.body)
    },
    handleKeydown(e) {
      const filterData = this.filterData
      const code = e.keyCode
      if (code != 40 && code != 38 && code != 13) {
        return
      }
      let index = this.currentIndex
      if (code == 38) {
        index -= 1
        if (index < 0) {
          index = filterData.length - 1
        }
      } else if (code == 40) {
        index += 1
        if (index > filterData.length - 1) {
          index = 0
        }
      } else {
        if (filterData.length === 0) {
          return
        }
        if (index < 0 && filterData.length > 0) {
          index = 0
        }
        //选择或者取消选择
        let set = new Set(this.dataValue)
        const item = filterData[index]
        let v = ""
        if (item) {
          v = item[this.keyField] + ""
          if (set.has(v)) {
            set.delete(v)
          } else {
            set.add(v)
          }
          this.dataValue = [...set]
          this.emitValue()
        }
      }
      this.currentIndex = index
      this.scrollIntoViewIfNeed(index)
      this.$forceUpdate()
    },
    addUpdownEvent() {
      document.addEventListener("keydown", this.handleKeydown)
    },
    removeUpdownEvent() {
      document.removeEventListener("keydown", this.handleKeydown)
    },
    canCheckAll() {
      this.$nextTick(() => {
        const d = this.filterData
        if (d && d.length) {
          //判断filterData里的所有keyField对应的值，是否都在dataValue里边
          let b = true,
            i = 0,
            len = d.length
          let set = new Set(this.dataValue)
          while (i < len) {
            const v = d[i][this.keyField] + ""
            if (!set.has(v)) {
              b = false
              break
            }
            i += 1
          }
          this.isCheckedAll = b
        } else {
          this.isCheckedAll = false
        }
        this.$forceUpdate()
      })
    },
    createLayer() {
      if (this.nearby) {
        this.layerIns = layer(this.$el.parentNode)
      } else {
        this.layerIns = layer()
      }
      //拦截由layer组件中关闭layer的情况
      this.layerIns.$on("after-hide", () => {
        this.visible = false
        this.removeUpdownEvent()
      })
    }
  },
  render() {
    const p = {
      directives: [
        {
          name: "esc",
          value: this.hideLayer
        }
      ],
      class: [
        "k-select2",
        { "k-block": this.block, "k-select2--nostyle": this.noStyle }
      ],
      on: {
        click: e => {
          // this.$refs.boxInput.focus()
          if (this.visible) {
            this.hideLayer()
          } else {
            this.showLayer()
          }
          e.stopPropagation()
        }
      }
    }
    return (
      <div {...p}>
        {this.rBox()}
        {this.rCheckedList()}
        {this.$slots.append ? (
          <div
            class="k-select2-append"
            onClick={e => {
              e.stopPropagation()
            }}
          >
            {this.$slots.append}
          </div>
        ) : null}
      </div>
    )
  },
  watch: {
    visible(v) {
      this.$emit("update:show", v)
      if (!v) {
        this.$emit("toggle", this.dataValue)
      }
    },
    show: {
      handler(v) {
        if (v) {
          this.showLayer()
        } else {
          this.hideLayer()
        }
      }
    },
    value(v, ov) {
      // console.log('value:',v,ov)
      if (!this.isSame(v, ov)) {
        if (Array.isArray(v)) {
          this.dataValue = JSON.parse(JSON.stringify(v))
        } else if (typeof v === "string") {
          this.dataValue = v.split(/\s*,\s*/)
        } else if (typeof v === "number") {
          this.dataValue = [v + ""]
        }
      }
    },
    filterData() {
      this.canCheckAll()
    },
    searchText() {
      this.canCheckAll()
    },
    dataValue() {
      this.canCheckAll()
    }
  },
  beforeDestroy() {
    if(this.layerIns)
    this.layerIns.destroy()
  },
  updated() {
    if(this.layerIns)
    this.initIns()
  },
  mounted() {
    // this.$nextTick(() => {
    if (!this.lazy) {
      this.initIns(() => {
        if (this.show) {
          this.showLayer()
        }
      })
    }
    // })
  },
  directives: {
    esc,
    loading
  }
}
