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
      ins: optionWrapper()
    }
  },
  computed: {
    ifOptionList() {
      return this.showOptionList && this.$slots.default
    }
  },
  methods: {
    hideIt(e) {
      if (!this.disabled) {
        this.showOptionList = false
      }
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
      if(!this.disabled) {
        this.showOptionList = true
      }
    },
    hideList() {
      if(!this.disabled) {
        this.showOptionList = false
      }
    },
    _change(obj) {
      this.modelValue = obj.v
      this.$emit("modelKeyChange", obj.k)
      this.$emit("change", obj)
      this.hideIt()
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
    rOptionList() {
      if(this.ifOptionList) {
        this.ins.show()
      }else{
        this.ins.hide()
      }
    },
    //实例化option列表
    initIns() {
      this.$nextTick(()=>{

        this.ins.init(this)
      })
    },
    getInputElement() {
      return this.$refs.input.getInputElement()
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
    this.$on('getKeyValueFromOption',(k,v)=> {
      this._change({k,v})
    })
  },
  watch: {
    modelKey(n) {
      if (n === undefined || n === "") {
        this._change({})
      }
    },
    ifOptionList(val) {
      if (!val) {
        this.$refs.input.blur()
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
          value: this.hideIt
        },
        {
          name: "esc",
          value: this.hideIt
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
      ref: 'input',
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
        focus:()=>{
          this.showList()
        },
        blur:()=>{
          this.hideList()
        }
      },
      style: this.styles
    }
    return (
      <div {...p}>
        <z-input {...inputProps}>{this.rIcon()}</z-input>
        {this.rOptionList()}
      </div>
    )
  }
}
</script>
