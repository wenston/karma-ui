<script>
import { validate } from "karma-ui/mixins/validate.js"
export default {
  mixins: [validate],
  name: "KInput",
  inheritAttrs: false,
  data() {
    return {
      oldValue: ""
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  props: {
    tag: {
      type: String,
      default: "input"
    },
    value: {
      type: [Number, String, Boolean],
      default: void 0
    },
    name: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    autofocus: Boolean,
    //active是为了让input不依赖hover，而一直保持蓝色框状态
    active: Boolean,
    select: Boolean,
    autocomplete: {
      type: String,
      default: "on"
    },
    type: {
      type: String,
      default: "text"
    },
    max: Number,
    min: Number,
    maxlength: [String, Number],
    minlength: [String, Number],
    clearable: Boolean,
    block: Boolean,
    size: {
      type: String,
      default: "small"
    },
    styles: Object,
    inputStyles: Object,
    simple: Boolean, //简易型。只有下边框
    noStyle: Boolean
  },
  computed: {
    isInput() {
      return this.tag.toLowerCase() === "input"
    }
  },
  render() {
    const directives = [
      {
        name: "select",
        value: { select: this.select }
      }
    ]
    let prepend = null,
      append = null
    if (this.isInput) {
      if (this.$slots.prepend) {
        prepend = <div class="k-input-prepend">{this.$slots.prepend}</div>
      }
      if (this.$slots.append || this.$slots.default) {
        append = (
          <div class="k-input-append">
            {this.$slots.append || this.$slots.default}
          </div>
        )
      }
      if (this.clearable && (this.value + "").trim() !== "") {
        append = (
          <i
            class="k-input-clearable k-icon-close iconfont"
            onClick={this.toClear}
          />
        )
      }
    }
    return (
      <div
        class={{
          "k-input-section": true,
          ["k-input-" + this.size]: true,
          "k-input-block": this.block,
          "k-input-simple": this.simple,
          "k-input-nostyle": this.noStyle
        }}
        style={this.styles}
      >
        {prepend}
        {append}
        <this.tag
          {...{ directives }}
          {...{ attrs: {...this.$props,tabindex:1} }}
          domPropsValue={this.value}
          domPropsDisabled={this.disabled}
          class={{
            [this.isInput ? "k-input" : "k-textarea"]: true,
            "k-input-disabled": this.disabled,
            "k-input-active": this.active
          }}
          style={this.inputStyles}
          onInput={() => this.handlerEvent($event)}
          onChange={this.handlerEvent}
          onKeyup={this.handlerEvent}
          onKeydown={this.handlerEvent}
          onKeypress={this.handlerEvent}
          onBlur={this.handlerEvent}
          onFocus={this.handlerEvent}
          ref="input"
        />
      </div>
    )
  },
  methods: {
    _successCallback() {
      //触发自定义valid事件
      this.$emit("valid", this.value)
    },
    _errorCallback(errorType) {
      if (errorType) {
        if (errorType.digits) {
          //如果是小数位数问题
          this.oldValue = parseFloat(this.oldValue).toFixed(errorType.digits)
        } else if (errorType.clear) {
          //清空
          this.oldValue = ""
        } else if (errorType.value) {
          this.oldValue = errorType.value
        }
      }
      // console.log(this.oldValue)
      setTimeout(() => {
        this.$emit(
          "valueChange",
          this.validateOptions.useOldValue ? this.oldValue : ""
        )
        //触发自定义invalid事件
        this.$emit("invalid", this.value)
      })
    },
    handlerEvent(e) {
      let eType = e.type
      let val = e.target.value + ""
      //给v-model绑定的属性写入值
      if (eType === "input") {
        // console.log(val)
        this.$emit("valueChange", val)
      }
      //验证用户输入
      if (
        this.needValidate &&
        eType === this.validateOptions.when.toLowerCase()
      ) {
        this.toValidate(
          //需要验证的那个值
          val,
          //输入有效时的回调
          this._successCallback,
          //输入无效时的回调
          this._errorCallback
        )
      }
      //向外发自定义事件，input/keyup/change等等类似原生的事件
      // console.log(eType)
      this.$emit(eType, e)
    },
    toClear() {
      this.$emit("valueChange", "")
    },
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    onSelect() {
      this.$refs.input.select()
    },
    getInputElement() {
      return this.$refs.input
    }
  },
  watch: {
    value(val, oldVal) {
      // console.log(val)
      let old = oldVal
      if (this.isIntOrCurrency) {
        old = parseFloat(old)
        old = isNaN(old) ? "" : old < 0 ? "" : old
      }
      this.oldValue = old
    }
  },
  directives: {
    select: {
      inserted(el, binding) {
        if (binding.value.select) {
          el.select()
        }
      }
    }
  }
}
</script>