import KTreeList from "./treeList"
import getAllParent from 'karma-ui/util/getAllParent'
export default {
  name: "KTree",
  components: {
    KTreeList
  },
  name: "KTree",
  provide() {
    return {
      tree: this
    }
  },
  props: {
    //树形组件的原始数据
    data: {
      type: Array,
      default: () => []
    },
    //折叠图标、展开图标
    icon: {
      type: Array,
      default: () => [
        "k-icon-plus-square",
        "k-icon-minus-square",
        "k-icon-leaf"
      ]
    },
    //是否有复选框
    hasCheckbox: {
      type: Boolean,
      default: false
    },
    //key，用来选择用的字段名
    keyField: {
      type: String,
      default: "Id"
    },
    //当前选择的那个节点，
    //如果是数组格式，则支持复选（有复选框）
    value: [String, Number, Array],
    //子节点字段名
    childField: {
      type: String,
      default: "Childs"
    },
    //展示出来的文本，字段名
    textField: {
      type: String,
      default: "Name"
    },
    //大小尺寸
    size: String //目前只支持两种：默认和big
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  data() {
    return {
      currentValue: this.value
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
