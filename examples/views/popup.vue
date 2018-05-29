<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <k-button @click="onShow">弹出popup框</k-button>
    </div>
    <k-popup :show.sync="show">
      <div>
        sdfsagadfasdfsadfsadf
      </div>
    </k-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    onShow() {
      this.show = true
    }
  }
}
</script>

<style>

</style>
