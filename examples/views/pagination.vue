<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <k-pagination
        :total="18"
        :current-page.sync="pageIndex"
        :page-size.sync="pageSize"
        :page-sizes=[15,20,30]
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
      pageSize: 15,
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
