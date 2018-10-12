<template>
  <div class="k-scrollbar__y"
    v-show="show">
    <div class="k-scrollbar__ytrack"></div>
    <div class="k-scrollbar__ythumb"
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
      top: 0
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
    scroll(ctop) {
      this.top = ctop/this.maxScrollTop*(100-this.height)

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
