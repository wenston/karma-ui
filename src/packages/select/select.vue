<script>
import { offset } from "karma-ui/util/dom"
import KInput from "karma-ui/packages/input/input.jsx.vue"
// import clickoutside from "karma-ui/util/clickoutside.js"
import esc from "karma-ui/util/esc.js"
import { layer } from "karma-ui/packages/layer/index"
import KIcon from "karma-ui/packages/icon/icon"
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
    size: String,
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
    disabled: Boolean,
    clearable: Boolean,
    simple: Boolean,
    block: Boolean
  },
  data() {
    return {
      modelValue: "",
      showOptionList: false,
      showDelete: false,
      //optionWrapper实例及里边包含的option列表实例
      ins: layer(),
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
    focusAndScrollIntoView() {
      this.$el.scrollIntoView({behavior: 'smooth'})
      this.$refs.input.focus()
    },
    clear() {
      this._change({})
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
    showList() {
      if (!this.disabled) {
        this.showOptionList = true
      }
    },
    hideList() {
      if (!this.disabled) {
        this.showOptionList = false
        this.$refs.input.blur()
      }
    },
    _change(obj, hide) {
      this.modelValue = obj.v
      this.$emit("modelKeyChange", obj.k)
      this.$emit("change", obj)
      hide && this.hideList()
    },
    rIcon() {
      if (this.showDelete && this.clearable) {
        return (
          <span
            slot="append"
            onClick={e => {
              this.clear()
              e.stopPropagation()
            }}
          >
            <k-icon size="14" class="k-select__clear" name="k-icon-close" />
          </span>
        )
      } else {
        return (
          <span slot="append">
            <k-icon
              size="14"
              class={{
                "k-select__down": true,
                "k-select__down--up": this.ifOptionList
              }}
              name="k-icon-arrow-down"
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
          bodyTag: 'ul'
        })
      })
    },
    scrollIntoView(index) {
      let i = 0
      if (typeof index === "number") {
        i = index
      } else {
        i = this.getSelectedOptionIndex()
        if (i === -1) {
          i = 0
        }
      }
      this.ins.$refs.body.scrollTop = offset(
        this.options[i].$el,
        this.ins.$refs.body
      ).top
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
        //下
        i += 1
        if (i >= this.options.length) {
          i = 0
        }
      } else if (code == 13) {
        this.hideList()
      }
      this._change(
        { k: this.options[i].value, v: this.options[i].label },
        false
      )
      this.scrollIntoView(i)

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
  destroyed() {
    this.ins.destroy()
  },
  updated() {
    this.initIns()
  },
  mounted() {
    this.initIns()
  },
  created() {
    this.$on("getKeyValueFromOption", (k, v, hide) => {
      this._change({ k, v }, hide)
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
        this.ins.show(this.scrollIntoView)
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
        // {
        //   name: "clickoutside",
        //   value: this.hideList
        // },
        {
          name: "esc",
          value: this.hideList
        }
      ],
      ref: "input",
      class: {
        "k-select__active": this.ifOptionList
      },
      props: {
        placeholder: this.placeholder,
        readonly: true,
        size: this.size,
        value: this.modelValue,
        disabled: this.disabled,
        simple: this.simple,
        block: this.block
      },
      on: {
        focus: e => {
          this.showList()
        },
        blur: () => {
          //失去焦点的时候，如果鼠标还在列表中呈现mousedown状态，则不隐藏
          if (!this.isMouseDownOption) {
            this.hideList()
          }
        }
      },
      nativeOn: {
        click: this.showList,
        mouseover: this.showDeleteBtn,
        mouseout: this.hideDeleteBtn
      },
      style: this.styles
    }
    return <k-input {...inputProps}>{this.rIcon()}</k-input>
  }
}
</script>
