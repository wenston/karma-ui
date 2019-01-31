<script>
export default {
  name: "KOption",
  inject: ["layerComponent"],
  props: {
    multiple: Boolean,//是不是多选
    selected: Boolean,
    value: [String, Number, Boolean], //等同于option的value的用法，等同于key value中的key
    label: [String, Number] //实际上保存的是key value中的value
  },
  methods: {
    handleClick() {
      this.emitKeyValueToSelect(!this.multiple)
    },
    emitKeyValueToSelect(hide = false) {
      this.layerComponent.$data.vm.$emit(
        "getKeyValueFromOption",
        this.value,
        this.label,
        !!hide //true代表要收起下拉列表
      )
    }
  },
  created() {
    this.layerComponent.$data.vm.$emit(
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

        mousedown: e => {
          e.stopPropagation()
          this.layerComponent.$data.vm.$emit("inovering", true)
        },
        mouseup: e => {
          e.stopPropagation()
          this.layerComponent.$data.vm.$emit("inovering", false)
        }
      }
    }
    return (
      <li {...p}>
        <span>{this.$slots.default}</span>
      </li>
    )
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
