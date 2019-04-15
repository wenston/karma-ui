<template>
  <div class="layout">
    <h3 class="layout__title">日期选择器</h3>
    <div style="height: 300px">
      <k-button @click="toggle">toggle</k-button>
      <k-date-picker v-model="value"
        :show.sync="show"></k-date-picker>
    </div>
    <div>
      <k-date-picker :start.sync="start"
        :end.sync="end" range></k-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "2019-4-3",
      show: true,
      start: '',
      end: ''
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
