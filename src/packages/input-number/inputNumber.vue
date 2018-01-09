<template>
  <k-input
    :class="{'k-input-number--disabled':this.disabled}"
    v-model="inputValue"
    :disabled="disabled"
    :styles="styles"
    :input-styles="inputStyles"
    :size="size"
    :validate="validate">
    <div :class="{
      'k-input-number':true,
      'k-input-number--disabled':value<=min
    }"  
      slot="prepend"
      @click="minus">
      <k-icon class="k-input-number__sign"
        which="minus"
        ></k-icon>
    </div>
    <div slot="append" 
      :class="{
        'k-input-number--right':true,
        'k-input-number--disabled':max<=value
      }"
      @click="add">
      <k-icon class="k-input-number__sign"
        which="plus"></k-icon>
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
import KInput from "karma-ui/packages/input/input.jsx.vue";
import KIcon from "karma-ui/icon/css/icon.vue";
export default {
  name:'KInputNumber',
  components: {
    KInput,
    KIcon
  },
  data() {
    return {
      inputValue: this.value,
      validate: {
        type: "int>0",
        max:this.max,
        min:this.min,
        when: "input",
        showTips: false,
        useOldValue: true
      }
    };
  },
  model: {
    prop: "value",
    event: "numberbian"
  },
  props: {
    min: {
      type: Number,
      default: 1,
      validator(v) {
        return v >= 1;
      }
    },
    max: Number,
    value: [Number, String],
    size:String,
    step: {
      type: Number,
      default: 1,
      validator(v) {
        return v >= 1;
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
        };
      }
    },
    inputStyles: {
      type: Object,
      default() {
        return {
          textAlign: "center"
        };
      }
    }
  },
  // 由于vue jsx本身并不十分成熟完善，所以还是采用template
  // render() {
  //   return (
  //     <k-input
  //       styles={this.styles}
  //       inputStyles={this.inputStyles}
  //       v-model={this.inputValue}
  //       // value={this.value}//注意这里要加上value={this.value}，否则在输入字母时会出现input组件中的value是inputEvent的问题！为什么？
  //       disabled={this.disabled}
  //       validate={this.validate}
  //       onInput={this.handleInput}
  //     >
  //       <div slot="prepend" onClick={this.minus}>
  //         -
  //       </div>
  //       <div slot="append" onClick={this.add}>+</div>
  //     </k-input>
  //   );
  // },
  methods: {
    minus() {
      if (!this.disabled) {
        let v = this.value - this.step;
        this.$emit("numberbian", v < this.min ? this.min : v);
      }
    },
    add() {
      if (!this.disabled) {
        let v = this.value + this.step;
        if (this.max) {
          v = v > this.max ? this.max : v;
        }
        this.$emit("numberbian", v);
      }
    }
  },
  watch: {
    value(val, oldVal) {
      this.inputValue = val;
      this.$emit('change',val);
    },
    inputValue(val, oldVal) {
      if (val !== "") {
        val = parseInt(val);
        if (val > this.max) {
          val = this.max;
        } else if (val < this.min) {
          val = this.min;
        }
      }
      this.$emit("numberbian", val);
    }
  }
};
</script>

