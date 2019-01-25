<script>
export default {
  name: "KOption",
  inject: ["positionComponent"],
  props: {
    selected: Boolean,
    value: [String, Number, Boolean], //等同于option的value的用法，等同于key value中的key
    label: [String, Number] //实际上保存的是key value中的value
  },
  methods: {
    handleClick(e) {
      this.emitKeyValueToSelect(true)
    },
    emitKeyValueToSelect(hide = false) {
      this.positionComponent.$props.vm.$emit(
        "getKeyValueFromOption",
        this.value,
        this.label,
        hide,//true代表要收起下拉列表
      )
    }
  },
  created() {
    this.positionComponent.$props.vm.$emit(
      "getOptionComponentName",
      this.$options.name
    )
  },
  render() {
    const { label, value, selected } = this
    const p = {
      attrs: {
        title: this.label
      },
      class: {
        "k-option": true,
        "k-option--selected": selected
      },
      on: {
        click: this.handleClick,
        // mousedown: e => {
        //   e.stopPropagation()
        // },
        // mouseup: e => {
        //   e.stopPropagation()
        // }
      }
    }
    return <li {...p}>{this.$slots.default}</li>
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
