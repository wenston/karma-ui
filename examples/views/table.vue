<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div style="margin-bottom: 10px;">

    <k-button @click="minContent=!minContent">宽度切换（min-content/auto）</k-button>
    </div>
    <k-table :data="dataList"
      height="calc(100vh - 170px)"
      :columns="columns"
      :selected-keys.sync="selectedKeys"
      :selected-rows.sync="selectedRows"
      :checkable="checkable"
      v-model="value"
      hasIndex
      hasAction
      hasRadio
      canHighlightRow
      resizeWidth
      :highlightValue.sync="highlightValue"
      :min-content="minContent"
      :stripe="false"
      :leftFixedNumber="3"
      @sort="onSort">
      <template slot="TotalPrice"
        slot-scope="{row}">
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
      minContent: true,
      value: '',
      highlightValue: '',
      dataList: table1.slice(0,15),
      selectedKeys: [],
      selectedRows: [],
      columns: [
        {
          name: "主体",
          style: {backgroundColor:'rgba(23,100,200,.1)'},
          children: [
            {
              name: "主体1",
              children: [
                {
                  style: { width: "150",backgroundColor:'rgba(255,255,0,.1)' },
                  name: () => <em>单号</em>,
                  customRender: row => <a href="javascript:;">{row.Code}</a>
                  // fixed: "left"
                },
                {
                  style: (row,index)=>{
                    if(row&&index!==null) {

                      if(index%2===0) {
                        return {
                          backgroundColor: '#333',
                          color: 'white'
                        }
                      }else {
                        return {
                          color: 'gold'
                        }
                      }
                    }
                  },
                  field: "SupplierName",
                  name: <span style="color:red">供应商</span>
                }
              ]
            },
            {
              name: "税率和金额",
              children: [
                {
                  field: "TaxRate",
                  name: "税率"
                },
                {
                
                  style: (row,index,obj)=>{
                    if(row) {
                      return {width: 60,textAlign:'right'}
                    }
                    if(obj.tfoot) {
                      return {width: 60,textAlign: 'right',color: '#999'}
                    }
                    return {width:60}
                  },
                  field: "TotalPrice",
                  name: "金额",
                  scopedSlots: "TotalPrice",
                  sorter: 1,
                  sum: true
                }
              ]
            }
          ]
        },

        {
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
          name: "制单",
          children: [
            {
              
              style: (row,index,obj)=>{
                if(row) {
                  return {
                    color:  'darkblue'
                  }
                }else if(obj.thead) {
                  return {
                    backgroundColor: 'black',
                    color: '#999'
                  }
                }else{
                  return {
                    backgroundColor: 'brown'
                  }
                }
              },
              field: "UserNameAdded",
              name: "制单人"
            },
            {
              field: "DateAdded",
              name: "制单时间",
              customRender:row=>{
                return <div class="k-ellipsis">{row.DateAdded}</div>
              }
            }
          ]
        },

        // {
        //   style: { width: "60" },
        //   field: "Status",
        //   name: "状态"
        // },
        // {
        //   // style: { width: "69" },
        //   field: "PrintCount",
        //   name: "打印次数"
        // },
        // {
        //   style: { width: "70" },
        //   field: "Action",
        //   name: "操作",
        //   // fixed: "right",
        //   customRender: ({ row, index }) => {
        //     return <a href="javascript:;">删除</a>
        //   }
        // }
      ]
    }
  },
  methods: {
    onSort(obj) {
      console.log(obj)
    },
    checkable(row,index){
      if(row.TotalPrice<500) {
        return [true,false]
      }
      return [false,true]
    }
  },
  mounted() {
    setTimeout(()=>{
      this.highlightValue = '1,1492'
      // this.selectedKeys = ['1500','2962']
      // this.selectedRows = [{"SupplierId":100005,"SupplierName":"华为技术有限公司","FinalPrice":200,"HaveWorkFlow":0,"BalanceCode":"","TradeMode":0,"TaxRate":0,"Code":"PC04201907020001","TotalPrice":200,"Description":"","Source":0,"SourceCode":null,"Status":3,"UserIdAdded":300124,"UserNameAdded":"秦鹏森","PrintCount":0,"StoreId":9,"BranchId":129,"HandlerId":300124,"HandlerName":"秦鹏森","ChkUserId":0,"ChkUserName":null,"ChkDateTime":null,"CompanyCode":"S00000186","PayType":0,"Receipt":0,"UserBranchId":0,"Id":1491,"DateAdded":"2019-07-02 15:21:55","StoreName":"总仓","BalanceName":"","Details":[{"PurchasingContractCode":"PC04201907020001","ProCount1":0,"StoreId":9,"Status":3,"SupplierId":100005,"CategoryId":301374,"ProName":"小夜灯","ProId":300038,"ProPrice":200,"AccountingType":1,"ProCount":1,"TaxRate":1,"Description":"","Description1":"","Description2":"","Id":2946,"DateAdded":"2019-07-05 10:38:55"}]},{"SupplierId":100005,"SupplierName":"华为技术有限公司","FinalPrice":200,"HaveWorkFlow":0,"BalanceCode":"","TradeMode":0,"TaxRate":0,"Code":"PC04201907040001","TotalPrice":200,"Description":"","Source":0,"SourceCode":null,"Status":6,"UserIdAdded":10,"UserNameAdded":"张总","PrintCount":0,"StoreId":9,"BranchId":129,"HandlerId":10,"HandlerName":"张总","ChkUserId":0,"ChkUserName":null,"ChkDateTime":null,"CompanyCode":"S00000186","PayType":0,"Receipt":0,"UserBranchId":0,"Id":1500,"DateAdded":"2019-07-04 11:31:21","StoreName":"总仓","BalanceName":"","Details":[{"PurchasingContractCode":"PC04201907040001","ProCount1":1,"StoreId":9,"Status":6,"SupplierId":100005,"CategoryId":301374,"ProName":"小夜灯","ProId":300038,"ProPrice":200,"AccountingType":1,"ProCount":1,"TaxRate":1,"Description":"","Description1":"","Description2":"","Id":2962,"DateAdded":"2019-07-05 10:38:55"}]}]
    },1000)
  }
}
</script>
<style lang="postcss" module="css">
</style>

