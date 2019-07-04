<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div v-loading="{
        loading,
        content:'',
        timeout: 3000,
        afterTimeout:afterTimeout
      }" >
      <p>sdfsadfasdf</p>
      <p>xxxxxxxxxxxxxxxx</p>
      <p>xxx33333333333333</p>
      <p>sdfsadfasdf</p>
      <p>xxxxxxxxxxxxxxxx</p>
      <p>xxx33333333333333</p>
      <p>sdfsadfasdf</p>
      <p>xxxxxxxxxxxxxxxx</p>
      <p>xxx33333333333333</p>
      <p>sdfsadfasdf</p>
      <p>xxxxxxxxxxxxxxxx</p>
      <p>xxx33333333333333</p>
    </div>
    <div>
      <k-button @click="ontest">loading 测试</k-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  methods: {
    afterTimeout() {
      this.loading = false
      console.log('手动改loading')
    },
    ontest() {
      this.loading = !this.loading
    }
  },
  mounted () {
    // this.$nextTick(()=>{
    //   this.$loading({
    //     content:'拼命加载中',
    //   }).show()
    // })

    // setTimeout(()=>{
    //   this.$loading().hide()
    // },3000)
  }
}
</script>
