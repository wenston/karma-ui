import KInput from "karma-ui/packages/input/input.jsx.vue"
import KTreeList from "./treeList"
import getAllParent from "karma-ui/util/getAllParent"
import { selectChilds, selectParent } from "./_util"
import props from "./props"
export default {
  name: "KTree",
  components: {
    KInput,
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
    ...KInput.props,
    ...props,
    //当前选择的那个节点，keyField对应的值
    value: [String, Number],
    searchButtonText: {
      type: String,
      default: "搜索"
    },
    hasActions: {
      type: Boolean,
      default: false
    },
    searchField: {
      type: String,
      default: "Name"
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  data() {
    let d = this.processData()
    return {
      //搜索数据
      searchText: "",
      //搜索出的匹配的数据
      matchData: [],
      currentMatchIndex: -1,
      isSearching: false,
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
    openAll(open) {
      const childField = this.childField
      function fn(data) {
        data.forEach(item => {
          item.__open__ = true
          if (item[childField] && item[childField].length) {
            fn(item[childField])
          }
        })
      }
      fn(this.sourceData)
      this.sourceData = JSON.parse(JSON.stringify(this.sourceData))
    },
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
      if (sourceData.length) {
        const arr = getAllParent(sourceData, v, keyField, childField)

        arr.slice(0, -1).forEach(item => {
          item.__open__ = true
        })
        this.$emit("toggle", arr)
        const item = arr[arr.length-1]
        if(item) {
          setTimeout(()=>{
            const _el = this.$el.querySelector(`span[data-tree-key="${item[keyField]}"]`)
            _el.scrollIntoViewIfNeeded()
          },800)
        }
        
      }
    },
    createCheckedDataByCheckedKeys(k) {
      const { sourceData, keyField, textField, childField } = this
      let set = new Set(k.map(t => t + ""))
      let arr = []
      const fn = (data) => {
        data.forEach(item => {
          if (set.has(item[keyField] + "")) {
            const { __open__, ...others } = item
            arr.push(others)
          } else {
            const _item = this.checkedData.filter(d=>d[keyField]==item[keyField])[0]
            _item && arr.push({..._item})
          }
          if (item[childField] && item[childField].length) {
            fn(item[childField])
          }
        })
      }
      fn(sourceData)
      this.checkedData.forEach(item => {
        let bol = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][keyField] == item[keyField]) {
                bol = true;
                break;
            }
        }
        if (!bol) {
            arr.push(item)
        }
    })
      this.checkedData = arr
    },
    isSameKeys(arr1, arr2) {
      const a1 = JSON.parse(JSON.stringify(arr1))
        .sort((x, y) => x - y)
        .join(",")
      const a2 = JSON.parse(JSON.stringify(arr2))
        .sort((x, y) => x - y)
        .join(",")
      return a1 === a2
    },
    //根据搜索内容获取keyField对应的值
    getValueBySearchText() {
      const { searchText, searchField, childField } = this
      //挑出匹配的数据，放入arr数组（平铺的数据）
      let arr = []
      function fn(data) {
        data.forEach(item => {
          if (
            item[searchField].toLowerCase().indexOf(searchText.toLowerCase()) >
            -1
          ) {
            arr.push(item)
          }
          if (item[childField] && item[childField].length) {
            fn(item[childField])
          }
        })
      }
      if (searchText !== '') {
        fn(this.data)
        this.matchData = arr
      } else {
        this.matchData = []
      }
    },
    toLocationById(shiftKey, ctrlKey) {
      const { matchData, keyField, childField, selectedRule } = this
      const len = matchData.length
      if (ctrlKey) {
        if (this.hasCheckbox) {
          if (
            this.currentValue !== undefined &&
            this.currentValue !== "" &&
            this.currentMatchIndex > -1
          ) {
            const checked = !this.checkedKeys.some(k => k == this.currentValue)
            //选择
            this.checkedKeys = selectChilds(
              matchData[this.currentMatchIndex],
              this.checkedKeys,
              checked,
              keyField,
              childField,
              selectedRule
            )
            this.checkedKeys = selectParent(
              this.sourceData,
              matchData[this.currentMatchIndex],
              this.checkedKeys,
              checked,
              keyField,
              childField,
              selectedRule
            )
            this.$emit("select", checked, matchData[this.currentMatchIndex])
          }
        } else {
          if (this.currentValue !== undefined && this.currentValue !== "") {
            this.$emit('reconfirm')
            return
          }
        }
      }
      if (shiftKey) {
        this.currentMatchIndex -= 1
      } else {
        this.currentMatchIndex += 1
      }
      let i = this.currentMatchIndex
      if (len) {
        if (i === len) {
          i = this.currentMatchIndex = 0
        } else if (i < 0) {
          i = this.currentMatchIndex = len - 1
        }
        const v = matchData[i] && matchData[i][keyField]
        if (v) {
          if (len === 1) {
            this.isSearching = false
          } else {
            this.isSearching = true
          }
          this.currentValue = v
        }
      }
    },
    onSelect() {
      this.$refs.input.onSelect()
    },
    focus() {
      this.$refs.input.focus()
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
    const inputProps = {
      ref: "input",
      props: {
        ...this.$props,
        size: "small",
        clearable: false,
        placeholder: "请输入关键字",
        value: this.searchText,
        block: true,
        autofocus: true
      },
      on: {
        valueChange: v => {
          this.searchText = v.trim()
          this.currentMatchIndex = -1
          this.getValueBySearchText()
        },
        keyup: e => {
          if (e.keyCode == 13) {
            this.toLocationById(e.shiftKey, e.ctrlKey)
          }
        },
        focus: e => {
          this.$refs.input.onSelect()
        }
      }
    }
    if (this.hasActions) {
      return (
        <div class="k-tree-wrapper">
          <div class="k-tree-actions">
            <k-input {...inputProps}>
              <k-icon
                class="k-tree-search-btn"
                name="k-icon-search"
                onClick={e => {
                  this.toLocationById()
                }}
              />
            </k-input>
            {/* <div>

              <k-icon
                title="展开全部"
                class="k-tree-icon-actions"
                name="k-icon-minus-square"
                onClick={e=>{
                  this.openAll(true)
                }}
              />
              <k-icon
                title="折叠全部"
                class="k-tree-icon-actions"
                name="k-icon-plus-square"
                onClick={e=>{
                  this.openAll(false)
                }}
              />
            </div> */}
          </div>
          <k-tree-list {...p} />
        </div>
      )
    }
    return <k-tree-list {...p} />
  },
  watch: {
    sourceData: {
      deep: true,
      handler(d, oldD) {
        if (JSON.stringify(d) !== JSON.stringify(oldD))
          this.$emit("update:data", d)
      }
    },
    data: {
      deep: true,
      handler(d, oldD) {
        if (JSON.stringify(d) === JSON.stringify(oldD)) {
          return
        }
        this.sourceData = this.processData()
        if (this.value) this.spreadParent(this.value)
      }
    },
    checkedKeys(k, oldKeys) {
      if (!this.isSameKeys(k, oldKeys)) {
        this.$emit("update:selectedKeys", k)
        this.createCheckedDataByCheckedKeys(k)
      }
      //todo: 选中的树形数据
    },
    selectedKeys(k, oldKeys) {
      if (!this.isSameKeys(k, this.checkedKeys)) {
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
      this.$emit("searching", this.isSearching)
      this.$emit("valueChange", v)
    },
    value: {
      immediate: true,
      handler(v, oldV) {
        this.isSearching = false
        this.currentValue = v
        if (v !== undefined && v !== "") {
          //如果value是从组件外部改变的，则需要展开其父级
          this.spreadParent(v)
        }
      }
    }
  }
}
