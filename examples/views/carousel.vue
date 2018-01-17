<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <div>
        
        <k-carousel>
          <k-carousel-item v-for="n in 5"
            :class="css.carousel"
            :key="n">{{n}}</k-carousel-item>
        </k-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>

<style module="css">
.carousel {
  height: 300px;
  line-height: 300px;
  background-color:#ccc;
  font-size:50px;

  &:nth-child(2n) {
    background-color:#f1f1f1
  }
}
</style>
