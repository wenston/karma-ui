<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <k-dropdown :title="title"
        bodyClassName="body"
        trigger="click">
        <h1 slot="header">这是标题了！！！</h1>
        <em slot="footer">这是底部了</em>
        <div>展示面板打开了！</div>
        <k-input readonly placeholder="展示什么好呢" />
        <p>sadfasg</p>
        <p>sadfasg</p>
        <p>sadfasg</p>
        <p>sadfasg</p>
      </k-dropdown>
      <k-dropdown :title="title1"
        :body="body1"></k-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:<div>新的title哦，object格式</div>,
      title1: [<div>哈哈</div>,<div>呵呵</div>],
      body1: [
        <k-checkbox text="复选" />,
        <k-button>按钮</k-button>
      ]
    }
  },
  methods: {
    afterArea(area) {
      this.area = area
    },
    // title() {
    //   return <div>这是个抬头 <k-icon name="k-icon-sort-down" /></div>
    // }
  }
}
</script>

<style>
.body {
  padding: 20px;
  height: 400px;
  width: 400px;
  overflow: auto;
  background-color: white;
}
</style>
