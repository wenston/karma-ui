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
    show:Boolean,
    top:Number,
    height:Number,
  },
  data() {
    return {

    }
  }
}
</script>
