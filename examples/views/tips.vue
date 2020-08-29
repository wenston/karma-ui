<template>
  <div class="layout">
    <h3 class="layout__title">table2</h3>
    <div>
      <k-button type="primary"
        @click="onSuccess">成功提示</k-button>
      <k-button type="warning"
        @click="onWarning">警告提示</k-button>
      <k-button type="danger"
        @click="onError">提示</k-button>
      <k-button @click="onHide">手动关闭</k-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip: null,
    }
  },
  methods: {
    onHide() {
      this.tip.hide()
    },
    onSuccess() {
      this.tip = this.$tips({
        content: '操作成功啦！',
        manual: false
      }).hide(2222000)
    },
    onWarning() {
      this.tip = this.$tips({
        content: '警告！警告！入侵警告！！',
        type: 'warning',
        callback: () => {
          console.log('管了')
        }
      }).hide(2222000)
    },
    onError() {
      this.tip = this.$tips({
        content: <h1>哈哈哈</h1>,
        type: 'error'
      }).show().hide(2222000)
    },
  },
  mounted() {
    this.$tips({
      content: '嗯嗯嗯',
      icon: {
        name: 'k-icon-question',
        size: 120,
        color: 'pink'
      }
    }).show().hide(4000)
  }
}
</script>

<style>
</style>
