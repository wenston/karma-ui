<template>
  <div class="k-scrollbar"
    :class="{'k-scrollbar__transition':!dragging}"
    @wheel="onWheel">
    <scrollbar-y 
      :speed="speed"
      :wrapper-height="wrapperHeight"
      :content-height="contentHeight"
      ref="y"
      @dragging="onDragging"></scrollbar-y>
    <div class="k-scrollbar__content" 
      ref="content"
      :style="{marginTop:top*-1+'px',marginLeft:left*-1+'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ScrollbarY from './ScrollbarY'
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
      }else{
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
      this.contentHeight = size.contentClientHeight
      this.wrapperHeight = size.elClientHeight
      const
        maxScrollTop = this.contentHeight - this.wrapperHeight,
        maxScrollLeft = size.contentClientWidth - size.elClientWidth
      this.maxScrollTop = maxScrollTop < 0?0:maxScrollTop
      this.maxScrollLeft = maxScrollLeft<0?0:maxScrollLeft

    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.init()
    })
  },
  updated() {
    this.init()
    // console.log('updated')
    // todo 1.内容变化后，重新计算内容scroll位置及滚动条thumb的位置
    // todo 2.滚动时会频繁触发updated钩子函数，最好加入节流
  }
}
</script>
