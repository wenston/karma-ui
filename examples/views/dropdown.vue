<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <k-dropdown :title="title"
        :show.sync="show"
        trigger="click"
        :white-list="wh"
        alignment="right"
        gap="10">
        <h1 slot="header">这是标题了！！！</h1>
        <em slot="footer">这是底部了</em>
        <div>展示面板打开了！</div>
        来一个日期
        <k-date-picker :start.sync="start"
          :end.sync="end"
          @getLayerElement="getDatePickerElement"
          range />
      </k-dropdown>

    </div>
    <div>
      <iframe style="width: 1000px;height: 500px"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      title: <div>新的title哦，object格式</div>,
      dpElement: null,
      wh: [],
      start: '',
      end: ''
    }
  },
  methods: {
    afterArea(area) {
      this.area = area
    },
    getDatePickerElement(el) {
      // this.whiteList = [el]
      this.wh.push(el)
      console.log(el)
    }
    // title() {
    //   return <div>这是个抬头 <k-icon name="k-icon-sort-down" /></div>
    // }
  }
}
</script>

<style>
.body {
  padding: 20px;
  width: 400px;
  overflow: auto;
  background-color: white;
}
</style>
