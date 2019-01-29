<template>
  <k-input :class="{'k-input-number--disabled':this.disabled}"
    v-model="inputValue"
    :disabled="disabled"
    :styles="styles"
    :input-styles="inputStyles"
    :size="size"
    :validate="validate"
    @focus="handleFocus"
    @blur="handleBlur">
    <div :class="{
      'k-input-number':true,
      'k-input-number--disabled':value<=min
    }"
      slot="prepend"
      @click="minus">
      <i class="k-input-number-icon">-</i>
    </div>
    <div slot="append"
      :class="{
        'k-input-number--right':true,
        'k-input-number--disabled':max<=value
      }"
      @click="add">
      <i class="k-input-number-icon">+</i>
    </div>
  </k-input>
</template>

<script>
/**@augments min Number 最小值，默认1，可以置为""
 * @augments max 最大值，默认不限
 * @augments value 可以使用v-model双向绑定的值
 * @augments step 步长，默认1
 * @augments size 尺寸大小，同input组件
 * @augments styles 设置整体样式，同input组件
 * @augments inputStyles 同input组件
 * @augments disabled 是否禁用
 *
 */
import KInput from "karma-ui/packages/input/input.jsx.vue"
export default {
  name: "KInputNumber",
  components: {
    KInput
  },
  data() {
    return {
      inputValue: this.value,
      validate: {
        type: "int>0",
        max: this.max,
        min: this.min,
        when: "input",
        showTips: false,
        useOldValue: true
      }
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  props: {
    min: {
      type: Number,
      default: 1,
      validator(v) {
        return v >= 1
      }
    },
    max: Number,
    value: [Number, String],
    size: String,
    step: {
      type: Number,
      default: 1,
      validator(v) {
        return v >= 1
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object,
      default() {
        return {
          width: "100px"
        }
      }
    },
    inputStyles: {
      type: Object,
      default() {
        return {
          textAlign: "center"
        }
      }
    }
  },
  methods: {
    handleKeydown(e) {
      const code = e.keyCode
      if(code!=40 && code!=38) {return}
      if(code==40) {
        this.minus()
      }else{
        this.add()
      }
    },
    handleFocus() {
      document.addEventListener('keydown',this.handleKeydown)
    },
    handleBlur() {
      document.removeEventListener('keydown',this.handleKeydown)
    },
    minus() {
      if (!this.disabled) {
        let v = this.value - this.step
        this.$emit("valueChange", v < this.min ? this.min : v)
      }
    },
    add() {
      if (!this.disabled) {
        let v = this.value + this.step
        if (this.max) {
          v = v > this.max ? this.max : v
        }
        this.$emit("valueChange", v)
      }
    }
  },
  watch: {
    value(val, oldVal) {
      this.inputValue = val
      this.$emit("change", val)
    },
    inputValue(val, oldVal) {
      if (val !== "") {
        val = parseInt(val)
        if (val > this.max) {
          val = this.max
        } else if (val < this.min) {
          val = this.min
        }
      }
      this.$emit("valueChange", val)
    }
  }
}
</script>

