<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <k-pagination
        :total="652"
        :current-page.sync="pageIndex"
        ></k-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1
    }
  }
}
</script>

<style>

</style>
