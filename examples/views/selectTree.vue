<template>
  <div class="layout">
    <h3 class="layout__title">基本用法</h3>
    <div>
      <k-select-tree style="line-height:normal;display:inline-block;"
        :data="dataList"
        :show.sync="show"
        hasCheckbox
        selected-rule="some"
        :selected-data.sync="checkedData"
        :selected-keys.sync="checkedKeys">
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
      <k-select-tree :data="data2"
        hasCheckbox
        :selected-rule="false"
        :selected-data.sync="selectedData"
        :selected-keys.sync="selectedKeys"
        clearable />
    </div>
  </div>
</template>

<script>
import treeData from './treeData'
export default {
  data() {
    return {
      show: false,

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
      data2: treeData,
      selectedData: [],
      selectedKeys: [],
      text1: ""
    }
  },
  methods: {
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
      this.val = 28
      // this.text1 = 'mate20'
    }, 1000)
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
