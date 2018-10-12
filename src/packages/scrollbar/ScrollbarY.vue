<template>
  <div class="k-scrollbar__y"
    v-show="show">
    <div class="k-scrollbar__ytrack"
      @click.stop.prevent="onJump"></div>
    <div class="k-scrollbar__ythumb"
      :class="{'k-scrollbar-transition':!dragging}"
      @mousedown.stop.prevent="onDown"
      :style="{top:top+'%',height:height+'%'}"></div>
  </div>
</template>

<script>
export default {
  props: {
    speed: {
      type: Number,
      default: 50
    },
    contentHeight:Number,//内容高度
    wrapperHeight: Number,//scrollbar组件最外部容器的高度
  },
  data() {
    return {
      maxScrollTop: 0,
      top: 0,
      lastTop: 0,
      start: 0,
      dragging: false,
    }
  },
  computed: {
    height() {
      if(this.contentHeight!==0) {
        return this.wrapperHeight / this.contentHeight * 100
      }
    },
    show() {
      return this.contentHeight - this.wrapperHeight > 0
    }
  },
  methods: {
    onJump(e) {
      let y = e.clientY
      // todo
    },
    onDown(e) {
      this.dragging = true
      this.start = e.clientY
      this.lastTop = this.top
      document.addEventListener('mousemove', this.onMove)
      document.addEventListener('mouseup', this.onUp)
    },
    onMove(e) {
      if(this.dragging) {
        let d = e.clientY - this.start
        let precentageD = d / this.wrapperHeight * 100
        let top = precentageD + this.lastTop
        if(top<0) {
          top = 0
        }else if(top>(100-this.height)) {
          top = 100 - this.height
        }
        // console.log(top,this.top,precentageD)
        
        this.top = top
        this.$emit('dragging', this.top, this.height)
      }
    },
    onUp(e) {
      this.dragging = false
      document.removeEventListener('mousemove', this.onMove)
      document.removeEventListener('mouseup', this.onUp)
    },
    scroll(ctop) {
      this.top = ctop/this.maxScrollTop*(100-this.height)

      // this.top = ctop/this.maxScrollTop*(100-this.height)
      // console.log(ctop,this.top)
    },
    calcMaxScrollTop() {
      let max = this.contentHeight - this.wrapperHeight
      this.maxScrollTop = max<0?0:max
    }
  },
  watch: {
    contentHeight() {
      this.calcMaxScrollTop()
    },
    wrapperHeight() {
      this.calcMaxScrollTop()
    }
  }
}
</script>
