<template>
  <div class="layout">
    <h3 class="layout__title">table2</h3>
    <div>
      <k-table2 :data="data"
        :columns="columns"
        :hover="false"
        :row-data="baseRowData"
        max-height="calc(100vh - 120px)">
        <template slot="color"
          slot-scope="{row}">
          <k-input block
            no-style
            v-model="row.Color"></k-input>
        </template>
      </k-table2>
    </div>
  </div>
</template>

<script>
const baseRowData = () => ({
  ProName: "",
  Color: "",
  RetailPrice: "",
  ProCount: "",
  Id: "",
  ProId: ""
})
export default {
  data() {
    return {
      baseRowData,
      data: Array.apply(null, { length: 5 }).map(t => baseRowData()),
      columns: [
        {
          field: "ProName",
          name: "名称",
          style: (row, index) => {
            if (row) {
              return {
                padding: "2px"
              }
            }
            return { width: 200 }
          },
          customRender: (row, index) => {
            const p = {
              props: {
                value: row.ProId,
                data: this.list,
                noStyle: true,
                pageSize: 7,
                layerWidth: false //没值表示和输入框等宽
              },
              on: {
                valueChange: v => {
                  row.Id = row.ProId = v
                  console.log(v)
                },
                toggle: e => {
                  if (e.row) {
                    e.row.ProCount = 1
                    // this.data.splice(index,1,e.row)
                    // this.data[i]
                    console.log(this.data[index])
                    for (let k in row) {
                      this.data[index][k] = e.row[k]
                    }
                  } else {
                    this.data.splice(index, 1, baseRowData())
                  }
                }
              },
              scopedSlots: {
                default: ({ row, index }) => {
                  return (
                    <div>
                      <span>{row.ProName}</span>
                      <span>{index}</span>
                    </div>
                  )
                }
              }
            }
            {
              /**当选一个商品时，autoComple组件会被vue自动销毁，为什么？？？ */
            }
            return <k-auto-complete {...p}></k-auto-complete>
          }
        },
        {
          field: "Color",
          name: "颜色",
          hasWrapper: false,
          style: {
            width: 80,
            padding: "2px"
          },
          scopedSlots: "color"
        },
        {
          field: "RetailPrice",
          name: "单价",
          style: {
            width: 100
          },
          sum: true
        },
        {
          field: "ProCount",
          name: "数量",
          style: {
            width: 70,
            padding: "2px"
          },
          customRender: (row, index) => {
            const p = {
              props: {
                block: true,
                noStyle: true,
                value: row.ProCount,
                type: "number",
                min: 1,
                max: row.Amount
              },
              on: {
                valueChange: v => {
                  // row.ProCount = +v
                  this.data[index].ProCount = +v
                  this.data = JSON.parse(JSON.stringify(this.data))
                }
              }
            }
            return <k-input {...p} />
          },
          sum: true
        },
        {
          field: "Amount",
          name: "库存",
          style: {
            width: 70
          }
        },
        {
          field: "SubTotal",
          name: "金额",
          style: {
            width: 100
          }
        }
      ],
      value: "",
      list: [
        {
          Id: 300038,
          ProId: 300038,
          CategoryId: 300046,
          AccountingType: 1,
          Name: "小夜灯",
          ProName: "小夜灯",
          Color: "白色",
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
          Color: "牛奶白",
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
        },
        {
          Id: 300034,
          ProId: 300034,
          CategoryId: 300003,
          AccountingType: 1,
          Name: "贴膜",
          ProName: "贴膜",
          Color: "透明",
          Brand: "OPPO",
          SNCode: "",
          HaveImei: 0,
          ProType: 3,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 0,
          RetailPrice: 0,
          PurchaseFloorPrice: 0,
          Amount: 103,
          AmountCanUsed: 103,
          RowId: 3
        },
        {
          Id: 300035,
          ProId: 300035,
          CategoryId: 300003,
          AccountingType: 1,
          Name: "打印照片",
          ProName: "打印照片",
          Color: "紫色",
          Brand: "OPPO",
          SNCode: "",
          HaveImei: 0,
          ProType: 3,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 0,
          RetailPrice: 0,
          PurchaseFloorPrice: 0,
          Amount: 100,
          AmountCanUsed: 100,
          RowId: 4
        },
        {
          Id: 303964,
          ProId: 303964,
          CategoryId: 301364,
          AccountingType: 1,
          Name: "贴膜卡",
          ProName: "贴膜卡",
          Color: "无",
          Brand: "无",
          SNCode: "",
          HaveImei: 0,
          ProType: 4,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 0,
          RetailPrice: 0,
          PurchaseFloorPrice: 0,
          Amount: 89,
          AmountCanUsed: 89,
          RowId: 5
        },
        {
          Id: 300036,
          ProId: 300036,
          CategoryId: 300003,
          AccountingType: 1,
          Name: "苹果原装数据线",
          ProName: "苹果原装数据线",
          Color: "白",
          Brand: "苹果",
          SNCode: "",
          HaveImei: 0,
          ProType: 3,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 0,
          RetailPrice: 0,
          PurchaseFloorPrice: 0,
          Amount: 80,
          AmountCanUsed: 80,
          RowId: 6
        },
        {
          Id: 303378,
          ProId: 303378,
          CategoryId: 300003,
          AccountingType: 1,
          Name: "水杯",
          ProName: "水杯",
          Color: "无",
          Brand: "无",
          SNCode: "",
          HaveImei: 0,
          ProType: 3,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 0,
          RetailPrice: 0,
          PurchaseFloorPrice: 0,
          Amount: 80,
          AmountCanUsed: 80,
          RowId: 7
        },
        {
          Id: 303515,
          ProId: 303515,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "荣耀magic2 6+128G 渐变蓝",
          ProName: "荣耀magic2 6+128G 渐变蓝",
          Color: "渐变蓝",
          Brand: "荣耀",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 3699,
          RetailFloorPrice: 0,
          RetailPrice: 3799,
          PurchaseFloorPrice: 0,
          Amount: 80,
          AmountCanUsed: 78,
          RowId: 8
        },
        {
          Id: 303321,
          ProId: 303321,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "诺比亚X 4+64 渐变红",
          ProName: "诺比亚X 4+64 渐变红",
          Color: "渐变红",
          Brand: "努比亚1",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 2300,
          RetailFloorPrice: 0,
          RetailPrice: 2499,
          PurchaseFloorPrice: 0,
          Amount: 28,
          AmountCanUsed: 28,
          RowId: 9
        },
        {
          Id: 302893,
          ProId: 302893,
          CategoryId: 300196,
          AccountingType: 1,
          Name: "努比亚z18   6+64  极夜黑",
          ProName: "努比亚z18   6+64  极夜黑",
          Color: "宝石蓝",
          Brand: "努比亚1",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 2700,
          RetailFloorPrice: 0,
          RetailPrice: 2799,
          PurchaseFloorPrice: 0,
          Amount: 19,
          AmountCanUsed: 19,
          RowId: 10
        },
        {
          Id: 303375,
          ProId: 303375,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "努比亚红魔2 6+64g  流沙金",
          ProName: "努比亚红魔2 6+64g  流沙金",
          Color: "流沙金",
          Brand: "努比亚1",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 3500,
          RetailFloorPrice: 0,
          RetailPrice: 3600,
          PurchaseFloorPrice: 0,
          Amount: 11,
          AmountCanUsed: 11,
          RowId: 11
        },
        {
          Id: 303518,
          ProId: 303518,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "荣耀magic2 8+128G 渐变黑",
          ProName: "荣耀magic2 8+128G 渐变黑",
          Color: "渐变黑",
          Brand: "荣耀",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 4099,
          RetailFloorPrice: 0,
          RetailPrice: 4299,
          PurchaseFloorPrice: 0,
          Amount: 6,
          AmountCanUsed: 6,
          RowId: 12
        },
        {
          Id: 303524,
          ProId: 303524,
          CategoryId: 300046,
          AccountingType: 1,
          Name: "中关村记事本",
          ProName: "中关村记事本",
          Color: "橙色",
          Brand: "zol",
          SNCode: "",
          HaveImei: 0,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 0,
          RetailPrice: 0,
          PurchaseFloorPrice: 0,
          Amount: 6,
          AmountCanUsed: 6,
          RowId: 13
        },
        {
          Id: 303519,
          ProId: 303519,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "荣耀magic2 8+128G 渐变红",
          ProName: "荣耀magic2 8+128G 渐变红",
          Color: "渐变红",
          Brand: "荣耀",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 4099,
          RetailFloorPrice: 0,
          RetailPrice: 4299,
          PurchaseFloorPrice: 0,
          Amount: 5,
          AmountCanUsed: 5,
          RowId: 14
        },
        {
          Id: 303517,
          ProId: 303517,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "荣耀magic2 6+128G 渐变黑",
          ProName: "荣耀magic2 6+128G 渐变黑",
          Color: "渐变黑",
          Brand: "荣耀",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 3699,
          RetailFloorPrice: 0,
          RetailPrice: 3799,
          PurchaseFloorPrice: 0,
          Amount: 4,
          AmountCanUsed: 4,
          RowId: 15
        },
        {
          Id: 300020,
          ProId: 300020,
          CategoryId: 66,
          AccountingType: 1,
          Name: "华为 P20 6G+64G 蓝色",
          ProName: "华为 P20 6G+64G 蓝色",
          Color: "蓝色",
          Brand: "华为",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 3388,
          RetailFloorPrice: 0,
          RetailPrice: 3688,
          PurchaseFloorPrice: 0,
          Amount: 2,
          AmountCanUsed: 2,
          RowId: 16
        },
        {
          Id: 300029,
          ProId: 300029,
          CategoryId: 66,
          AccountingType: 1,
          Name: "OPPO FindX 8G+256G 红色",
          ProName: "OPPO FindX 8G+256G 红色",
          Color: "红色",
          Brand: "OPPO",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 6000,
          RetailFloorPrice: 0,
          RetailPrice: 6500,
          PurchaseFloorPrice: 0,
          Amount: 2,
          AmountCanUsed: 2,
          RowId: 17
        },
        {
          Id: 303937,
          ProId: 303937,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "荣耀11 6+128 全网通 白色",
          ProName: "荣耀11 6+128 全网通 白色",
          Color: "白色",
          Brand: "荣耀",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 3999,
          RetailPrice: 3999,
          PurchaseFloorPrice: 0,
          Amount: 2,
          AmountCanUsed: 2,
          RowId: 18
        },
        {
          Id: 303963,
          ProId: 303963,
          CategoryId: 301090,
          AccountingType: 2,
          Name: "华为nova4",
          ProName: "华为nova4",
          Color: "渐变蓝",
          Brand: "华为",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 2399,
          TradePrice: 2799,
          RetailFloorPrice: 2299,
          RetailPrice: 2999,
          PurchaseFloorPrice: 1999,
          Amount: 2,
          AmountCanUsed: 2,
          RowId: 19
        },
        {
          Id: 100687,
          ProId: 100687,
          CategoryId: 66,
          AccountingType: 1,
          Name: "华为MATE9 PRO  6+128G",
          ProName: "华为MATE9 PRO  6+128G",
          Color: "金色",
          Brand: "华为",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 0,
          RetailFloorPrice: 0,
          RetailPrice: 3999,
          PurchaseFloorPrice: 0,
          Amount: 1,
          AmountCanUsed: 1,
          RowId: 20
        },
        {
          Id: 300024,
          ProId: 300024,
          CategoryId: 66,
          AccountingType: 1,
          Name: "华为 P20Pro 6G+128G 极光色",
          ProName: "华为 P20Pro 6G+128G 极光色",
          Color: "极光色",
          Brand: "华为",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 4888,
          RetailFloorPrice: 0,
          RetailPrice: 5288,
          PurchaseFloorPrice: 0,
          Amount: 1,
          AmountCanUsed: 1,
          RowId: 21
        },
        {
          Id: 300025,
          ProId: 300025,
          CategoryId: 66,
          AccountingType: 1,
          Name: "VIVO X23 8G+128G 紫色",
          ProName: "VIVO X23 8G+128G 紫色",
          Color: "紫色",
          Brand: "VIVO",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 3500,
          RetailFloorPrice: 0,
          RetailPrice: 3800,
          PurchaseFloorPrice: 0,
          Amount: 1,
          AmountCanUsed: 1,
          RowId: 22
        },
        {
          Id: 300249,
          ProId: 300249,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "OPPO A5全网通3+64G幻镜粉",
          ProName: "OPPO A5全网通3+64G幻镜粉",
          Color: "幻镜粉",
          Brand: "OPPO",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 888,
          RetailFloorPrice: 0,
          RetailPrice: 0,
          PurchaseFloorPrice: 0,
          Amount: 1,
          AmountCanUsed: 1,
          RowId: 23
        },
        {
          Id: 303516,
          ProId: 303516,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "荣耀magic2 6+128G 渐变红",
          ProName: "荣耀magic2 6+128G 渐变红",
          Color: "渐变红",
          Brand: "荣耀",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 3699,
          RetailFloorPrice: 0,
          RetailPrice: 3799,
          PurchaseFloorPrice: 0,
          Amount: 1,
          AmountCanUsed: 1,
          RowId: 24
        },
        {
          Id: 303520,
          ProId: 303520,
          CategoryId: 300196,
          AccountingType: 3,
          Name: "荣耀magic2 8+128G 渐变蓝",
          ProName: "荣耀magic2 8+128G 渐变蓝",
          Color: "渐变蓝",
          Brand: "荣耀",
          SNCode: "",
          HaveImei: 1,
          ProType: 0,
          TradeFloorPrice: 0,
          TradePrice: 4099,
          RetailFloorPrice: 0,
          RetailPrice: 4299,
          PurchaseFloorPrice: 0,
          Amount: 1,
          AmountCanUsed: 1,
          RowId: 25
        }
      ]
    }
  },
  watch: {
    data(d) {
      console.log(d)
    }
  }
}
</script>

<style>
</style>
