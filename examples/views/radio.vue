<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <div>
        你好吗？
        <k-radio v-model="b" value=1>好</k-radio>
        <k-radio v-model="b" value=0>不好</k-radio>
        <div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      b:1
    }
  }
}
</script>

<style>

</style>
