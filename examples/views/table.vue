<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <k-table :data="table"
      :columns="columns"
      has-checkbox
      checkbox-key="name"
      table-layout-auto
      @select-change="onSelectChange"></k-table>
    <h3 class="layout__title">自定义列</h3>

    <k-table :data="table1"
      height="200px"
      has-checkbox
      :columns="columns1"
      @select-change="onSelectChange"
      size="huge">
      <template slot="xxx"
        slot-scope="{row}">
        <a :class="css.code"
          href="javascript:;">{{row.Code}}</a>
      </template>
      <b slot="TotalPrice"
        style="color:red;"
        slot-scope="scope">
        {{parseFloat(scope.row.TotalPrice).toFixed(2)}}</b>
      <ul slot="Detail"
        :class="css.detail"
        slot-scope="{row}">
        <li v-for="item in row.Details"
          :key="item.Id">
          {{item.ProName}} &times; {{item.ProCount}}
        </li>
      </ul>
    </k-table>
    <h3 class="layout__title">根据数据自动合并行</h3>
    <k-table :data="table1"
      :columns="columns2">
      <template slot="ProCount"
        slot-scope="{row1,index1}">
        <k-input size="mini"
          v-model="row1.ProCount"
          block></k-input>
      </template>
    </k-table>

  </div>
</template>

<script>
let table1 = [
  {
    SupplierId: 300048,
    SupplierName: "郑州捷信",
    FinalPrice: 6000,
    HaveWorkFlow: 0,
    BalanceCode: "",
    TradeMode: 0,
    TaxRate: 0,
    Code: "PC04201811230005",
    TotalPrice: 6000,
    Description: "",
    Source: 0,
    SourceCode: null,
    Status: 6,
    UserIdAdded: 10,
    UserNameAdded: "张总",
    PrintCount: 0,
    StoreId: 8,
    BranchId: 0,
    HandlerId: 10,
    HandlerName: "张总",
    ChkUserId: 0,
    ChkUserName: null,
    ChkDateTime: null,
    CompanyCode: "S00000186",
    PayType: 0,
    Receipt: 0,
    UserBranchId: 0,
    Id: 1056,
    DateAdded: "2018-11-23 17:58:05",
    StoreName: "渠道总仓",
    BalanceName: "",
    Details: [
      {
        PurchasingContractCode: "PC04201811230005",
        ProCount1: 2,
        StoreId: 8,
        Status: 6,
        SupplierId: 300048,
        CategoryId: 120,
        ProName: "华为MATE9 PRO  6+128G",
        ProId: 100687,
        ProPrice: 3000,
        AccountingType: 1,
        ProCount: 2,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1770,
        DateAdded: "2018-11-28 09:21:21"
      }
    ]
  },
  {
    SupplierId: 100119,
    SupplierName: "融商智选1",
    FinalPrice: 5000,
    HaveWorkFlow: 0,
    BalanceCode: "",
    TradeMode: 0,
    TaxRate: 5,
    Code: "PC04201811230004",
    TotalPrice: 5000,
    Description: "",
    Source: 0,
    SourceCode: null,
    Status: 6,
    UserIdAdded: 10,
    UserNameAdded: "张总",
    PrintCount: 0,
    StoreId: 29,
    BranchId: 0,
    HandlerId: 10,
    HandlerName: "张总",
    ChkUserId: 0,
    ChkUserName: null,
    ChkDateTime: null,
    CompanyCode: "S00000186",
    PayType: 0,
    Receipt: 1,
    UserBranchId: 0,
    Id: 1055,
    DateAdded: "2018-11-23 16:41:47",
    StoreName: "海龙门店",
    BalanceName: "",
    Details: [
      {
        PurchasingContractCode: "PC04201811230004",
        ProCount1: 2,
        StoreId: 29,
        Status: 6,
        SupplierId: 100119,
        CategoryId: 124,
        ProName: "努比亚Z17 64g 黑灰色",
        ProId: 100040,
        ProPrice: 2500,
        AccountingType: 1,
        ProCount: 2,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1769,
        DateAdded: "2018-11-28 09:21:21"
      }
    ]
  },
  {
    SupplierId: 300053,
    SupplierName: "测试供应商",
    FinalPrice: 100,
    HaveWorkFlow: 0,
    BalanceCode: "100217",
    TradeMode: 0,
    TaxRate: 4,
    Code: "PC04201811230003",
    TotalPrice: 100,
    Description: "",
    Source: 0,
    SourceCode: null,
    Status: 6,
    UserIdAdded: 10,
    UserNameAdded: "张总",
    PrintCount: 0,
    StoreId: 9,
    BranchId: 0,
    HandlerId: 300014,
    HandlerName: "林小静",
    ChkUserId: 0,
    ChkUserName: null,
    ChkDateTime: null,
    CompanyCode: "S00000186",
    PayType: 0,
    Receipt: 1,
    UserBranchId: 0,
    Id: 1054,
    DateAdded: "2018-11-23 15:42:29",
    StoreName: "总仓",
    BalanceName: "农业银行111",
    Details: [
      {
        PurchasingContractCode: "PC04201811230003",
        ProCount1: 5,
        StoreId: 9,
        Status: 6,
        SupplierId: 300053,
        CategoryId: 300008,
        ProName: "小夜灯",
        ProId: 300038,
        ProPrice: 20,
        AccountingType: 1,
        ProCount: 5,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1768,
        DateAdded: "2018-11-28 09:21:21"
      }
    ]
  },
  {
    SupplierId: 300049,
    SupplierName: "融商",
    FinalPrice: 0,
    HaveWorkFlow: 0,
    BalanceCode: "",
    TradeMode: 0,
    TaxRate: 0,
    Code: "PC04201811230002",
    TotalPrice: 0,
    Description: "",
    Source: 0,
    SourceCode: null,
    Status: 6,
    UserIdAdded: 10,
    UserNameAdded: "张总",
    PrintCount: 0,
    StoreId: 9,
    BranchId: 0,
    HandlerId: 10,
    HandlerName: "张总",
    ChkUserId: 0,
    ChkUserName: null,
    ChkDateTime: null,
    CompanyCode: "S00000186",
    PayType: 0,
    Receipt: 0,
    UserBranchId: 0,
    Id: 1053,
    DateAdded: "2018-11-23 14:07:04",
    StoreName: "总仓",
    BalanceName: "",
    Details: [
      {
        PurchasingContractCode: "PC04201811230002",
        ProCount1: 1,
        StoreId: 9,
        Status: 6,
        SupplierId: 300049,
        CategoryId: 300745,
        ProName: "299云商礼包",
        ProId: 303386,
        ProPrice: 0,
        AccountingType: 3,
        ProCount: 1,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1767,
        DateAdded: "2018-11-28 09:21:21"
      }
    ]
  },
  {
    SupplierId: 300049,
    SupplierName: "融商",
    FinalPrice: 10000,
    HaveWorkFlow: 0,
    BalanceCode: "",
    TradeMode: 0,
    TaxRate: 0,
    Code: "PC04201811230001",
    TotalPrice: 10000,
    Description: "",
    Source: 0,
    SourceCode: null,
    Status: 6,
    UserIdAdded: 300008,
    UserNameAdded: "付世杰",
    PrintCount: 0,
    StoreId: 9,
    BranchId: 129,
    HandlerId: 300008,
    HandlerName: "付世杰",
    ChkUserId: 0,
    ChkUserName: null,
    ChkDateTime: null,
    CompanyCode: "S00000186",
    PayType: 0,
    Receipt: 0,
    UserBranchId: 0,
    Id: 1052,
    DateAdded: "2018-11-23 09:53:24",
    StoreName: "总仓",
    BalanceName: "",
    Details: [
      {
        PurchasingContractCode: "PC04201811230001",
        ProCount1: 40,
        StoreId: 9,
        Status: 6,
        SupplierId: 300049,
        CategoryId: 300718,
        ProName: "云商礼包",
        ProId: 303385,
        ProPrice: 100,
        AccountingType: 3,
        ProCount: 40,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1764,
        DateAdded: "2018-11-28 09:21:21"
      },
      {
        PurchasingContractCode: "PC04201811230001",
        ProCount1: 20,
        StoreId: 9,
        Status: 6,
        SupplierId: 300049,
        CategoryId: 300745,
        ProName: "399云商大礼包",
        ProId: 303384,
        ProPrice: 200,
        AccountingType: 3,
        ProCount: 20,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1765,
        DateAdded: "2018-11-28 09:21:21"
      },
      {
        PurchasingContractCode: "PC04201811230001",
        ProCount1: 20,
        StoreId: 9,
        Status: 6,
        SupplierId: 300049,
        CategoryId: 300745,
        ProName: "299云商礼包",
        ProId: 303386,
        ProPrice: 100,
        AccountingType: 3,
        ProCount: 20,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1766,
        DateAdded: "2018-11-28 09:21:21"
      }
    ]
  },
  {
    SupplierId: 300048,
    SupplierName: "郑州捷信",
    FinalPrice: 3000,
    HaveWorkFlow: 0,
    BalanceCode: "",
    TradeMode: 0,
    TaxRate: 0,
    Code: "PC04201811220001",
    TotalPrice: 3000,
    Description: "",
    Source: 0,
    SourceCode: null,
    Status: 6,
    UserIdAdded: 10,
    UserNameAdded: "张总",
    PrintCount: 0,
    StoreId: 9,
    BranchId: 0,
    HandlerId: 10,
    HandlerName: "张总",
    ChkUserId: 0,
    ChkUserName: null,
    ChkDateTime: null,
    CompanyCode: "S00000186",
    PayType: 0,
    Receipt: 0,
    UserBranchId: 0,
    Id: 1050,
    DateAdded: "2018-11-22 15:06:51",
    StoreName: "总仓",
    BalanceName: "",
    Details: [
      {
        PurchasingContractCode: "PC04201811220001",
        ProCount1: 100,
        StoreId: 9,
        Status: 6,
        SupplierId: 300048,
        CategoryId: 301045,
        ProName: "蓝牙耳机",
        ProId: 303382,
        ProPrice: 30,
        AccountingType: 1,
        ProCount: 100,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1762,
        DateAdded: "2018-11-28 09:21:21"
      }
    ]
  },
  {
    SupplierId: 300051,
    SupplierName: "演示供应商",
    FinalPrice: 20,
    HaveWorkFlow: 0,
    BalanceCode: "",
    TradeMode: 0,
    TaxRate: 0,
    Code: "PC04201811210001",
    TotalPrice: 20,
    Description: "",
    Source: 0,
    SourceCode: null,
    Status: 6,
    UserIdAdded: 300012,
    UserNameAdded: "智选云商",
    PrintCount: 0,
    StoreId: 9,
    BranchId: 129,
    HandlerId: 300012,
    HandlerName: "智选云商",
    ChkUserId: 0,
    ChkUserName: null,
    ChkDateTime: null,
    CompanyCode: "S00000186",
    PayType: 0,
    Receipt: 0,
    UserBranchId: 0,
    Id: 1049,
    DateAdded: "2018-11-21 17:58:52",
    StoreName: "总仓",
    BalanceName: "",
    Details: [
      {
        PurchasingContractCode: "PC04201811210001",
        ProCount1: 1,
        StoreId: 9,
        Status: 6,
        SupplierId: 300051,
        CategoryId: 301016,
        ProName: "水杯",
        ProId: 303378,
        ProPrice: 10,
        AccountingType: 3,
        ProCount: 1,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1760,
        DateAdded: "2018-11-28 09:21:21"
      },
      {
        PurchasingContractCode: "PC04201811210001",
        ProCount1: 1,
        StoreId: 9,
        Status: 6,
        SupplierId: 300051,
        CategoryId: 301016,
        ProName: "计算器",
        ProId: 303379,
        ProPrice: 10,
        AccountingType: 3,
        ProCount: 1,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1761,
        DateAdded: "2018-11-28 09:21:21"
      }
    ]
  }
];
export default {
  data() {
    return {
      table: [
        {
          name: "明明",
          age: "10",
          class: "三年级一班",
          chinese: "90",
          math: "100"
        },
        {
          name: "小花",
          age: "9",
          class: "三年级二班",
          chinese: "90",
          math: "99"
        },
        {
          name: "小军",
          age: "9",
          class: "三年级一班",
          chinese: "92",
          math: "100"
        }
      ],
      columns: [
        {
          field: "name",
          name: "姓名"
        },
        {
          field: "age",
          name: "年龄"
        },
        {
          field: "class",
          name: "班级"
        },
        {
          field: "chinese",
          name: "语文"
        }
      ],
      table1,
      columns1: [
        {
          style: { width: "150" },
          field: "Code",
          name: "单号",
          scopedSlots: "xxx" //xxx是作用域插槽的名称
        },
        {
          style: { width: "150" },
          field: "SupplierName",
          name: "供应商"
        },
        {
          style: { width: "80", textAlign: "right" },
          field: "TotalPrice",
          name: "金额",
          scopedSlots: "TotalPrice"
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
          scopedSlots: "Detail"
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
          style: { width: "69" },
          field: "PrintCount",
          name: "打印次数"
        }
      ],
      //根据数据自动合并行
      columns2: [
        {
          style: { width: "150" },
          field: "Code",
          name: "单号"
        },
        {
          style: { width: "120" },
          field: "SupplierName",
          name: "供应商"
        },
        {
          style: { width: "70" },
          field: "Details.ProId", //json数组的情况
          name: "编码"
        },
        {
          style: { width: "200" },
          field: "Details.ProName",
          name: "商品"
        },
        {
          style: { width: "60",padding:'0 3px' },
          field: "Details.ProCount",
          name: "数量",
          scopedSlots: "ProCount"
        },
        {
          style: { width: "100" },
          field: "StoreName",
          name: "收货仓库"
        },
        {
          style: { width: "100" },
          field: "HandlerName",
          name: "经手人"
        },
        {
          style: {width: '60'},
          field: 'Action',
          name: '操作',
          customRender: (row,index) =>{
            return <a href="javascript:;" onClick={()=>this.onDel(index)}>删除</a>
          }
        }
      ]
    };
  },
  methods: {
    onSelectChange(arr) {
      console.log(arr);
    },
    onDel(index) {
      this.table1.splice(index,1)
    }
  }
};
</script>
<style lang="postcss" module="css">
.code {
  color: #378cee;
  &:hover {
    text-decoration: underline;
    color: #378cee;
  }
}
.detail {
  padding: 0;
  li {
    list-style-type: none;
  }
}
</style>

