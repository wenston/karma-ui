import KInput from "karma-ui/packages/input/input.jsx.vue"
import { layer } from "karma-ui/packages/layer/index"
import clickoutside from "karma-ui/util/clickoutside"
import esc from "karma-ui/util/esc"
import KIcon from "karma-ui/packages/icon/icon"
import KOption from "karma-ui/packages/option/option"
import KCheckbox from "karma-ui/packages/checkbox/checkbox"
import ScrollBar from "karma-ui/packages/scrollbar/Scrollbar"
export default {
  name: "KSelect2",
  components: {
    KInput,
    KIcon,
    KOption,
    KCheckbox,
    ScrollBar
  },
  props: {
    //数据源
    data: [Array, Object],
    //多选的值，可以是数组、字符串（可以用逗号分隔）、单个数值
    value: [Array, String, Number],
    //选择基准关键字
    selectKey: {
      type: String,
      default: "Id"
    },
    //描述，data中的字段名
    textField: String,
    placeholder: String
  },
  data() {
    let arr = []
    if (this.value) {
      arr = this.toArray(this.value)
    }
    return {
      //存储用户选择
      dataValue: arr,
      //下拉列表实例
      layerIns: layer(),
      //搜索关键字
      searchText: "",
      //记录状态：下拉列表是否可见
      visible: false,
      //全选
      isCheckedAll: false
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  computed: {
    filterData() {
      const data = this.data
      const v = (this.searchText + "").trim().split(/\s+/)
      if (data) {
        if (Array.isArray(data)) {
          return data.filter(item => {
            for (const k in item) {
              for (let i = 0, len = v.length; i < len; i++) {
                if ((item[k] + "").indexOf(v[i]) > -1) {
                  return item
                }
              }
            }
          })
        } else {
        }
      }
    }
  },
  methods: {
    toArray(v) {
      let arr = []
      if (Array.isArray(v)) {
        arr = JSON.parse(JSON.stringify(v))
      } else if (typeof v === "string") {
        arr = v.split(/\s*,\s*/)
      } else if (typeof v === "number") {
        arr = [v + ""]
      }
      return arr
    },
    rBox() {
      const p = {
        ref: "boxInput",
        props: {
          active: this.visible,
          readonly: true,
          styles: {
            width: "225px"
          }
        },
        on: {
          focus: e => {
            this.showLayer()
          }
        }
      }
      return <k-input {...p} />
    },
    //搜索匹配框、全选、刷新数据按钮
    rSearchInput() {
      const p = {
        class: "k-select2-searchinput",
        props: {
          clearable: true,
          size: "small",
          placeholder: this.placeholder,
          block: true,
          value: this.searchText,
          active: this.visible
        },
        ref: "searchInput",
        on: {
          valueChange: v => {
            this.searchText = v
            this.$forceUpdate()
          },
          input: e => {}
        }
      }
      const checkProps = {
        props: {
          checked: this.isCheckedAll
        },
        on: {
          checkedChange: b => {
            if (b) {
              let set = new Set(this.dataValue)
              const filterData = this.filterData
              filterData.forEach(el => {
                set.add(el[this.selectKey] + "")
              })
              this.dataValue = [...set]
            } else {
              this.dataValue = []
            }
            this.isCheckedAll = b
            this.emitValue()
            // this.$forceUpdate()
          }
        }
      }
      return (
        <div>
          <k-input {...p}>
            <span slot="prepend">
              <k-checkbox {...checkProps} />
            </span>
            <div slot="append" class="k-select2-refresh" tabindex="1">
              <k-icon
                color="white"
                size="14"
                title="刷新"
                name="k-icon-refresh"
                weight
              />
            </div>
          </k-input>
        </div>
      )
    },
    //数据列表
    rList() {
      const filterData = this.filterData
      if (filterData) {
        let list = []
        if (Array.isArray(filterData)) {
          list = filterData.map(item => {
            const p = {
              class: "k-select2-checkbox",
              props: {
                text: item[this.textField],
                value: item[this.selectKey],
                checked: this.dataValue.some(id => id == item[this.selectKey])
              },
              on: {
                checkedChange: checked => {
                  let set = new Set(this.dataValue)
                  const v = item[this.selectKey] + ""
                  if (checked) {
                    set.add(v)
                  } else {
                    set.delete(v)
                  }
                  this.dataValue = [...set]
                  this.isCheckedAll =
                    filterData.length > 0 &&
                    filterData.length === this.dataValue.length
                  // this.$forceUpdate()
                  this.emitValue()
                }
              }
            }
            return (
              <div class="k-select2-list-item">
                <k-checkbox {...p} />
              </div>
            )
          })
        } else {
          for (let k in filterData) {
            // list.push(
            //   <div>
            //     <k-checkbox text={dataList[k]} />
            //   </div>
            // )
          }
        }
        return <div class="k-select2-list">{list}</div>
      }
    },
    //用户选择的数据名称列表
    rCheckedList() {
      const dataValue = this.dataValue
      const filterData = this.filterData
      const selectKey = this.selectKey
      const textField = this.textField
      let arr = []
      let list = null
      if (dataValue.length) {
        if (Array.isArray(filterData)) {
          filterData.forEach(item => {
            if (dataValue.some(el => el == item[selectKey])) {
              arr.push(item)
            }
          })
        }
      }
      if (arr.length > 0) {
        list = arr.map(item => {
          return (
            <div class="k-select2-checked-item">
              <span class="k-select2-checked-name">{item[textField]}</span>
              <span
                class="k-select2-checked-del"
                onClick={e => {
                  const k = item[selectKey] + ""
                  const i = dataValue.indexOf(k)
                  this.dataValue.splice(i, 1)
                  this.emitValue()
                  if (this.isCheckedAll) {
                    this.isCheckedAll = false
                  }
                  e.stopPropagation()
                }}
              >
                &times;
              </span>
            </div>
          )
        })
        return (
          <ScrollBar speed={10} class="k-select2-checked-list">
            <div class="k-select2-checked-box">{list}</div>
          </ScrollBar>
        )
      }
    },
    hideLayer() {
      this.layerIns.hide()
      this.visible = false
    },
    showLayer() {
      this.layerIns.show(this.$refs.searchInput.focus)
      this.$refs.searchInput.focus()
      this.visible = true
    },
    //实例化option列表
    initIns() {
      this.$nextTick(() => {
        this.layerIns.init(this, [this.rSearchInput(), this.rList()])
      })
    },
    isSame(v, ov) {
      if (!v || !ov) {
        return false
      }
      let arr = this.toArray(v)
      let oArr = this.toArray(ov)
      let str = arr.sort((x, y) => x - y).join(",")
      let oStr = oArr.sort((x, y) => x - y).join(",")
      return str === oStr
    },
    emitValue() {
      let v = JSON.parse(JSON.stringify(this.dataValue))
      if (Array.isArray(this.value)) {
        this.$emit("valueChange", v)
      } else if (typeof this.value === "string") {
        this.$emit("valueChange", v.filter(el=>!!el).join(","))
      } else {
        this.$emit("valueChange", v)
      }
    }
  },
  render() {
    const p = {
      directives: [
        // {
        //   name: "clickoutside",
        //   value: this.hideLayer
        // },
        {
          name: "esc",
          value: this.hideLayer
        }
      ],
      class: "k-select2",
      on: {
        click: e => {
          this.$refs.boxInput.focus()
        }
      }
    }
    return (
      <div {...p}>
        {this.rBox()}
        {this.rCheckedList()}
      </div>
    )
  },
  watch: {
    // dataValue(v, ov) {
      //会出现连续触发两次的问题！且v和ov一样！为什么？
      //因为以上原因，所以改为手动：this.emitValue()
      // console.log(v,ov)
      // if (!this.isSame(v, ov)) {
        // throttle().then(()=>{

          // v = JSON.parse(JSON.stringify(v))
          // if (Array.isArray(this.value)) {
          //   this.$emit("valueChange", v)
          // } else if (typeof this.value === "string") {
          //   this.$emit("valueChange", v.split(","))
          // } else {
          //   this.$emit("valueChange", v)
          // }
        // }).catch(err=>{
          
        // })
      // }
    // },
    value(v, ov) {
      // console.log('value:',v,ov)
      if (!this.isSame(v, ov)) {
        if (Array.isArray(v)) {
          this.dataValue = JSON.parse(JSON.stringify(v))
        } else if (typeof v === "string") {
          this.dataValue = v.split(/\s*,\s*/)
        } else if (typeof v === "number") {
          this.dataValue = [v + ""]
        }
      }
    }
  },
  destroyed() {
    this.layerIns.destroy()
  },
  updated() {
    this.initIns()
  },
  mounted() {
    this.initIns()
  },
  directives: {
    clickoutside,
    esc
  }
}
