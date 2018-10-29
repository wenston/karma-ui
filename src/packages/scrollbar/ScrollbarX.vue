<template>
  <div class="k-scrollbar__x"
    v-show="show">
    <div class="k-scrollbar__xtrack"
      :style="trackStyle"
      @click.stop.prevent="onJump"
      ref="track"></div>
    <div class="k-scrollbar__xthumb"
      :class="{'k-scrollbar-transition':!dragging}"
      @mousedown.stop.prevent="onDown"
      :style="thumb_styl"></div>
  </div>
</template>

<script>
  export default {
    props: {
      trackStyle: Object,
      thumbStyle: Object,
      contentWidth: Number, //内容宽度
      wrapperWidth: Number, //scrollbar组件最外部容器的宽度
    },
    data() {
      return {
        maxScrollLeft: 0,
        left: 0,
        lastLeft: 0,
        start: 0,
        dragging: false,
      }
    },
    computed: {
      thumb_styl() {
        const s = {top: this.top+'%', height: this.height+'%'}
        if(this.thumbStyle) {
          return {...this.thumbStyle, ...s}
        }else{
          return s
        }
      },
      width() {
        if (this.contentWidth !== 0) {
          return this.wrapperWidth / this.contentWidth * 100
        }
      },
      show() {
        return this.contentWidth - this.wrapperWidth > 0
      }
    },
    methods: {
      onJump(e) {
        const x = e.clientX,
          trackPos = this.$refs.track.getBoundingClientRect()
        //计算所点的位置位于track的宽度百分比

        let xWidth = (x - trackPos.left)/this.wrapperWidth*100
        //计算滚动条应该移动到的位置
        let left = xWidth - this.width /2
        if(left<0) {
          left = 0
        }else if(left+this.width>100) {
          left = 100-this.width
        }
        this.left = left
        this.$emit('dragging', this.left, this.width, false)
      },
      onDown(e) {
        this.dragging = true
        this.start = e.clientX
        this.lastLeft = this.left
        document.addEventListener('mousemove', this.onMove)
        document.addEventListener('mouseup', this.onUp)
      },
      onMove(e) {
        if (this.dragging) {
          let d = e.clientX - this.start
          let precentageD = d / this.wrapperWidth * 100
          let left = precentageD + this.lastLeft
          if (left < 0) {
            left = 0
          } else if (left > (100 - this.width)) {
            left = 100 - this.width
          }
          // console.log(top,this.top,precentageD)

          this.left = left
          // console.log(left)
          this.$emit('dragging', this.left, this.width, true)
        }
      },
      onUp(e) {
        this.dragging = false
        document.removeEventListener('mousemove', this.onMove)
        document.removeEventListener('mouseup', this.onUp)
      },
      scroll(cLeft) {
        // console.log(cLeft, this.maxScrollLeft)
        if(this.maxScrollLeft) {

          this.left = cLeft / this.maxScrollLeft * (100 - this.width)
        }
      },
      calcMaxScrollLeft() {
        let max = this.contentWidth - this.wrapperWidth
        this.maxScrollLeft = max < 0 ? 0 : max
      }
    },
    watch: {
      contentWidth() {
        this.calcMaxScrollLeft()
      },
      wrapperWidth() {
        this.calcMaxScrollLeft()
      }
    }
  }
</script>