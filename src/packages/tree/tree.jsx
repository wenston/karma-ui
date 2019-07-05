import KTreeList from "./treeList"
import getAllParent from "karma-ui/util/getAllParent"
import props from "./props"
export default {
  name: "KTree",
  components: {
    KTreeList
  },
  name: "KTree",
  provide() {
    return {
      tree: this,
      souceData: this.souceData
    }
  },
  props: {
    ...props,
    //当前选择的那个节点，keyField对应的值
    value: [String, Number]
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  data() {
    let d = this.processData()
    return {
      currentValue: this.value,
      checkedKeys: JSON.parse(JSON.stringify(this.selectedKeys)),
      checkedData: JSON.parse(JSON.stringify(this.selectedData)),
      sourceData: d
    }
  },
  computed: {
    // sourceData() {
      
    // }
  },
  methods: {
    //对传入组件的data数据进行加工处理
    processData() {
      const childField = this.childField
      function fn(data) {
        data.forEach(item => {
          if (!("__open__" in item)) {
            item.__open__ = false
          }
          if (item[childField] && item[childField].length) {
            fn(item[childField])
          }
        })
      }
      fn(this.data)
      return this.data
    },
    toPure(arr) {
      if (Array.isArray(arr))
        return JSON.parse(JSON.stringify(arr)).map(item => {
          delete item.__open__
          return item
        })
      arr = JSON.parse(JSON.stringify(arr))
      delete arr.__open__
      return arr
    },
    spreadParent(v) {
      //根据当前节点找到所有父级节点，并将其__open__置为true
      const { keyField, childField, sourceData } = this
      if(sourceData.length) {

        const arr = getAllParent(sourceData, v, keyField, childField)
  
        arr.slice(0, -1).forEach(item => {
          item.__open__ = true
        })
        this.$emit("toggle", arr)
      }
    },
    createCheckedDataByCheckedKeys(k) {
      const { sourceData, keyField, textField, childField } = this
      let set = new Set(k.map(t => t + ""))
      let arr = []
      function fn(data) {
        data.forEach(item => {
          if (set.has(item[keyField] + "")) {
            const { __open__, ...others } = item
            arr.push(others)
          }
          if (item[childField] && item[childField].length) {
            fn(item[childField])
          }
        })
      }
      fn(sourceData)
      this.checkedData = arr
    },
    isSameKeys(arr1,arr2) {
      const a1 = JSON.parse(JSON.stringify(arr1)).sort((x,y)=>x-y).join(',')
      const a2 = JSON.parse(JSON.stringify(arr2)).sort((x,y)=>x-y).join(',')
      return a1 === a2
    }
  },
  render() {
    const p = {
      props: {
        ...this.$props,
        data: this.sourceData,
        active: this.currentValue,
        scopedSlots: this.$scopedSlots
      },
      on: {
        toggle: e => {
          // 暂时用不到这种方式
          // console.log(e, e[this.keyField])
          // this.currentValue = e[this.keyField]
        }
      }
    }

    return <k-tree-list {...p} />
  },
  watch: {
    sourceData: {
      deep: true,
      handler(d,oldD) {
        if(JSON.stringify(d)!==JSON.stringify(oldD))
        this.$emit('update:data',d)
      }
    },
    data: {
      deep: true,
      handler(d,oldD) {
        if(JSON.stringify(d)===JSON.stringify(oldD)) {return}
        this.sourceData = this.processData()
        if(this.value) this.spreadParent(this.value)
      }
    },
    checkedKeys(k,oldKeys) {
      if(!this.isSameKeys(k,oldKeys)) {
        this.$emit("update:selectedKeys", k)
        this.createCheckedDataByCheckedKeys(k)
      }
      //todo: 选中的树形数据
    },
    selectedKeys(k,oldKeys) {
      if(!this.isSameKeys(k,this.checkedKeys)) {
        this.checkedKeys = k
      }
    },
    checkedData(d) {
      this.$emit("update:selectedData", d)
    },
    selectedData(d) {
      this.checkedData = d
    },
    currentValue(v) {
      this.$emit("valueChange", v)
    },
    value: {
      immediate: true,
      handler(v) {
        this.currentValue = v
        if (v!==undefined && v!=='') {
          //如果value是从组件外部改变的，则需要展开其父级
          this.spreadParent(v)
        }
      }
    }
  }
}
