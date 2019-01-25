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
       //position组件要有个left和top值，这两个值是相对于vm的$el计算的
       //在此，vm就是select组件
      vm: null,
      afterShow: ()=>{}
    }
  },
  methods: {
    init(vm) {
      this.list = vm.$slots.default
      this.vm = vm
    },
    show(callback) {
      this.visible = true
      if(callback) {
        this.afterShow = callback
      }
    },
    handleEnter() {
      if(this.afterShow) {
        this.afterShow()
      }
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
    const transitionProps = {
      on: {
        'enter': this.handleEnter
      }
    }
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
        mousedown:e=> {
          e.stopPropagation()
        },
        mouseup:e=>{
          e.stopPropagation()
        },
        mouseover:e=>{
          this.vm.$emit('inovering',true)
        },
        mouseout: e=>{
          this.vm.$emit('inovering',false)
        }
      }
    }
    return (
      <transition name="k-transition-slide-down" {...transitionProps}>
        <k-position {...positionProps}>
          {this.list}
        </k-position>
      </transition>
    )
  }
}
