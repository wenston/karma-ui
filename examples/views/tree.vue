<template>
  <div class="layout">
    <h3 class="layout__title">tree 树形组件</h3>
    <div style="display:flex;">
      <k-tree class="tree"
        :data="treeDataBig"
        size="big"
        :selectedData.sync="selectedData"
        :icon="['k-icon-arrow-right','k-icon-arrow-down','k-icon-success']"
        hasCheckbox></k-tree>
      <k-tree class="tree"
        :data="treeData"
        v-model="categoryId"
        hasCheckbox
        :selected-keys.sync="selectedKeys"
        @toggle="toggleTree"
        @expand="expand"
        @select="onSelect"
        :selected-rule="false"></k-tree>
      <k-tree class="tree"
        v-model="curValue"
        :data.sync="tree3"
        keyField="Code"
        :lazy-load="toLoad"
        @toggle="toggleNode"
        lazy>
        <div slot-scope="{item}">{{item.Code}} - {{item.Name}}</div>
      </k-tree>

      <k-tree class="tree"
        :data="bigdata"
        hasCheckbox />
    </div>
    <div>
      <k-button @click="change">改变树形组件的选择项</k-button>
      <k-button @click="changeData">外部改变数据</k-button>
      <k-button @click="addItem">添加点数据</k-button>
    </div>
  </div>
</template>

<script>
import treeData from './treeData'
export default {
  data() {
    return {
      curValue: '',
      curItem: {},
      tree3: [
        {
          Code: 1,
          Name: "资产类"
        },
        {
          Code: 2,
          Name: "负债类"
        },
        {
          Code: 3,
          Name: "共同类"
        },
        {
          Code: 4,
          Name: "所有者权益类"
        },
        {
          Code: 5,
          Name: "成本类"
        }
      ],
      treeData: [
        {
          Id: 0,
          Name: "商品分类",
          Childs: [
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
          ]
        }
      ],
      treeDataBig: [
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
      categoryId: 39,
      selectedData: [],
      selectedKeys: [],
      bigdata: treeData
    }
  },
  methods: {
    toLoad(item) {
      return new Promise(res => {
        let d = []
        Array.apply(null, {
          length: Math.floor(Math.random() * 5)
        }).forEach(() => {
          d.push({
            Code: Math.floor(Math.random() * 1000),
            Name: (Math.round(Math.random() * 20901) + 19968).toString(16),
            IsLeaf: Math.random() > 0.5
          })
          // console.log(this.tree3)
        })
        setTimeout(() => {
          res(d)
        }, Math.random() * 500)
      })
    },
    addItem() {
      this.curItem.Childs.push(
        {
          Code: Math.floor(Math.random() * 1000),
          Name: (Math.round(Math.random() * 20901) + 19968).toString(16),
          IsLeaf: Math.random() > 0.5
        }
      )
    },
    changeData() {
      this.curItem.Name = '改变'
    },
    toggleNode(arr) {
      let item = arr[arr.length - 1]
      this.curItem = item
      console.log('toggleNode', this.curItem)
      // item.Name = '改变值'
    },
    change() {
      this.categoryId = 87
    },
    toggleTree(e) {
      // console.log(e)
    },
    expand(isOpen, obj) {
      // console.log(isOpen, obj)
    },
    onSelect(checked, obj) {
      // console.log('选中或者取消选中：',checked,obj)
    }
  },
  watch: {
    selectedData(d) {
      // console.log("选择的数据", d)
    }
  }
}
</script>

<style scoped>
.tree {
  width: 300px;
}
</style>
