<template>
  <div class="k-scrollbar"
    @wheel="onWheel">
    <scrollbar-y :show="showY"
      :top="thumbYTop"
      :height="thumbYHeight"></scrollbar-y>
    <!-- <div class="k-scrollbar__y"
      v-show="showY">
      <div class="k-scrollbar__ytrack"></div>
      <div class="k-scrollbar__ythumb"
        :style="{top:thumbYTop+'%',height:thumbYHeight+'%'}"
        ref="yThumb"></div>
    </div> -->
    <div class="k-scrollbar__content" ref="content"
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
      showY: false,
      showX: false,
      speed: 50,
      top: 0,
      left: 0,
      maxScrollTop:0,
      maxScrollLeft: 0,
      thumbYTop: 0,
      thumbYHeight: 0,
    }
  },
  methods: {
    onWheel(e) {
      this.scrollY(e.deltaY)
    },
    scroll(x,y) {
      
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
      this.thumbYTop = top/max*(100-this.thumbYHeight)

    },
    getSize() {
      const el = this.$el,
        content = this.$refs.content,
        maxScrollTop = content.clientHeight - el.clientHeight,
        maxScrollLeft = content.clientWidth - el.clientWidth
      this.maxScrollTop = maxScrollTop < 0?0:maxScrollTop
      this.maxScrollLeft = maxScrollLeft<0?0:maxScrollLeft
      return {
        elClientHeight: el.clientHeight,
        elClientWidth: el.clientWidth,
        contentClientHeight: content.clientHeight,
        contentClientWidth: content.clientWidth,
      }
    },
    init() {
      const size = this.getSize()
      
      if(size.elClientHeight>=size.contentClientHeight) {
        this.showY = false
      }else{
        this.thumbYHeight = size.elClientHeight/size.contentClientHeight*100
        this.showY = true
      }


    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.init()
    })
  },
  updated() {
    this.init()
  }
}
</script>
