<template>
  <div class="k-scrollbar"
    @wheel="onWheel">
    <scrollbar-y :wrapper-height="wrapperHeight"
      :content-height="contentHeight"
      ref="y"
      @dragging="onDragging"></scrollbar-y>
    <scrollbar-x :wrapper-width="wrapperWidth"
      :content-width="contentWidth"
      ref="x"
      @dragging="onDraggingX"></scrollbar-x>
    <div class="k-scrollbar__content"
      :class="{'k-scrollbar-transition':!dragging}"
      ref="content"
      :style="{marginTop:top*-1+'px',marginLeft:left*-1+'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /* NOTE:当prop属性想要sync的时候，必须在组件传入此参数如
  /* <my-comp :allow="allow.sync"></my-comp>，否则不起作用
   * TODO:scrollx和scrolly可以合并成一个
   * 
  */
  import { getStyle } from 'karma-ui/util/dom'
  import ScrollbarY from './ScrollbarY'
  import ScrollbarX from './ScrollbarX'
  // import {debounce} from 'karma-ui/util/throttle_debounce'
  export default {
    name: 'KScrollbar',
    components: {
      ScrollbarY, ScrollbarX
    },
    props: {
      //allowBodyScroll应该在内容高度小于等于容器高度的时候，自动设置成true
      //否则，将会出现：当鼠标在某个区域内滚动的时候，外部滚动条也滚动不了
      allowBodyScroll:{
        type:Boolean,
        default:false
      },
      speed: {
        type: Number,
        default: 52
      },
    },
    data() {
      return {
        allow: this.allowBodyScroll,
        top: 0,
        left: 0,
        maxScrollTop: 0,
        maxScrollLeft: 0,
        contentHeight: 0, //内容高度
        wrapperHeight: 0, //scrollbar组件最外部容器的高度
        contentWidth: 0,
        wrapperWidth: 0,
        dragging: false,
      }
    },
    methods: {
      onDragging(thumbTop, h) {
        let top = thumbTop * this.maxScrollTop / (100 - h)
        this.top = top
        this.dragging = true
      },
      onDraggingX(thumbLeft, w) {
        let left = thumbLeft * this.maxScrollLeft / (100 - w)
        this.left = left
        this.dragging = true
      },
      onWheel(e) {
        // console.log(e)
        this.scrollY(e.deltaY)
        this.dragging = false
        if(!this.allow) {
          e.stopPropagation()
          e.preventDefault()
        }
      },
      scrollY(y) {
        const s = this.speed,
          max = this.maxScrollTop
        let top = 0
        if (y > 0) {
          top = s + this.top
        } else if (y < 0) {
          top = this.top - s
        }
        if (top < 0) {
          top = 0
        } else if (top > max) {
          top = max
        }
        this.top = top
        //滚动条thumb位置
        // this.$refs.y.scroll(top)

      },
      getSize() {
        //content只计算clientWidth和clientHeight不行，需加上margin和border
        const el = this.$el,
          content = this.$refs.content.children[0]
        if(this.$refs.content.children.length>1) {
          console.warn('scrollbar组件的slot只能有一个根节点')
        }
        return {
          elClientHeight: el.clientHeight,
          elClientWidth: el.clientWidth,
          contentWholeHeight: content.clientHeight+parseInt(getStyle(content,'margin-top'))+parseInt(getStyle(content,'margin-bottom'))+parseInt(getStyle(content,'border-top-width'))+parseInt(getStyle(content,'border-bottom-width')),
          contentWholeWidth: content.clientWidth+parseInt(getStyle(content,'margin-left'))+parseInt(getStyle(content,'margin-right'))+parseInt(getStyle(content,'border-left-width'))+parseInt(getStyle(content,'border-right-width')),
        }
      },
      init() {
        const size = this.getSize()
        this.contentHeight = size.contentWholeHeight
        this.wrapperHeight = size.elClientHeight
        this.contentWidth = size.contentWholeWidth
        this.wrapperWidth = size.elClientWidth
        const
          maxScrollTop = this.contentHeight - this.wrapperHeight,
          maxScrollLeft = this.contentWidth - this.wrapperWidth
        this.maxScrollTop = maxScrollTop < 0 ? 0 : maxScrollTop
        this.maxScrollLeft = maxScrollLeft < 0 ? 0 : maxScrollLeft
        let allow = this.allowBodyScroll
        if(this.contentHeight<this.wrapperHeight) {
          allow = true
        }
        this.allow = allow
        
      },
      resetContentPosition() {
        //调整content内容区域的marginTop/marginLeft
        const maxScrollTop = this.maxScrollTop
        const maxScrollLeft = this.maxScrollLeft
        const top = this.top
        const left = this.left
        if (top > maxScrollTop) {
          this.top = maxScrollTop
        }
        if(left > maxScrollLeft) {
          this.left = maxScrollLeft
        }
        this.$refs.y.scroll(this.top)
        this.$refs.x.scroll(this.left)
      },
      reset() {
        this.$nextTick(() => {
          this.init()
          this.$nextTick(() => {
            this.resetContentPosition()
          })
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.init()
      })
      window.addEventListener('resize', this.reset)
    },
    updated() {
      this.reset()
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.reset)
    }
  }
</script>