<template>
  <div class="layout">
    <h3 class="layout__title">自动完成</h3>
    <div>
      <k-auto-complete :data="list"
        v-model="value">
        <div slot-scope="{row,index}" :key="row.Id" class="list">
          <span class="name">{{row.Name}}</span>
          <span class="index">{{index}}</span>
        </div>
      </k-auto-complete>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      list: [
        {
          Id: 100020,
          ProId: 100020,
          CategoryId: 63,
          AccountingType: 1,
          Name: "华为M2平板电脑",
          ProName: "华为M2平板电脑",
          Color: "白色",
          Brand: "华为",
          SNCode: "",
          HaveImei: 0,
          ProType: 0,
          TradeFloorPrice: 2300,
          TradePrice: 2600,
          RetailFloorPrice: 2599,
          RetailPrice: 2999,
          PurchaseFloorPrice: 1800,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 1
        },
        {
          Id: 100021,
          ProId: 100021,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "三星 Galaxy Note9（SM-N9600 6GB+128G",
          ProName: "三星 Galaxy Note9（SM-N9600 6GB+128G",
          Color: "黑色",
          Brand: "三星",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 5500,
          RetailFloorPrice: 0,
          RetailPrice: 6900,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 2
        },
        {
          Id: 100022,
          ProId: 100022,
          CategoryId: 66,
          AccountingType: 1,
          Name: "三星 Galaxy Note9（SM-N9600 6GB+128G）玄镜铜",
          ProName: "三星 Galaxy Note9（SM-N9600 6GB+128G）玄镜铜",
          Color: "玄镜铜",
          Brand: "三星",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 5500,
          RetailFloorPrice: 0,
          RetailPrice: 6999,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 3
        },
        {
          Id: 100023,
          ProId: 100023,
          CategoryId: 66,
          AccountingType: 1,
          Name: "三星GALAXY S9+  6+64G（全网通） 谜夜黑",
          ProName: "三星GALAXY S9+  6+64G（全网通） 谜夜黑",
          Color: "谜夜黑",
          Brand: "三星",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 5000,
          RetailFloorPrice: 0,
          RetailPrice: 6199,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 4
        },
        {
          Id: 100024,
          ProId: 100024,
          CategoryId: 66,
          AccountingType: 3,
          Name: "畅享6  16g全网通 皓月白",
          ProName: "畅享6  16g全网通 皓月白",
          Color: "皓月白",
          Brand: "华为",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 901,
          RetailFloorPrice: 800,
          RetailPrice: 1000,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 5
        },
        {
          Id: 100025,
          ProId: 100025,
          CategoryId: 66,
          AccountingType: 1,
          Name: "畅享7 32g/全网通 白色",
          ProName: "畅享7 32g/全网通 白色",
          Color: "黑色",
          Brand: "华为",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 1000,
          RetailFloorPrice: 0,
          RetailPrice: 1500,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 6
        },
        {
          Id: 100026,
          ProId: 100026,
          CategoryId: 66,
          AccountingType: 1,
          Name: "三星 Galaxy Note9（SM-N9600 6GB+128G）丹青黑",
          ProName: "三星 Galaxy Note9（SM-N9600 6GB+128G）丹青黑",
          Color: "丹青黑",
          Brand: "三星",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 5500,
          RetailFloorPrice: 0,
          RetailPrice: 6999,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 7
        },
        {
          Id: 100027,
          ProId: 100027,
          CategoryId: 66,
          AccountingType: 1,
          Name: "畅享7 32g/全网通 黑色",
          ProName: "畅享7 32g/全网通 黑色",
          Color: "黑色",
          Brand: "华为",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 1000,
          RetailFloorPrice: 0,
          RetailPrice: 1500,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 8
        },
        {
          Id: 100028,
          ProId: 100028,
          CategoryId: 66,
          AccountingType: 1,
          Name: "iPhone 7 64g/全网通 磨砂黑",
          ProName: "iPhone 7 64g/全网通 磨砂黑",
          Color: "磨砂黑",
          Brand: "苹果",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 4500,
          RetailFloorPrice: 0,
          RetailPrice: 5000,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 9
        },
        {
          Id: 100029,
          ProId: 100029,
          CategoryId: 66,
          AccountingType: 1,
          Name: "iPhone7 64g/全网通 玫瑰金",
          ProName: "iPhone7 64g/全网通 玫瑰金",
          Color: "玫瑰金",
          Brand: "苹果",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 4500,
          RetailFloorPrice: 0,
          RetailPrice: 5000,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 10
        },
        {
          Id: 100036,
          ProId: 100036,
          CategoryId: 67,
          AccountingType: 1,
          Name: "乐视32寸智能电视",
          ProName: "乐视32寸智能电视",
          Color: "磨砂黑",
          Brand: "乐视",
          SNCode: "",
          HaveImei: 0,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 2000,
          RetailFloorPrice: 0,
          RetailPrice: 3000,
          PurchaseFloorPrice: 0,
          Amount: 0,
          AmountCanUsed: 0,
          RowId: 11
        }
      ]
    }
  },
  watch: {
    value(v) {
      // console.log(v)
    }
  }
}
</script>
<style lang="postcss">
  .list {
    display: flex;
    & .name {
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & .index {
      width: 30px;
      margin-left: 20px;
    }
  }
</style>
