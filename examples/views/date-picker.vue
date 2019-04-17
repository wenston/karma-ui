<template>
  <div class="layout">
    <h3 class="layout__title">日期选择器</h3>
    <div style="display:flex">
      <k-button @click="toggle">toggle</k-button>
      单个日期：<k-date-picker v-model="value"
        :show.sync="show"></k-date-picker>
      日期区间：<k-date-picker :start.sync="start"
        :end.sync="end"
        range></k-date-picker>
        <k-button @click="start='2018-10-10'">2018-10-10</k-button>
        <k-button @click="end='2019-10-10'">2019-10-10</k-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "2019-4-3",
      show: true,
      start: "",
      end: ""
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
