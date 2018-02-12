<template>
  <div class="k-to-top" 
    :style="{bottom,right}"
    v-if="visible">
    <slot>
      <div class="k-to-top__btn"
        @click="onToTop">
         <span class="k-to-top__text">回到顶部</span>
         <span class="k-to-top__icon"></span>
      </div>
    </slot>
  </div>
</template>

<script>
import {scroll} from 'karma-ui/util/dom.js'
export default {
  name: "KToTop",
  data() {
    return {
      visible: false
    }
  },
  props: {
    distance: {
      type:Number,
      default:200
    },
    bottom:String,
    right:String,
  },
  methods: {
    onScroll() {
      this.visible = scroll().top>this.distance
    },
    onToTop() {
      window.scrollTo(0,0)
    }
  },
  mounted () {
    this.$nextTick(()=>{
      window.addEventListener('scroll',this.onScroll)
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll',this.onScroll)
  }
}
</script>
