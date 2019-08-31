<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div style="height: 2000px">
      <k-button @click="toShow">弹出</k-button>
      <k-drawer :show.sync="show" direction="right" >
        <div :class="css.cont"></div>
      </k-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:false
    }
  },
  methods: {
    toShow() {
      this.show = true
    }
  },
  watch: {
    
  }
}
</script>

<style lang="postcss" module="css">
.cont {
  width: 30vw;
  height: 1000px;
  background-color: white;
  overflow-y: auto;
}
</style>
