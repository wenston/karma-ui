import { offset } from "karma-ui/util/dom"
import { debounce } from "karma-ui/util/throttle_debounce"
import { layer } from "karma-ui/packages/layer/index"
import KInput from "karma-ui/packages/input/input.jsx.vue"
import KOption from "karma-ui/packages/option/option"
import esc from "karma-ui/util/esc.js"
import loading from "karma-ui/directives/loading/index"
export default {
  name: "KAutoComplete",
  components: {
    KInput,
    KOption
  },
  props: {
    ...KInput.props,
    clearable: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => []
    },
    //弹层的宽度，有值的话，就用那个设置的值，如果设置了空字符串或者false，表示和
    //输入框等宽
    layerWidth: {
      type: [String, Boolean],
      default: "auto"
    },
    //弹层的高度
    layerHeight: {
      type: String,
      default: "auto"
    },
    //keyfield用来向后台提交的字段名(对应的数据)
    keyField: {
      type: String,
      default: "Id"
    },
    //展示的那个字段名(对应的数据)
    valueField: {
      type: String,
      default: "Name"
    },
    //模糊匹配需要搜索的字段
    searchField: {
      type: [String, Array],
      default: "Name"
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  data() {
    return {
      //layer实例
      ins: null,
      //提交数据用的，可能是id或者proid等等
      val: this.value,
      //展示在输入框的那个文本
      inputText: this.text,
      optionCompName: "",
      isMouseDownOption: false,
      //选中的那个数据的index
      currentIndex: -1,
      currentHoverIndex: -1,
      //filterData
      filterData: JSON.parse(JSON.stringify(this.data)),
      options: [], //收集本组件下属的所有option组件
      optionCompName: "",
      //控制延迟加载的转圈图形显示
      loading: false
    }
  },
  watch: {
    // val(v) {
    //   this.$emit("valueChange", v)
    // },
    data(d) {
      if (d && d.length) {
        this.getInputTextByKeyField()
        this.filterData = JSON.parse(JSON.stringify(d))
        if (document.activeElement == this.$refs.input.getInputElement())
          this.showList()
      }
    },
    value: {
      immediate: true,
      handler(v) {
        if (v) {
          this.getInputTextByKeyField()
        }
      }
    }
  },
  methods: {
    handleKeyup(e) {
      const code = e.keyCode
      if (code != 40 && code != 38 && code != 13) {
        return
      }
      let i = this.currentHoverIndex
      const len = this.filterData.length
      if (code == 40) {
        //下
        i += 1
        if (i >= len) {
          i = 0
        }
      } else if (code == 38) {
        i -= 1
        if (i < 0) {
          i = len - 1
        }
      } else if (code == 13) {
        if (this.filterData.length) {
          this.currentIndex =
            this.currentHoverIndex == -1 ? 0 : this.currentHoverIndex
          this.$emit(
            "valueChange",
            this.filterData[this.currentIndex][this.keyField]
          )
          this.$emit("toggle", {
            row: this.filterData[this.currentIndex],
            index: this.currentIndex
          })
          this.$refs.input.blur()
          this.ins.hide()
        }
        return
      }
      this.currentHoverIndex = i
      // console.log(i)
      this.scrollIntoView(i)
      this.$forceUpdate()
    },
    //
    getInputTextByKeyField() {
      let text = ""
      if (this.data && this.data.length && this.keyField) {
        for (let i = 0, len = this.data.length; i < len; i++) {
          let item = this.data[i]
          if (item[this.keyField] == this.value) {
            text = item[this.valueField]
            this.currentIndex = i
            this.currentHoverIndex = i
            break
          }
        }
      }
      this.inputText = text
    },
    //根据inputText获取keyField对应的值
    getValueByInputText() {
      let v = ""
      //将用户输入，转化成关键字数组，以逐个匹配
      const arrText = this.inputText.toLowerCase().split(/\s+/)
      if (
        this.data &&
        this.data.length &&
        this.inputText !== "" &&
        this.inputText !== undefined &&
        this.keyField
      ) {
        if (Array.isArray(this.searchField)) {
        } else if (typeof this.searchField === "string") {
        }
      }
    },
    getFilterData() {
      if (this.inputText.trim() !== "") {
        debounce(150).then(() => {
          //将用户输入，转化成关键字数组，以逐个匹配
          const arrText = this.inputText.toLowerCase().split(/\s+/)
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
          let arr = []
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
          this.filterData = arr
          if (arr.length === 0) {
            this.ins.hide()
          } else {
            this.showList(this.scrollIntoView)
          }
          this.$forceUpdate()
        })
      } else {
        this.filterData = this.data
        if (document.activeElement == this.$refs.input.getInputElement()) {
          this.showList(this.scrollIntoView)
        }
      }
    },
    showList(fn) {
      this.ins && this.ins.show(fn)
    },
    hideList() {
      if (!this.disabled) {
        if (this.ins) {
          this.ins.hide()
          this.$refs.input.blur()
        }
      }
    },
    scrollIntoView(index) {
      let i = 0
      if (typeof index === "number") {
        i = index
      } else {
        this.filterData.forEach((el, index) => {
          if (el[this.keyField] == this.value) {
            i = index
          }
        })
      }
      this.getAllOptionsComponent()
      if (this.options.length) {
        this.ins.$refs.body.scrollTop = offset(
          this.options[i].$el,
          this.ins.$refs.body
        ).top
      }
    },
    getAllOptionsComponent() {
      let arr = []
      const fn = Comp => {
        Comp.$children.forEach(child => {
          if (child.$options.name === this.optionCompName) {
            arr.push(child)
          } else {
            fn(child)
          }
        })
      }
      fn(this.ins)
      this.options = arr
    },
    inputProps() {
      return {
        directives: [
          {
            name: "esc",
            value: this.hideList
          }
        ],
        ref: "input",
        props: {
          ...this.$props,
          value: this.inputText
        },
        on: {
          ...this.$listeners,
          focus: e => {
            this.$refs.input.onSelect()
            //如果还没有实例化，则先实例化
            if (!this.ins) {
              this.ins = layer()
              this.init()
            }
            //如果没有筛选出来的数据，就不显示列表
            if (this.filterData.length !== 0) {
              this.showList(() => {
                this.scrollIntoView()
                this.currentHoverIndex = this.currentIndex
                this.$forceUpdate()
              })
              //如果数据源本身就没有，此时可能是正在延迟加载数据中
            } else if (this.data.length === 0) {
              //提示加载中
              this.loading = true
              const loadingProps = {
                directives: [
                  {
                    name: "loading",
                    value: {
                      loading: this.loading,
                      content: "数据获取中..."
                    }
                  }
                ],
                style: {
                  minHeight: "200px"
                }
              }
              this.$slots.default = <div {...loadingProps} />
              this.showList()
              this.$forceUpdate()
            }

            this.$emit("focus", e)
          },
          blur: () => {
            if (!this.isMouseDownOption) {
              this.hideList()
            }
          },
          // input: () => {
          //
          // },
          keyup: e => {
            this.handleKeyup(e)
          },
          keydown: e => {
            //阻止光标乱跑。在keyup中阻止不了
            // e.preventDefault()
          },
          valueChange: v => {
            this.inputText = v
            this.currentIndex = this.currentHoverIndex = -1
            if (v.trim() === "") {
              this.$emit("valueChange", "")
              this.$emit("toggle", { row: undefined, index: undefined })
            }
            this.getFilterData()
          }
        }
      }
    },
    init() {
      this.ins &&
        this.$nextTick(() => {
          const {
            layerWidth,
            layerHeight,
            filterData,
            $slots,
            $scopedSlots
          } = this
          const slotsDefault =
            $slots.default ||
            filterData.map((item, index) => {
              const optionProps = {
                class: {
                  "k-option--hover": index == this.currentHoverIndex
                },
                props: {
                  tag: "div",
                  selected: item[this.keyField] == this.value
                },
                on: {
                  click: e => {
                    this.currentIndex = index
                    this.$emit("valueChange", item[this.keyField])
                    this.$emit("toggle", { row: item, index })
                    this.ins.hide()
                  }
                }
              }
              return (
                <k-option {...optionProps}>
                  {$scopedSlots.default({
                    row: item,
                    index
                  })}
                </k-option>
              )
            })
          const slotsHeader = $slots.header
          const slotsFooter = $slots.footer
          let arrClassName = ["k-auto-complete"]
          if (slotsHeader) {
            arrClassName.push("k-auto-complete-has-header")
          }
          if (slotsFooter) {
            arrClassName.push("k-auto-complete-has-footer")
          }
          this.ins.init(
            this,
            {
              //列表的插槽内容
              default: slotsDefault,
              //列表头部的内容
              header: slotsHeader,
              //列表底部的内容
              footer: slotsFooter
            },
            {
              //弹框标签类型
              tag: "div",
              //弹框列表头部标签类型
              headerTag: "div",
              //弹框列表底部标签类型
              footerTag: "div",
              //列表class
              bodyClassName: arrClassName.join(" "),
              //弹框列表头部class
              headerClassName: "k-auto-complete-header",
              footerClassName: "k-auto-complete-footer",

              //弹框宽。如果不指定宽，则宽度和输入框一致
              width: layerWidth,
              //高度暂时没有设置。TODO
              height: layerHeight
            }
          )
        })
    }
  },
  directives: {
    esc,
    loading
  },
  render() {
    const inputProps = this.inputProps()
    return <k-input {...inputProps} />
  },
  destroyed() {
    this.ins && this.ins.destroy()
  },
  mounted() {
    if (!this.lazy) {
      if (!this.ins) {
        this.ins = layer()
        this.init()
      }
    }
  },
  updated() {
    this.init()
  },
  created() {
    this.$on("getOptionComponentName", name => {
      this.optionCompName = name
    })

    this.$on("inovering", isMouseDownOption => {
      this.isMouseDownOption = isMouseDownOption
      //如果鼠标离开列表，且当前焦点不是此组件的input，则隐藏列表
      if (!isMouseDownOption) {
        if (document.activeElement != this.$refs.input.getInputElement()) {
          this.hideList()
        }
      }
    })
  }
}
