<template>
  <li :title="label"
    :class="[
      css.option,
      {
        [css.selected]:this.selected
      }
    ]"
    @click.stop="_click"
    >
    <slot></slot>
  </li>
</template>

<script>
import emitter from "../mixins/emitter.js";
export default {
  mixins: [emitter],
  componentName: "ZOption",
  name: "ZOption",
  // inject: ['selectComponent'],
  props: {
    selected: Boolean,
    value: [String, Number, Boolean], //等同于option的value的用法，等同于key value中的key
    label: [String, Number] //实际上保存的是key value中的value
  },
  methods: {
    _dispatch(k, v) {
      this.dispatch("ZSelect", "getValue", {
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
    this.dispatch('ZSelect','optionReady')
  }
};
</script>

<style lang="scss" module="css">
@import "../style/var.scss";
.option {
  height: 28px;
  line-height: 28px;
  padding: 0 6px;
  transition: 0.25s;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: darken($z-color-default, 3%);
    color: $z-color-primary;
  }
  &.selected {
    background-color: $z-color-primary;
    color: #fff;
  }
}
</style>
