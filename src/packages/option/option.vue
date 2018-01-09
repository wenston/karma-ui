<template>
  <li :title="label"
    :class="[
      'k-option',
      {
        'k-option--selected':this.selected
      }
    ]"
    @click.stop="_click"
    >
    <slot></slot>
  </li>
</template>

<script>
import emitter from "karma-ui/mixins/emitter.js";
export default {
  mixins: [emitter],
  componentName: "KOption",
  name: "KOption",
  // inject: ['selectComponent'],
  props: {
    selected: Boolean,
    value: [String, Number, Boolean], //等同于option的value的用法，等同于key value中的key
    label: [String, Number] //实际上保存的是key value中的value
  },
  methods: {
    _dispatch(k, v) {
      this.dispatch("KSelect", "getValue", {
        k,
        v
      });
    },
    _click(e) {
      this._dispatch(this.value,this.label);
    }
  },
  created() {
    this.$on("iNeedValue", k => {
      if (k == this.value) {
        this._dispatch(k, this.label);
      }
    });
  },
  mounted() {
    this.dispatch('KSelect','optionReady')
  }
};
</script>
