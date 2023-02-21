<template>
  <div class="layout">
    <h3 class="layout__title">日期选择器</h3>
    <div>
      <k-button @click="toggle">toggle</k-button>
      单个日期：<k-date-picker v-model="value"
        :show.sync="show"
        ref="date1"
        
        @change="onChange"></k-date-picker>
    </div>
    <div>
      单个日期：<k-date-picker v-model="value1"
        ref="date2"
        :show.sync="show1"
        :min="value"
        simple
        block></k-date-picker>
      <k-button @click="value1=''">清空单个日期</k-button>
    </div>
    <div>
      日期区间：<k-date-picker :start.sync="start"
        :end.sync="end"
        range
        ref="dp2"
        nearby
        @getLayerElement="getDatePickerElement"
        @change-range="onChangeRange"
        @quick="onQuickRange"></k-date-picker>
    </div>
    <div>
      <k-button @click="start='2018-10-10'">2018-10-10</k-button>
      <k-button @click="end='2019-10-10'">2019-10-10</k-button>
      <k-button @click="show1=!show1">获取焦点</k-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "2019-04-19",
      value1: "",
      show: true,
      show1: false,
      start: '',
      end: '',
    }
  },
  computed: {
    max() {
      return new Date()
    },
    min() {
      return new Date() - 15 * 3600 * 24 * 1000
    },
  },
  methods: {
    onChange(e) {
      console.log('日期选择了：',e)
    },
    onChangeRange(e) {
      console.log('日期区间',e)
    },
    onQuickRange(e) {
      console.log('quick:',e)
    },
    toggle(e) {
      this.show = !this.show
    },
    getDatePickerElement(el) {
      console.log(el)
    },
  },
  watch: {
    value(v) {
      // console.log(v)
    },
    start(d) {
      // console.log(d)
    },
    end(d) {
      // console.log(d)
    },
  },
}
</script>

<style>
</style>
