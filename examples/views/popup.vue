<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div style="padding-top: 600px;">
      <k-button @click="onShow">弹出popup框</k-button>
    </div>
    <div style="height: 1000px;"></div>
    <k-popup bind="v-if"
      :show.sync="show"
      :bodyStyle="{height:'100px'}">

      <div style="width:500px;">
        <div style="height: 1000px">

          <k-auto-complete :data="dataList"
            layer-width="250px"
            nearby />
        </div>
      </div>
    </k-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      dataList: [
        {
          Id: 300038,
          ProId: 300038,
          CategoryId: 300046,
          AccountingType: 1,
          Name: "小夜灯",
          ProName: "小夜灯",
          Color: "无",
          Brand: "OPPO",
          SNCode: "1111111",
          HaveImei: 0,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 0,
          RetailPrice: 30,
          PurchaseFloorPrice: 0,
          Amount: 1179,
          AmountCanUsed: 1174,
          RowId: 1
        },
        {
          Id: 303525,
          ProId: 303525,
          CategoryId: 300046,
          AccountingType: 1,
          Name: "多功能数据线",
          ProName: "多功能数据线",
          Color: "无",
          Brand: "无",
          SNCode: "",
          HaveImei: 0,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 0,
          RetailPrice: 0,
          PurchaseFloorPrice: 0,
          Amount: 120,
          AmountCanUsed: 120,
          RowId: 2
        }
      ]
    }
  },
  methods: {
    onShow() {
      this.show = true
    }
  }
}
</script>

<style>
</style>
