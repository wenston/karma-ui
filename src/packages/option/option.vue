<script>
export default {
  name: "KOption",
  inject: ["layerComponent"],
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    tag: {
      type: String,
      default: "li"
    },
    multiple: Boolean, //是不是多选
    selected: Boolean,
    value: [String, Number, Boolean], //等同于option的value的用法，等同于key value中的key
    label: [String, Number] //实际上保存的是(key, value)中的value
  },
  methods: {
    handleClick(e) {
      this.emitKeyValueToSelect(!this.multiple, true, true)
      this.$emit('click', e)
    },
    emitKeyValueToSelect(hide = false, isFocus = false, isEmit = false) {
      // console.log('??')
      this.layerComponent &&
        this.layerComponent.$data.vm.$emit(
          "getKeyValueFromOption",
          this.value,
          this.label,
          !!hide, //true代表要收起下拉列表
          isFocus,
          isEmit
        )
    }
  },
  created() {
    this.layerComponent &&
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
        [`k-option--${this.size}`]: true,
        "k-option--selected": selected
      },
      on: {
        ...this.$listeners,
        click: this.handleClick,
        mousedown: e => {
          e.stopPropagation()
          this.layerComponent &&
            this.layerComponent.$data.vm.$emit("inovering", true)
          this.$emit('mousedown', e)
        },
        mouseup: e => {
          e.stopPropagation()
          this.layerComponent &&
            this.layerComponent.$data.vm.$emit("inovering", false)
          this.$emit('mouseup', e)
        }
      }
    }
    return (
      <this.tag {...p}>
        <span>{this.$slots.default}</span>
      </this.tag>
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
