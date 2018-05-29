<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <k-button @click="onShow">dialog</k-button>
    </div>
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
      this.$dialog({
        content(){
          return (
            <div>
              <k-button>jsx</k-button>
            </div>
          )
        },
        ok:()=>{
          console.log('页面接收到了ok')
        },
        cancel:()=>{
          console.log('页面接收到了cancel')
        }
      })
    }
  }
}
</script>

<style>

</style>