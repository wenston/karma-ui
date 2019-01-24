import {offset,getStyle,setStyle} from 'karma-ui/util/dom'
export default {
  name: 'KPosition',
  props: {
    //相对于vm定位
    //vm是 定位的依据
    vm: {
      type: Object,
      default: null
    },
    gap: {
      type: Number,
      default: 2
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  data() {
    return {
      left: 0,
      top: -9999,
      width: 0,
      height: 0
    }
  },
  provide() {
    return {
      positionComponent: this
    }
  },
  methods: {
    getElemPosition() {
      const elem = this.vm.$el
      if(!elem) {
        return null
      }
      const pos = offset(elem)
      const w = getStyle(elem,'width')
      const h = getStyle(elem,'height')
      this.left = pos.left
      this.top = pos.top
      this.width = w
      this.height = h
      this.setSizeAndPosition()
    },
    setSizeAndPosition() {
      setStyle(this.$el,{
        width: this.width,
        top: this.top + parseFloat(this.height) + this.gap + 'px',
        left: this.left + 'px'
      })
    }
  },
  watch: {
    vm: 'getElemPosition'
  },
  render() {
    const p = {
      class: {
        'k-absolute': true
      },
      on: {
        ...this.$listeners
      }
    }
    return <this.tag {...p}>{this.$slots.default}</this.tag>
  }
}
