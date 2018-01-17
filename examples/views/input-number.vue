<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <div>
        <k-input-number v-model="n"></k-input-number>
        <div>
          计数：{{n}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n:''
    }
  }
}
</script>

<style>

</style>
