import KTreeList from "./treeList"
import getAllParent from 'karma-ui/util/getAllParent'
import props from './props'
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
    //当前选择的那个节点，
    //如果是数组格式，则支持复选（有复选框）
    value: [String, Number, Array]
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  data() {
    return {
      currentValue: this.value,
      checkedKeys: this.selectedKeys,
      checkedData: this.selectedData
    }
  },
  computed: {
    sourceData() {
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
    }
  },
  methods: {
    toPure(arr) {
      if(Array.isArray(arr))
      return JSON.parse(JSON.stringify(arr)).map(item=>{
        delete item.__open__
        return item
      })
      delete arr.__open__
      return JSON.parse(JSON.stringify(arr))
    },
    spreadParent(v) {
      //根据当前节点找到所有父级节点，并将其__open__置为true
      const { keyField, childField, sourceData } = this
      const arr = getAllParent(sourceData,v,keyField,childField)

      arr.slice(0,-1).forEach(item=>{
        item.__open__ = true
      })
      this.$emit('toggle',this.toPure(arr))
    },
    createCheckedData(k) {
      const set = new Set(k.map(el=>el+''))
      const {keyField,childField,sourceData} = this
      function selectData(data,set) {
        data = data.filter(item=>{
          const v = item[keyField] + ''
          return set.has(v)
        })
        console.log(data)
        for(let i = 0;i<data.length;i++) {
          const item = data[i]
          const child = item[childField]
          if(child && child.length) {
            selectData(child,set)
          }
        }
      }
      let data = JSON.parse(JSON.stringify(sourceData))
      selectData(data,set)
      this.checkedData = data
      console.log(this.checkedData)
    }
  },
  render() {
    const p = {
      props: {
        ...this.$props,
        data: this.sourceData,
        active: this.currentValue
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
    checkedKeys(k) {
      this.$emit('update:selectedKeys',k)
      //根据已选中的key构造checkedData数据
      this.createCheckedData(k)
    },
    checkedData(d) {
      this.$emit('update:selectedData',d)
    },
    selectedKeys(k) {
      this.checkedKeys = k
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
        if (v) {
          //如果value是从组件外部改变的，则需要展开其父级
          this.spreadParent(v)
        }
      }
    }
  }
}
