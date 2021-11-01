<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <k-table :data="table"
      :min-content="false"
      :columns="columns"
      leftFixedNumber="2"
      has-radio
      radio-key="name"
      has-index
      pageSize="20"
      pageIndex="3"
      index-text="序"
      nowrap
      resize-width
      max-height="calc(100vh - 130px)"
      canHighlightRow
      draggable
      highlightKey="name"
      :highlightValue.sync="highlightValue"></k-table>
    <h3 class="layout__title">自定义列</h3>

    <k-table :data="table1"
      :min-content="true"
      :columns="fnColumns()"
      hasCheckbox
      @select-change="onSelectChange"
      size="big"
      nowrap
      hover
      resize-width
      height="200px"
      :stripe="false"
      :selectedRows.sync="selectedRows"
      :selectedKeys.sync="selectedKeys"
      :checkable="checkable"
      :leftFixedNumber="0"
      :rightFixedNumber="3"
      @sort="onSort"
      :draggable="true">
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
    <div>
      <k-button type="warning"
        @click="onClear">清空所选</k-button>
      <k-button @click="onShowSomeCol">根据条件展示特定列</k-button>
    </div>
    <h3 class="layout__title">测试有不能选择的情况</h3>
    <k-table :data="data3"
      :checkable="checkable3"
      :columns="columns3"
      :selectedKeys.sync="selectedKeys3"
      :selectedRows.sync="selectedRows3"
      @select-change="onSlcChange"
      hasCheckbox
      resizeWidth
      :min-content="false"
      checkboxKey="ProductId" />
    <h3 class="layout__title">根据数据自动合并行</h3>
    <!-- <k-table :data="table1"
      :columns="columns2"
      has-radio
      radioKey="Code,Id"
      v-model="currentId">
      <template slot="ProCount"
        slot-scope="{row1}">
        <k-input size="mini"
          v-model="row1.ProCount"
          block></k-input>
      </template>
    </k-table> -->

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
        DateAdded: "2018-11-28 09:21:21",
      },
    ],
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
    UserNameAdded: "李娜",
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
        ProCount: 3,
        TaxRate: 1,
        Description: "",
        Description1: "",
        Description2: "",
        Id: 1769,
        DateAdded: "2018-11-28 09:21:21",
      },
    ],
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
        DateAdded: "2018-11-28 09:21:21",
      },
    ],
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
        DateAdded: "2018-11-28 09:21:21",
      },
    ],
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
        DateAdded: "2018-11-28 09:21:21",
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
        DateAdded: "2018-11-28 09:21:21",
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
        DateAdded: "2018-11-28 09:21:21",
      },
    ],
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
        DateAdded: "2018-11-28 09:21:21",
      },
    ],
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
        DateAdded: "2018-11-28 09:21:21",
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
        DateAdded: "2018-11-28 09:21:21",
      },
    ],
  },
]
export default {
  data() {
    return {
      priceSorter: true,
      supplierSorter: 1,
      table: [
        {
          name: "明明",
          age: "10",
          class: "三年级一班",
          chinese: "90",
          math: "100",
          wuli: "80",
          english: "93",
          history: "100",
        },
        {
          name: "小花",
          age: "9",
          class: "三年级二班",
          chinese: "90",
          math: "99",
          wuli: "82",
          english: "90",
          history: "84",
        },
        {
          name: "小力",
          age: "10",
          class: "三年级三班",
          chinese: "100",
          math: "100",
          wuli: "89",
          english: "98",
          history: "89",
        },
        {
          name: "小娟",
          age: "9",
          class: "三年级一班",
          chinese: "92",
          math: "98",
          wuli: "63",
          english: "91",
          history: "96",
        },
        {
          name: "晓丽",
          age: "10",
          class: "三年级一班",
          chinese: "91",
          math: "91",
          wuli: "82",
          english: "93",
          history: "78",
        },
        {
          name: "志玲",
          age: "9",
          class: "三年级四班",
          chinese: "99",
          math: "98",
          wuli: "80",
          english: "90",
          history: "89",
        },
        {
          name: "小军",
          age: "9",
          class: "三年级一班",
          chinese: "92",
          math: "100",
          wuli: "59",
          english: "93",
          history: "81",
        },
        {
          name: "小刚",
          age: "9",
          class: "三年级二班",
          chinese: "93",
          math: "97",
          wuli: "80",
          english: "90",
          history: "89",
        },
      ],
      columns: [
        {
          name: () => {
            return <span style="color:red">学生信息</span>
          },
          fixed: "left",
          children: [
            {
              style: { width: 80 },
              field: "name",
              name: "姓名",
            },
            {
              style: { width: 80 },
              field: "age",
              name: "年龄",
            },
            {
              style: { width: 150 },
              field: "class",
              name: "班级",
            },
          ],
        },
        {
          name: "考试成绩",
          children: [
            {
              name: "文",
              children: [
                {
                  style: { width: 90 },
                  field: "chinese",
                  name: "语文",
                  // sum: true//需要汇总
                },
                {
                  style: { width: 90 },
                  field: "english",
                  name: "英语",
                },
                {
                  style: { width: 80 },
                  field: "history",
                  name: "历史",
                },
              ],
            },
            {
              name: "理",
              children: [
                {
                  style: { width: 90 },
                  field: "math",
                  name: "数学",
                },
                {
                  style: { width: 90 },
                  field: "wuli",
                  name: "物理",
                },
              ],
            },
          ],
        },
        {
          style: { width: 90 },
          field: "action",
          name: "操作",
          // fixed: "right",
          customRender: (row, index) => {
            return <a href="javascript:;">删除</a>
          },
        },
      ],
      table1,
      highlightValue: "小花",
      columns1: [
        {
          style: { width: "150" },
          field: "Code",
          name: "单号",
          scopedSlots: "xxx", //xxx是作用域插槽的名称
          // fixed: "left"
        },
        {
          style: { width: "100" },
          field: "SupplierName",
          name: "供应商",
        },
        {
          field: "TaxRate",
          name: "税率",
        },
        {
          style: { width: "80", textAlign: "right" },
          field: "TotalPrice",
          name: "金额",
          scopedSlots: "TotalPrice",
          sorter: 1,
        },
        {
          style: { width: "100" },
          field: "StoreName",
          name: "收货仓库",
        },
        {
          style: { width: "200" },
          field: "Detail",
          name: "商品",
          scopedSlots: "Detail",
          sorter: true,
        },
        {
          style: { width: "70" },
          field: "HandlerName",
          name: "经手人",
        },
        {
          style: { width: "70" },
          field: "UserNameAdded",
          name: "制单人",
        },
        {
          style: { width: "160" },
          field: "DateAdded",
          name: "制单时间",
        },
        {
          style: { width: "60" },
          field: "Status",
          name: "状态",
        },
        {
          // style: { width: "69" },
          field: "PrintCount",
          name: "打印次数",
        },
        {
          style: { width: "70" },
          field: "Action",
          name: "操作",
          // fixed: "right",
          customRender: ({ row, index }) => {
            return (
              <a href="javascript:;" onClick={() => this.onDel(row, index)}>
                删除
              </a>
            )
          },
        },
      ],
      //根据数据自动合并行
      columns2: [
        {
          style: { width: "150" },
          field: "Code",
          name: "单号",
        },
        {
          style: { width: "120" },
          field: "SupplierName",
          name: "供应商",
        },
        {
          style: { width: "70" },
          field: "Details.ProId", //json数组的情况
          name: "编码",
        },
        {
          style: { width: "200" },
          field: "Details.ProName",
          name: "商品",
        },
        {
          style: { width: "60", padding: "0 3px" },
          field: "Details.ProCount",
          name: "数量",
          scopedSlots: "ProCount",
          // sum: true
        },
        {
          style: { width: "100" },
          field: "StoreName",
          name: "收货仓库",
        },
        {
          style: { width: "100" },
          field: "HandlerName",
          name: "经手人",
        },
        {
          style: { width: "60" },
          field: "Details.Action",
          name: "操作",
          customRender: ({ row, row1, index1 }) => {
            return (
              <a
                href="javascript:;"
                onClick={() => this.onDel(row, row1, index1)}
              >
                删除
              </a>
            )
          },
        },
      ],
      currentId: "",
      selectedKeys: [],
      selectedRows: [],
      random: 0.6,
      data3: [
        {
          CustomerName: "大融商001",
          InitShopNumber: 3,
          ProductOrderId: 16,
          OrderKeyId: 10,
          SettleUnit: "单客户",
          ProductName: "b2b商城",
          MarketPrice: "5000元/年",
          SettlePrice: "2000元/年",
          BuyMonth: 12,
          ContractBeginDate: "2019-05-28",
          MarketSummaryPrice: 5000,
          SettleSummaryPrice: 2000,
          RemainMonth: 13,
          AuditResultCode: "00601",
          AuditResultName: "同意",
          CustomerId: 41,
          OrderId: "2019052810103777726",
          ValidityBeginDateByChannel: "2019-05-28",
          MarketPriceMonth: 416.67,
          SettlePriceMonth: 166.67,
          GiftDays: 7,
          ProductId: 3,
          OrderTypeCode: "00701",
          OrderTypeName: "渠道申请开通",
          OrderMemo: "我先开通一个b2b商城",
          HasOpened: "Y",
        },
        {
          CustomerName: "大融商001",
          InitShopNumber: 3,
          ProductOrderId: 30,
          OrderKeyId: 14,
          SettleUnit: "单门店",
          ProductName: "会员系统",
          MarketPrice: "500元/年",
          SettlePrice: "200元/年",
          BuyMonth: 24,
          ContractBeginDate: "2019-06-01",
          MarketSummaryPrice: 3000,
          SettleSummaryPrice: 1200,
          RemainMonth: 24,
          AuditResultCode: "00602",
          AuditResultName: "不同意",
          CustomerId: 41,
          OrderId: "2019052811305680704",
          ValidityBeginDateByChannel: "2019-06-01",
          MarketPriceMonth: 41.67,
          SettlePriceMonth: 16.67,
          GiftDays: 7,
          ProductId: 2,
          OrderTypeCode: "00701",
          OrderTypeName: "渠道申请开通",
          OrderMemo: "我先开通一个b2b商城",
          HasOpened: "N",
        },
        {
          CustomerName: "大融商001",
          InitShopNumber: 3,
          ProductOrderId: 31,
          OrderKeyId: 14,
          SettleUnit: "单门店",
          ProductName: "进销存系统",
          MarketPrice: "500元/年",
          SettlePrice: "200元/年",
          BuyMonth: 13,
          ContractBeginDate: "2019-05-31",
          MarketSummaryPrice: 1625,
          SettleSummaryPrice: 650,
          RemainMonth: 14,
          AuditResultCode: "00602",
          AuditResultName: "不同意",
          CustomerId: 41,
          OrderId: "2019052811305680704",
          ValidityBeginDateByChannel: "2019-05-31",
          MarketPriceMonth: 41.67,
          SettlePriceMonth: 16.67,
          GiftDays: 7,
          ProductId: 1,
          OrderTypeCode: "00701",
          OrderTypeName: "渠道申请开通",
          OrderMemo: "我先开通一个b2b商城",
          HasOpened: "N",
        },
      ],
      columns3: [
        {
          name: "功能模块",
          field: "ProductName",
          style: { width: 150 },
          fixed: "left",
        },
        {
          name: "结算单位",
          field: "SettleUnit",
        },
        {
          name: "市场价",
          style: { width: 90 },
          field: "MarketPrice",
        },
        {
          name: "结算价",
          style: { width: 90 },
          field: "SettlePrice",
        },
      ],
      selectedKeys3: [],
      selectedRows3: [],

      KEYS: ["1056", "1055", "1054", "1050", "1049"],
      ROWS: [
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
              DateAdded: "2018-11-28 09:21:21",
            },
          ],
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
          UserNameAdded: "李娜",
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
              ProCount: 3,
              TaxRate: 1,
              Description: "",
              Description1: "",
              Description2: "",
              Id: 1769,
              DateAdded: "2018-11-28 09:21:21",
            },
          ],
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
              DateAdded: "2018-11-28 09:21:21",
            },
          ],
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
              DateAdded: "2018-11-28 09:21:21",
            },
          ],
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
              DateAdded: "2018-11-28 09:21:21",
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
              DateAdded: "2018-11-28 09:21:21",
            },
          ],
        },
      ],
    }
  },
  methods: {
    checkable3(row, index) {
      if (row.HasOpened === "Y") {
        return [true, false]
      }
      return [false, true]
      // if (row.HasOpened && row.HasOpened.toLowerCase() === "n") {
      //     return [false, true]
      //   } else {
      //     return [true, false]
      //   }
    },
    checkable(row, index) {
      // console.log(row,index)
      if (row.SupplierName === "融商") {
        return [true, false]
      }
      return [false, true]
    },
    fnColumns() {
      const supplierSorter = this.supplierSorter
      const priceSorter = this.priceSorter
      const tax =
        this.random > 0.5
          ? {
              field: "TaxRate",
              name: "税率",
              sum: true,
            }
          : null
      return [
        {
          style: { width: "150" },
          field: "Code",
          name: "单号",
          scopedSlots: "xxx", //xxx是作用域插槽的名称
          fixed: "left",
        },
        {
          style: { width: "100" },
          field: "SupplierName",
          name: "供应商",
          sorter: supplierSorter,
        },
        tax,
        {
          style: { width: "80", textAlign: "right" },
          field: "TotalPrice",
          name: "金额",
          scopedSlots: "TotalPrice",
          sorter: priceSorter,
          sum: true,
        },
        {
          style: { width: "100" },
          field: "StoreName",
          name: "收货仓库",
        },
      ]
    },
    onShowSomeCol() {
      this.random = Math.random()
      console.log(this.random)
    },
    onSlcChange(checked, row, index) {
      // console.log(checked,row,index)
    },
    onSelectChange(e) {
      console.log(e)
    },
    onDel(row, row1, index) {
      console.log(row, row1, index)
      // row.Details.splice(index,1)
    },
    onSort({ type, field, name }) {
      console.log(type, field, name)
      // if(field=='SupplierName') {
      //   this.priceSorter = true
      // }else if(field=='TotalPrice') {
      //   this.supplierSorter = true
      // }
    },
    onClear() {
      this.selectedKeys = []
      this.selectedRows = []
    },
  },
  computed: {},
  watch: {
    currentId(v) {
      // console.log(v)
    },
    highlightValue(v) {
      // console.log(v)
    },
    selectedKeys(keys) {
      console.log(keys)
    },
    selectedRows(rows) {
      console.log(rows)
    },
  },
  mounted() {
    setTimeout(() => {
      // this.currentId = "PC04201811230002,1053"
      // this.selectedKeys3 = ['2','1']
      // this.selectedRows3 = this.data3.slice(1)
      this.selectedKeys = this.KEYS.slice(0)
      this.selectedRows = this.ROWS.slice(0)
    }, 0)
  },
}
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

