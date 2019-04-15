<template>
  <div class="layout">
    <h3 class="layout__title">日期选择器</h3>
    <div>
      <k-button @click="toggle">toggle</k-button>
      <k-date-picker v-model="value"
        :show.sync="show"></k-date-picker>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "2019-4-3",
      show: true
    }
  },
  methods: {
    toggle(e) {
      this.show = !this.show
      
    }
  },
  watch: {
    value(v) {
      console.log(v)
    }
  }
}
</script>

<style>
</style>
