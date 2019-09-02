<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <k-pagination
        :total="652"
        :current-page.sync="pageIndex"
        :page-size.sync="pageSize"
        :page-sizes=[8,16,32]
        @page-change="pageChange"
        @size-change="sizeChange"
        align="left"
        ></k-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 16,
    }
  },
  methods: {
    pageChange(p) {console.log(p)},
    sizeChange(size) {console.log(size)}
  }
}
</script>

<style>

</style>
