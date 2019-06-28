<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <k-table :data="dataList"
      height="calc(100vh - 120px)"
      :columns="columns">
      <template slot="TotalPrice" slot-scope="{row}">
        <span style="color:red;text-align:right">{{row.TotalPrice.toFixed(2)}}</span>
      </template>
    </k-table>
  </div>
</template>

<script>
import table1 from "./tableData"
export default {
  data() {
    return {
      dataList: table1,
      columns: [
        {
          style: { width: "150" },
          name: () => <em>单号</em>,
          customRender: (row)=><a href="javascript:;">{row.Code}</a>
          // fixed: "left"
        },
        {
          style: { width: "140" },
          field: "SupplierName",
          name: <span style="color:red">供应商</span>
        },
        {
          field: "TaxRate",
          name: "税率"
        },
        {
          style: { width: "80", textAlign: "right" },
          field: "TotalPrice",
          name: "金额",
          scopedSlots: "TotalPrice",
          sorter: 1
        },
        {
          style: { width: "100" },
          field: "StoreName",
          name: "收货仓库"
        },
        {
          style: { width: "200" },
          field: "Detail",
          name: "商品",
          // scopedSlots: "Detail",
          sorter: 0
        },
        {
          style: { width: "70" },
          field: "HandlerName",
          name: "经手人"
        },
        {
          style: { width: "70" },
          field: "UserNameAdded",
          name: "制单人"
        },
        {
          style: { width: "160" },
          field: "DateAdded",
          name: "制单时间"
        },
        {
          style: { width: "60" },
          field: "Status",
          name: "状态"
        },
        {
          // style: { width: "69" },
          field: "PrintCount",
          name: "打印次数"
        },
        {
          style: { width: "70" },
          field: "Action",
          name: "操作",
          // fixed: "right",
          customRender: ({ row, index }) => {
            return (
              <a href="javascript:;">
                删除
              </a>
            )
          }
        }
      ]
    }
  }
}
</script>
<style lang="postcss" module="css">
</style>

