<template>
  <li :title="label"
    :class="[
      'k-option',
      {
        'k-option--selected':this.selected
      }
    ]"
    @click.stop="_click">
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: "KOption",
  inject: ['positionComponent'],
  props: {
    selected: Boolean,
    value: [String, Number, Boolean], //等同于option的value的用法，等同于key value中的key
    label: [String, Number] //实际上保存的是key value中的value
  },
  methods: {
    _click(e) {
      this.emitKeyValueToSelect()
    },
    emitKeyValueToSelect() {
      this.positionComponent.$props.vm.$emit(
        "getKeyValueFromOption",
        this.value,
        this.label
      )
    }
  },
  created() {
    this.positionComponent.$props.vm.$emit('getAllOptionComp',this)
  },
  watch: {
    selected: {
      immediate: true,
      handler(nv) {
        if (nv) {
          this.emitKeyValueToSelect()
        }
      }
    }
  }
}
</script>
