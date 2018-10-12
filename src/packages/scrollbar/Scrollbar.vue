<template>
  <div class="k-scrollbar"
    @wheel="onWheel">
    <scrollbar-y :speed="speed"
      :wrapper-height="wrapperHeight"
      :content-height="contentHeight"
      ref="y"
      @dragging="onDragging"></scrollbar-y>
    <div class="k-scrollbar__content"
      :class="{'k-scrollbar-transition':!dragging}"
      ref="content"
      :style="{marginTop:top*-1+'px',marginLeft:left*-1+'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ScrollbarY from './ScrollbarY'
// import {debounce} from 'karma-ui/util/throttle_debounce'
export default {
  name: 'KScrollbar',
  components: {
    ScrollbarY
  },
  data(){
    return {
      speed: 50,
      top: 0,
      left: 0,
      maxScrollTop:0,
      maxScrollLeft: 0,
      contentHeight:0,//内容高度
      wrapperHeight: 0,//scrollbar组件最外部容器的高度
      dragging: false,
    }
  },
  methods: {
    onDragging(thumbTop, h) {
      let top = thumbTop * this.maxScrollTop / (100 - h)
      this.top = top
      this.dragging = true
    },
    onWheel(e) {
      this.scrollY(e.deltaY)
      this.dragging = false
    },
    scrollY(y) {
      const s = this.speed,
        max = this.maxScrollTop
      let top = 0
      if(y>0) {
        top = s + this.top
      }else if(y<0){
        top = this.top - s
      }
      if(top<0) {
        top = 0
      }else if(top>max) {
        top = max
      }
      this.top = top
      //滚动条thumb位置
      this.$refs.y.scroll(top)

    },
    getSize() {
      const el = this.$el,
        content = this.$refs.content
      return {
        elClientHeight: el.clientHeight,
        elClientWidth: el.clientWidth,
        contentClientHeight: content.clientHeight,
        contentClientWidth: content.clientWidth,
      }
    },
    init() {
      const size = this.getSize()
      console.log(size)
      this.contentHeight = size.contentClientHeight
      this.wrapperHeight = size.elClientHeight
      const
        maxScrollTop = this.contentHeight - this.wrapperHeight,
        maxScrollLeft = size.contentClientWidth - size.elClientWidth
      this.maxScrollTop = maxScrollTop < 0?0:maxScrollTop
      this.maxScrollLeft = maxScrollLeft<0?0:maxScrollLeft
    },
    resetContentPosition() {
      //调整content内容区域的marginTop
      const maxScrollTop = this.maxScrollTop
      const top = this.top
      if(top>maxScrollTop) {
        this.top = maxScrollTop
      }
      this.$refs.y.scroll(this.top)
    },
    reset() {
      this.$nextTick(()=>{
        this.init()
        this.$nextTick(()=>{
          this.resetContentPosition()
        })
      })
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.init()
    })
    window.addEventListener('resize', this.reset)
  },
  updated() {
    this.reset()
  },
  beforeDestroy() {
    window.removeEventListener('resize',this.reset)
  }
}
</script>
