import KInput from "karma-ui/packages/input/input.jsx.vue"
import { layer } from "karma-ui/packages/layer/index"
import clickoutside from "karma-ui/util/clickoutside.js"
import esc from "karma-ui/util/esc.js"
import KIcon from "karma-ui/packages/icon/icon"
import KOption from "karma-ui/packages/option/option"
import KCheckbox from "karma-ui/packages/checkbox/checkbox"
export default {
  name: "KSelect2",
  components: {
    KInput,
    KIcon,
    KOption,
    KCheckbox
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
    if(this.value) {
      if(Array.isArray(this.value)) {
        arr = JSON.parse(JSON.stringify(this.value))
      }else if(typeof this.value === 'string') {
        arr = this.value.split(/\s*,\s*/)
      }else if(typeof this.value === 'number') {
        arr = [this.value+'']
      }
    }
    return {
      dataValue: arr,
      layerIns: layer(),
      searchText: "",
      //记录状态：下拉列表是否可见
      visible: false,
      //全选
      isCheckedAll: false,
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
    rBox() {
      const p = {
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
          input: e => {
            console.log(this.searchText)
          }
        }
      }
      return (
        <div>
          <k-input {...p}>
            <span slot="prepend">
              <k-checkbox checked={this.isCheckedAll}
                {...{
                  'checkedChange':b=>{
                    console.log(b)
                  }
                }} />
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
      const dataList = this.filterData
      if (dataList) {
        let list = []
        if (Array.isArray(dataList)) {
          list = dataList.map(item => {
            const p = {
              class: 'k-select2-checkbox',
              props: {
                text: item[this.textField],
                value: item[this.selectKey]
              },
              on: {
                change:e=>{
                  const checked = e.target.checked
                  let set = new Set(this.dataValue)
                  const v = item[this.selectKey] + ''
                  if(checked) {
                    set.add(v)
                  }else{
                    set.delete(v)
                  }
                  this.dataValue = [...set]
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
          for (let k in dataList) {
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
      class: "k-select2"
    }
    return <div {...p}>{this.rBox()}</div>
  },
  watch: {
    dataValue(v) {
      console.log(v)
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
