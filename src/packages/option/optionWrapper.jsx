import KPosition from "karma-ui/packages/position/position"
export default {
  components: {
    KPosition
  },
  data() {
    return {
      parent: null,
      list: null,
      visible: false,
      vm: null //position组件要有个left和top值，这两个值是相对于vm的$el计算的
    }
  },
  methods: {
    init(vm) {
      this.list = vm.$slots.default
      this.vm = vm
    },
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    destroy() {
      this.parent.removeChild(this.$el)
      this.$destroy()
    }
  },
  render() {
    const positionProps = {
      props: {
        tag: "ul",
        vm: this.vm
      },
      class: {
        "k-select__list": true
      },
      directives: [
        {
          name: "show",
          value: this.visible
        }
      ],
      on: {
        mousedown(e) {
          e.stopPropagation()
        },
        mouseup(e) {
          e.stopPropagation()
        }
      }
    }
    return (
      <transition name="k-transition-slide-down">
        <k-position {...positionProps}>
          {this.list}
        </k-position>
      </transition>
    )
  }
}
