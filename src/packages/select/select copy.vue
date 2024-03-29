<script>
import { offset, getStyle, scrollIntoViewIfNeed } from "karma-ui/util/dom"
import KInput from "karma-ui/packages/input/input.jsx.vue"
import esc from "karma-ui/util/esc.js"
import { layer } from "karma-ui/packages/layer/index"
import KIcon from "karma-ui/packages/icon/icon"
// todo:数据异步加载，即：点击的时候再加载数据
export default {
  name: "KSelect",
  components: {
    KInput,
    KIcon
  },
  model: {
    prop: "modelKey",
    event: "modelKeyChange"
  },
  props: {
    size: {
      type:String,
      default: 'medium'
    },
    value: {
      type: [Number, String, Boolean],
      default: void 0
    },
    modelKey: {
      type: [Number, String],
      default: void 0
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    styles: Object,
    noStyle: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    simple: Boolean,
    block: Boolean,
    icon: {
      type: Array,
      default: () => ["k-icon-arrow-down", "k-icon-close-circle"]
    },
    scrollElement: {
      type: Element,
      default: null
    },
    nearby: Boolean,
    layerWidth: {
      type: [Boolean, String],
      default: false
    },
    layerMinWidthEqual: Boolean
  },
  data() {
    return {
      modelValue: "",
      showOptionList: false,
      showDelete: false,
      //optionWrapper实例及里边包含的option列表实例
      ins: null,
      options: [], //收集本组件下属的所有option组件
      optionCompName: "",
      isMouseDownOption: false
    }
  },
  computed: {
    ifOptionList() {
      return this.showOptionList && this.$slots.default
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    focusAndScrollIntoView() {
      this.$el.scrollIntoView({ behavior: "smooth" })
      this.$refs.input.focus()
      this.toggleList()
    },
    clear() {
      this._change({}, false, true)
      this.showDelete = false
    },
    showDeleteBtn() {
      if (
        this.clearable &&
        this.modelKey !== "" &&
        this.modelKey !== undefined
      ) {
        this.showDelete = true
      }
    },
    hideDeleteBtn() {
      if (
        this.clearable &&
        this.modelKey !== "" &&
        this.modelKey !== undefined
      ) {
        this.showDelete = false
      }
    },
    toggleList() {
      if (!this.disabled) {
        this.showOptionList = !this.showOptionList
      }
    },
    showList() {
      if (!this.disabled) {
        this.showOptionList = true
      }
    },
    hideList() {
      if (!this.disabled) {
        this.showOptionList = false
        // this.$refs.input.blur()
      }
    },
    _change(obj, hide, isFocus) {
      this.modelValue = obj.v
      isFocus && this.$refs.input.focus()
      this.$emit("modelKeyChange", obj.k)
      this.$emit("change", obj)
      hide && this.hideList()
    },
    rIcon() {
      if (this.showDelete && this.clearable) {
        return (
          <span
            class="k-select__icon__wrapper"
            slot="append"
            onClick={e => {
              this.clear()
              e.stopPropagation()
            }}
          >
            <k-icon
              size="12"
              class="k-select__clear"
              name={this.icon[1] || "k-icon-close-circle"}
            />
          </span>
        )
      } else {
        return (
          <span
            class="k-select__icon__wrapper"
            slot="append"
            onClick={e => {
              this.$refs.input.focus()
              this.toggleList()
              e.stopPropagation()
            }}
          >
            <k-icon
              size="12"
              class={{
                "k-select__down": true,
                "k-select__down--up": this.ifOptionList
              }}
              name={this.icon[0] || "k-icon-arrow-down"}
            />
          </span>
        )
      }
    },
    //实例化option列表
    initIns() {
      this.$nextTick(() => {
        this.ins.init(this, this.$slots.default, {
          bodyClassName: "k-select__list",
          tag: "div",
          bodyTag: "ul",
          width: this.layerWidth,
          layerMinWidthEqual: this.layerMinWidthEqual,
          canCloseByClickoutside: true,
          scrollElement: this.scrollElement,
          nearby: this.nearby
        })
      })
    },
    scrollIntoViewIfNeed(index) {
      let i = 0
      if (typeof index === "number") {
        i = index
      } else {
        i = this.getSelectedOptionIndex()
        if (i === -1) {
          i = 0
        }
      }
      scrollIntoViewIfNeed(this.options[i].$el, this.ins.$refs.body)
    },
    getSelectedOptionIndex() {
      let i = -1
      this.options.forEach((op, idx) => {
        if (op.selected) {
          i = idx
        }
      })
      return i
    },
    handleKeyup(e) {
      const code = e.keyCode
      if (code != 40 && code != 38 && code != 13) {
        return
      }
      let i = this.getSelectedOptionIndex()
      if (code == 38) {
        i -= 1
        if (i < 0) {
          i = this.options.length - 1
        }
      } else if (code == 40) {
        if (!this.showOptionList) {
          return
        }
        i += 1
        if (i >= this.options.length) {
          i = 0
        }
      } else if (code == 13) {
        this.hideList()
      }
      if (!this.options[i]) {
        return
      }
      this._change(
        { k: this.options[i].value, v: this.options[i].label },
        false,
        true
      )
      this.scrollIntoViewIfNeed(i)

      e.preventDefault()
    },
    handleKeydown(e) {
      const code = e.keyCode
      if (code == 13 || code == 40 || code == 38) e.preventDefault()
    },
    addUpDownEvent() {
      document.addEventListener("keyup", this.handleKeyup)
      document.addEventListener("keydown", this.handleKeydown)
    },
    removeUpDownEvent() {
      document.removeEventListener("keyup", this.handleKeyup)
      document.removeEventListener("keydown", this.handleKeydown)
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
    }
  },
  beforeDestroy() {
    this.ins.destroy()
  },
  updated() {
    this.initIns()
  },
  mounted() {
    this.$nextTick(() => {
      if (this.nearby) {
        this.ins = layer(this.$el.parentNode)
      } else {
        this.ins = layer()
      }
      this.initIns()
      this.ins.$on("layer-inited", () => {
        this.$emit("getLayerElement", this.ins)
      })
      this.ins.$on("after-hide", () => {
        this.hideList()
      })
      this.ins.$on("mousedown", () => {
        this.isMouseDownOption = true
      })
      this.ins.$on("mouseout", () => {
        this.isMouseDownOption = false
      })
    })
  },
  created() {
    this.$on("getKeyValueFromOption", (k, v, hide, isFocus) => {
      // console.log(k,v)
      this._change({ k, v }, hide, isFocus)
    })
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
  },
  watch: {
    modelKey(n) {
      if (n === undefined || n === "") {
        this._change({})
      }
    },
    ifOptionList(val) {
      if (val) {
        //获取到所有option组件
        this.getAllOptionsComponent()
        //展示下拉列表并定位到选中的元素
        this.ins.show(this.scrollIntoViewIfNeed)
        //绑定键盘上下键操作
        this.addUpDownEvent()
      } else {
        this.ins.hide()
        this.removeUpDownEvent()
      }
    }
  },
  directives: {
    // clickoutside,
    esc
  },
  render() {
    const inputProps = {
      directives: [
        {
          name: "esc",
          value: this.hideList
        }
      ],
      ref: "input",
      class: {
        "k-select": true,
        "k-select-events-none": !(this.showDelete && this.clearable),
        "k-select__active": this.ifOptionList
      },
      props: {
        placeholder: this.placeholder,
        readonly: true,
        size: this.size,
        value: this.modelValue,
        disabled: this.disabled,
        simple: this.simple,
        block: this.block,
        noStyle: this.noStyle
      },
      on: {
        focus: e => {
          // this.showList()
          this.$emit("focus", e)
          e.stopPropagation()
        },
        blur: e => {
          //失去焦点的时候，如果鼠标还在列表中呈现mousedown状态，则不隐藏
          if (!this.isMouseDownOption) {
            this.hideList()
          }
          this.$emit('blur',e)
        },
        keyup:e=>{
          if(e.keyCode==40) {
            if(!this.showOptionList) {
              this.toggleList()
              e.stopPropagation()
            }
          }
        }
      },
      nativeOn: {
        click: this.toggleList,
        mouseover: this.showDeleteBtn,
        mouseout: this.hideDeleteBtn
      },
      style: this.styles
    }
    return <k-input {...inputProps}>{this.rIcon()}</k-input>
  }
}
</script>
