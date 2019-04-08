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
      const arr = getAllParent(sourceData, v, keyField, childField)

      arr.slice(0, -1).forEach(item => {
        item.__open__ = true
      })
      this.$emit("toggle", this.toPure(arr))
    },
    createCheckedDataByCheckedKeys(k) {
      const { sourceData, keyField, textField, childField } = this
      let set = new Set(k.map(t => t + ""))
      let arr = []
      function fn(data) {
        data.forEach(item => {
          if (set.has(item[keyField] + "")) {
            const {__open__,...others} = item
            arr.push(others)
          }
          if (item[childField] && item[childField].length) {
            fn(item[childField])
          }
        })
      }
      fn(sourceData)
      this.checkedData = arr
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
      this.$emit("update:selectedKeys", k)
      this.createCheckedDataByCheckedKeys(k)
      //todo: 选中的树形数据
    },
    selectedKeys(k) {
      this.checkedKeys = k
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
        if (v) {
          //如果value是从组件外部改变的，则需要展开其父级
          this.spreadParent(v)
        }
      }
    }
  }
}
