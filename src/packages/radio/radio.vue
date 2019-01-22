<template>
  <label class="k-radio">
    <input type="radio" class="k-radio__input"
      :name="name"
      :disabled="disabled"
      :checked="state"
      :value="value"
      @change="onChange">
    <span class="k-radio__icon"></span>
    <span class="k-radio__text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name:'KRadio',
  model: {
    prop: "modelValue",
    event: 'modelValueChange'
  },
  computed: {
    state() {
      if(this.modelValue === void 0) {
        return this.checked
      }
      return this.modelValue === this.value
    }
  },
  props: {
    modelValue: {
      type:[String,Number,Boolean],
      default:void 0
    },
    checked:Boolean,
    disabled:Boolean,
    value: {
      type: [String,Number,Boolean],
      default: void 0
    },
    name:String
  },
  methods: {
    onChange(e) {
      this.$emit('modelValueChange',this.state?'':this.value);
      this.$emit('change',e);
    }
  }
}
</script>
