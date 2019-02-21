import { layer } from "karma-ui/packages/layer/index"
import KInput from "karma-ui/packages/input/input.jsx.vue"
import KOption from 'karma-ui/packages/option/option'
export default {
  name: "KAutoComplete",
  components: {
    KInput,
    KOption
  },
  props: {
    ...KInput.props,
    data: {
      type: Array,
      default: () => []
    },
    //弹层的宽度
    layerWidth: {
      type:String,
      default: 'auto'
    },
    //弹层的高度
    layerHeight: {
      type: String,
      default: 'auto'
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  data() {
    return {
      ins: layer(),
      val: this.value
    }
  },
  watch: {
    val(v) {
      this.$emit("valueChange", v)
    },
    value(v) {
      this.val = v
    }
  },
  methods: {
    inputProps() {
      const {
        placeholder,
        block,
        simple,
        readonly,
        disabled,
        autofocus,
        clearable,
        size
      } = this.$props
      return {
        props: {
          value: this.val,
          placeholder,
          block,
          simple,
          readonly,
          disabled,
          autofocus,
          clearable,
          size
        },
        on: {
          ...this.$listeners,
          focus:()=>{
            this.ins.show()
          },
          valueChange: v => {
            this.val = v
          }
        }
      }
    },
    init() {
      this.$nextTick(() => {
        const {layerWidth,layerHeight,data,$slots,$scopedSlots,val} = this
        const slotsDefault =
          $slots.default ||
          data.map((item, index) => {
            const optionProps = {
              props: {
                tag: 'div',
                value: val
              },
              on: {
                click:e=>{
                  console.log('hhaha,', index)
                }
              }
            }
            return (
              <k-option {...optionProps}>
                {$scopedSlots.default({
                  row: item,
                  index
                })}
              </k-option>
            )
          })
        this.ins.init(this, [slotsDefault], {
          tag: "div",
          className: $slots.default?'':'k-select__list',
          width: layerWidth,
          height:layerHeight
        })
      })
    }
  },
  render() {
    const inputProps = this.inputProps()
    return <k-input {...inputProps} />
  },
  mounted() {
    this.init()
  },
  updated() {
    this.init()
  }
}
