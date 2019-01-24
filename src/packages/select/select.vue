<script>
import ZInput from "karma-ui/packages/input/input.jsx.vue"
import clickoutside from "karma-ui/util/clickoutside.js"
import esc from "karma-ui/util/esc.js"
import { optionWrapper } from "karma-ui/packages/option/index"

export default {
  name: "KSelect",
  components: {
    ZInput
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
    clearable: Boolean
  },
  data() {
    return {
      modelValue: "",
      showOptionList: false,
      showDelete: false,
      //optionWrapper实例及里边包含的option列表实例
      ins: optionWrapper(),
      options: [] //收集本组件下属的所有option组件
    }
  },
  computed: {
    ifOptionList() {
      return this.showOptionList && this.$slots.default
    }
  },
  methods: {
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
          <i
            class="k-icon-cancel k-select__clear"
            slot="append"
            onClick={e => {
              this.clear()
              e.stopPropagation()
            }}
          />
        )
      } else {
        return (
          <i
            slot="append"
            onClick={e => {
              this.clear()
              e.stopPropagation()
            }}
            class={{
              "k-icon-arrow_drop_down k-select__down": true,
              "k-select__down--up": this.ifOptionList
            }}
          />
        )
      }
    },
    //实例化option列表
    initIns() {
      this.$nextTick(() => {
        this.ins.init(this)
      })
    },
    getInputElement() {
      return this.$refs.input.getInputElement()
    },
    handleKeydown(e) {
      const code = e.keyCode
      if (code != 40 && code != 38 && code != 13) {
        return
      }
      let i = -1
      this.options.forEach((op, idx) => {
        if (op.selected) {
          i = idx
        }
      })
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

      e.preventDefault()
    },
    addUpDownEvent() {
      document.addEventListener("keydown", this.handleKeydown)
    },
    removeUpDownEvent() {
      document.removeEventListener("keydown", this.handleKeydown)
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
    this.$on("getAllOptionComp", option => {
      this.options.push(option)
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
        this.ins.show()
        this.addUpDownEvent()
      } else {
        this.ins.hide()
        this.removeUpDownEvent()
      }
    }
  },
  directives: {
    clickoutside,
    esc
  },
  render() {
    const p = {
      directives: [
        {
          name: "clickoutside",
          value: this.hideList
        },
        {
          name: "esc",
          value: this.hideList
        }
      ],
      on: {
        click: this.showList,
        mouseover: this.showDeleteBtn,
        mouseout: this.hideDeleteBtn
      },
      class: {
        "k-select": true
      }
    }
    const inputProps = {
      ref: "input",
      class: {
        "k-select__active": this.ifOptionList
      },
      props: {
        placeholder: this.placeholder,
        readonly: true,
        size: this.size,
        value: this.modelValue,
        disabled: this.disabled
      },
      on: {
        focus: () => {
          this.showList()
        },
        blur: () => {
          this.hideList()
        }
      },
      style: this.styles
    }
    return (
      <div {...p}>
        <z-input {...inputProps}>{this.rIcon()}</z-input>
      </div>
    )
  }
}
</script>
