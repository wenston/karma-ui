<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <k-select-tree style="line-height:normal;display:inline-block;"
        :data="dataList"
        :show.sync="show"
        childField="Childs"
        textField="Name"
        keyField="Id"
        v-model="myId"
        text='测试一下'
        @toggle="onToggle">
        <k-button slot="footer">footer</k-button>
      </k-select-tree>
      <k-select-tree :data="data1"
        v-model="val"
        :text="text1"
        :show.sync="show1"
        clearable></k-select-tree>
    </div>
    <h3 class="layout__title">基本用法(数据较多)</h3>
    <div>
      <k-select-tree 
        :data="data2"
        size='huge'
        keyField='atid'
        childField='childs'
        searchField='atname'
        textField='atname'
        :show.sync="show"
        showTitleLevel='2'
        levelField='areaLevel'
        block
        text='测试一下'
        hasCheckbox
        selected-rule="every"
        :selected-data.sync="selectedData"
        :selected-keys.sync="selectedKeys"
        clearable />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      myId: '',
      show1: false,
      data: [],
      data1: [],
      val: "",
      dataList: [
        {
          Id: 1,
          Name: "手机",
          PId: 0,
          Childs: [
            {
              Id: 14,
              Name: "荣耀",
              PId: 1,
              Childs: [
                { Id: 28, Name: "mate20", PId: 14, Childs: [] },
                { Id: 85, Name: "magic2", PId: 14, Childs: [] },
                { Id: 55, Name: "8x", PId: 14, Childs: [] }
              ]
            },
            { Id: 4, Name: "华为", PId: 1, Childs: [] },
            { Id: 41, Name: "小米", PId: 1, Childs: [] },
            { Id: 15, Name: "锤子", PId: 1, Childs: [] },
            {
              Id: 63,
              Name: "苹果",
              PId: 1,
              Childs: [
                { Id: 225, Name: "iphoneX", PId: 63, Childs: [] },
                { Id: 227, Name: "iphone6", PId: 63, Childs: [] }
              ]
            },
            {
              Id: 86,
              Name: "OPPO",
              PId: 1,
              Childs: [{ Id: 87, Name: "r17", PId: 86, Childs: [] }]
            },
            {
              Id: 92,
              Name: "努比亚",
              PId: 1,
              Childs: [{ Id: 93, Name: "红魔", PId: 92, Childs: [] }]
            },
            {
              Id: 107,
              Name: "VIVO",
              PId: 1,
              Childs: [{ Id: 108, Name: "VIVO  NEX", PId: 107, Childs: [] }]
            }
          ]
        },
        {
          Id: 2,
          Name: "电脑",
          PId: 0,
          Childs: [
            {
              Id: 36,
              Name: "戴尔",
              PId: 2,
              Childs: [
                { Id: 39, Name: "毁灭者", PId: 36, Childs: [] },
                { Id: 40, Name: "飞行堡垒", PId: 36, Childs: [] }
              ]
            },
            { Id: 37, Name: "惠普", PId: 2, Childs: [] },
            { Id: 38, Name: "苹果", PId: 2, Childs: [] },
            { Id: 84, Name: "联想", PId: 2, Childs: [] }
          ]
        },
        { Id: 29, Name: "智能穿戴", PId: 0, Childs: [] },
        { Id: 10, Name: "家电", PId: 0, Childs: [] },
        {
          Id: 13,
          Name: "文具",
          PId: 0,
          Childs: [
            {
              Id: 23,
              Name: "书本类",
              PId: 13,
              Childs: [
                { Id: 25, Name: "英语本", PId: 23, Childs: [] },
                { Id: 24, Name: "数学本", PId: 23, Childs: [] }
              ]
            },
            {
              Id: 22,
              Name: "体育类1",
              PId: 13,
              Childs: [
                { Id: 26, Name: "足球", PId: 22, Childs: [] },
                { Id: 27, Name: "跳绳", PId: 22, Childs: [] }
              ]
            },
            {
              Id: 64,
              Name: "教材类",
              PId: 13,
              Childs: [{ Id: 65, Name: "小学教材", PId: 64, Childs: [] }]
            }
          ]
        },
        {
          Id: 42,
          Name: "配件",
          PId: 0,
          Childs: [
            {
              Id: 43,
              Name: "耳机",
              PId: 42,
              Childs: [{ Id: 44, Name: "蓝牙", PId: 43, Childs: [] }]
            }
          ]
        },
        {
          Id: 77,
          Name: "华为",
          PId: 0,
          Childs: [
            {
              Id: 78,
              Name: "Nova",
              PId: 77,
              Childs: [{ Id: 79, Name: "Nova4", PId: 78, Childs: [] }]
            }
          ]
        },
        {
          Id: 88,
          Name: "智能周边",
          PId: 0,
          Childs: [
            {
              Id: 89,
              Name: "智能机器人",
              PId: 88,
              Childs: [{ Id: 90, Name: "小艾机器人", PId: 89, Childs: [] }]
            }
          ]
        }
      ],
      checkedData: [
        {
          Id: 42,
          Name: "配件",
          PId: 0,
          Childs: [
            {
              Id: 43,
              Name: "耳机",
              PId: 42,
              Childs: [
                { Id: 44, Name: "蓝牙", PId: 43, Childs: [], __open__: false }
              ],
              __open__: false
            }
          ]
        },
        {
          Id: 43,
          Name: "耳机",
          PId: 42,
          Childs: [
            { Id: 44, Name: "蓝牙", PId: 43, Childs: [], __open__: false }
          ]
        },
        { Id: 44, Name: "蓝牙", PId: 43, Childs: [] }
      ],
      checkedKeys: ["42", "43", "44"],
      data2: [
        {
          Id: 2,
          Name: "电脑",
          PId: 0,
          Childs: [
            {
              Id: 36,
              Name: "戴尔",
              PId: 2,
              Childs: [
                { Id: 39, Name: "毁灭者", PId: 36, Childs: [] },
                { Id: 40, Name: "飞行堡垒", PId: 36, Childs: [] }
              ]
            },
            { Id: 37, Name: "惠普", PId: 2, Childs: [] },
            { Id: 38, Name: "苹果", PId: 2, Childs: [] },
            { Id: 84, Name: "联想", PId: 2, Childs: [] }
          ]
        },
        { Id: 29, Name: "智能穿戴", PId: 0, Childs: [] },
        {
          Id: 13,
          Name: "文具",
          PId: 0,
          Childs: [
            {
              Id: 23,
              Name: "书本类",
              PId: 13,
              Childs: [
                { Id: 25, Name: "英语本", PId: 23, Childs: [] },
                { Id: 24, Name: "数学本", PId: 23, Childs: [] }
              ]
            },
            {
              Id: 22,
              Name: "体育类1",
              PId: 13,
              Childs: [
                { Id: 26, Name: "足球", PId: 22, Childs: [] },
                { Id: 27, Name: "跳绳", PId: 22, Childs: [] }
              ]
            },
            {
              Id: 64,
              Name: "教材类",
              PId: 13,
              Childs: [{ Id: 65, Name: "小学教材", PId: 64, Childs: [] }]
            }
          ]
        },
        { Id: 10, Name: "家电", PId: 0, Childs: [] },
        {
          Id: 42,
          Name: "配件",
          PId: 0,
          Childs: [
            {
              Id: 43,
              Name: "耳机",
              PId: 42,
              Childs: [{ Id: 44, Name: "蓝牙", PId: 43, Childs: [] }]
            }
          ]
        },
        {
          Id: 77,
          Name: "华为",
          PId: 0,
          Childs: [
            {
              Id: 78,
              Name: "Nova",
              PId: 77,
              Childs: [{ Id: 79, Name: "Nova4", PId: 78, Childs: [] }]
            }
          ]
        },
        {
          Id: 1,
          Name: "手机",
          PId: 0,
          Childs: [
            {
              Id: 4,
              Name: "华为",
              PId: 1,
              Childs: [{ Id: 246, Name: "PRO", PId: 4, Childs: [] }]
            },
            {
              Id: 14,
              Name: "荣耀",
              PId: 1,
              Childs: [
                { Id: 28, Name: "mate20", PId: 14, Childs: [] },
                { Id: 85, Name: "magic2", PId: 14, Childs: [] },
                { Id: 55, Name: "8x", PId: 14, Childs: [] }
              ]
            },
            { Id: 41, Name: "小米", PId: 1, Childs: [] },
            { Id: 15, Name: "锤子", PId: 1, Childs: [] },
            {
              Id: 63,
              Name: "苹果",
              PId: 1,
              Childs: [
                { Id: 225, Name: "iphoneX", PId: 63, Childs: [] },
                { Id: 227, Name: "iphone6", PId: 63, Childs: [] }
              ]
            },
            {
              Id: 86,
              Name: "OPPO",
              PId: 1,
              Childs: [{ Id: 87, Name: "r17", PId: 86, Childs: [] }]
            },
            {
              Id: 92,
              Name: "努比亚",
              PId: 1,
              Childs: [{ Id: 93, Name: "红魔", PId: 92, Childs: [] }]
            },
            {
              Id: 107,
              Name: "VIVO",
              PId: 1,
              Childs: [{ Id: 108, Name: "VIVO  NEX", PId: 107, Childs: [] }]
            }
          ]
        },
        {
          Id: 88,
          Name: "智能周边",
          PId: 0,
          Childs: [
            {
              Id: 89,
              Name: "智能机器人",
              PId: 88,
              Childs: [{ Id: 90, Name: "小艾机器人", PId: 89, Childs: [] }]
            }
          ]
        },
        {
          Id: 286,
          Name: "三星",
          PId: 0,
          Childs: [
            {
              Id: 287,
              Name: "三星",
              PId: 286,
              Childs: [{ Id: 288, Name: "三星手机", PId: 287, Childs: [] }]
            }
          ]
        }
      ],
      selectedData: [],
      selectedKeys: [],
      text1: ""
    }
  },
  methods: {
    onToggle(arr) {
      if (arr.length < 3) {
        console.log('请选择最末级')
        this.$nextTick().then(() => {

          this.myId = ''
        })
      }
    },
    expand(e, obj) {
      console.log(e, obj)
    },
    afterArea(area) {
      this.area = area
    }
    // title() {
    //   return <div>这是个抬头 <k-icon name="k-icon-sort-down" /></div>
    // }
  },
  mounted() {
    setTimeout(() => {
      this.myId = 28
      this.selectedData = [{ "areaLevel": 2, "atid": "37", "atname": "蚌埠", "atpids": "AAA001-3-37", "atnames": "中国-安徽-蚌埠" }, { "areaLevel": 2, "atid": "39", "atname": "池州", "atpids": "AAA001-3-39", "atnames": "中国-安徽-池州" }, { "areaLevel": 2, "atid": "40", "atname": "滁州", "atpids": "AAA001-3-40", "atnames": "中国-安徽-滁州" }, { "areaLevel": 2, "atid": "41", "atname": "阜阳", "atpids": "AAA001-3-41", "atnames": "中国-安徽-阜阳" }, { "areaLevel": 2, "atid": "42", "atname": "淮北", "atpids": "AAA001-3-42", "atnames": "中国-安徽-淮北" }, { "areaLevel": 2, "atid": "43", "atname": "淮南", "atpids": "AAA001-3-43", "atnames": "中国-安徽-淮南" }, { "areaLevel": 2, "atid": "44", "atname": "黄山", "atpids": "AAA001-3-44", "atnames": "中国-安徽-黄山" }, { "areaLevel": 2, "atid": "45", "atname": "六安", "atpids": "AAA001-3-45", "atnames": "中国-安徽-六安" }, { "areaLevel": 2, "atid": "46", "atname": "马鞍山", "atpids": "AAA001-3-46", "atnames": "中国-安徽-马鞍山" }, { "areaLevel": 2, "atid": "47", "atname": "宿州", "atpids": "AAA001-3-47", "atnames": "中国-安徽-宿州" }, { "areaLevel": 2, "atid": "48", "atname": "铜陵", "atpids": "AAA001-3-48", "atnames": "中国-安徽-铜陵" }, { "areaLevel": 2, "atid": "49", "atname": "芜湖", "atpids": "AAA001-3-49", "atnames": "中国-安徽-芜湖" }, { "areaLevel": 2, "atid": "50", "atname": "宣城", "atpids": "AAA001-3-50", "atnames": "中国-安徽-宣城" }, { "areaLevel": 2, "atid": "51", "atname": "亳州", "atpids": "AAA001-3-51", "atnames": "中国-安徽-亳州" }, { "areaLevel": 2, "atid": "3401", "atname": "合肥", "atpids": "AAA001-3-3401", "atnames": "中国-安徽-合肥" }, { "areaLevel": 1, "atid": "4", "atname": "福建", "atpids": "AAA001-4", "atnames": "中国-福建" }, { "areaLevel": 2, "atid": "53", "atname": "福州", "atpids": "AAA001-4-53", "atnames": "中国-福建-福州" }, { "areaLevel": 2, "atid": "54", "atname": "龙岩", "atpids": "AAA001-4-54", "atnames": "中国-福建-龙岩" }, { "areaLevel": 2, "atid": "55", "atname": "南平", "atpids": "AAA001-4-55", "atnames": "中国-福建-南平" }, { "areaLevel": 2, "atid": "56", "atname": "宁德", "atpids": "AAA001-4-56", "atnames": "中国-福建-宁德" }, { "areaLevel": 2, "atid": "57", "atname": "莆田", "atpids": "AAA001-4-57", "atnames": "中国-福建-莆田" }, { "areaLevel": 2, "atid": "58", "atname": "泉州", "atpids": "AAA001-4-58", "atnames": "中国-福建-泉州" }, { "areaLevel": 2, "atid": "59", "atname": "三明", "atpids": "AAA001-4-59", "atnames": "中国-福建-三明" }, { "areaLevel": 2, "atid": "60", "atname": "厦门", "atpids": "AAA001-4-60", "atnames": "中国-福建-厦门" }, { "areaLevel": 2, "atid": "61", "atname": "漳州", "atpids": "AAA001-4-61", "atnames": "中国-福建-漳州" }]
    })
  },
  watch: {
    checkedData(d) {
      console.log(d)
    },
    checkedKeys(d) {
      console.log(d)
    },
    show(v) {
      if (v && this.data.length === 0) {
        setTimeout(() => {
          this.data = this.dataList
        }, 200)
      }
    },
    show1(v) {
      if (v && this.data1.length === 0) {
        setTimeout(() => {
          this.data1 = this.dataList
        }, 200)
      }
    }
  }
}
</script>

<style>
.body {
  padding: 20px;
  height: 400px;
  width: 400px;
  overflow: auto;
  background-color: white;
}
</style>
