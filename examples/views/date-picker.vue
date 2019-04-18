<template>
  <div class="layout">
    <h3 class="layout__title">日期选择器</h3>
    <div>
      <k-button @click="toggle">toggle</k-button>
      单个日期：<k-date-picker v-model="value"
        :show.sync="show" simple block></k-date-picker>
      日期区间：<k-date-picker :start.sync="start"
        :end.sync="end"
        :max="max"
        :min="min"
        range
        block></k-date-picker>
      <k-button @click="start='2018-10-10'">2018-10-10</k-button>
      <k-button @click="end='2019-10-10'">2019-10-10</k-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      show: true,
      start: new Date(),
      end: new Date()
    }
  },
  computed: {
    max() {
      // return new Date()
    },
    min() {
      // return '2019-04-08'
    }
  },
  methods: {
    toggle(e) {
      this.show = !this.show
    }
  },
  watch: {
    value(v) {
      // console.log(v)
    },
    start(d) {
      console.log(d)
    },
    end(d) {
      console.log(d)
    }
  }
}
</script>

<style>
</style>
