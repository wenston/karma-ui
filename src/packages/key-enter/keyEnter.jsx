//当键入enter或者右箭头的时候，跳到下一个可见的input
//当shift+enter左箭头的时候，跳到上一个可见的input
//当调用了此组件的next方法后，next方法为最后执行的有效方法，也就是
//说：下一个聚焦的是next方法调用后获取到的input
import { isVisible } from "karma-ui/util/dom"
export default {
  name: "KKeyEnter",
  props: {
    //手动模式，即禁用自动聚焦到下一个input,而是改为手动调用next方法
    manual: Boolean,
    trigger: {
      type: String,
      default: "keyup"
    },
    //rowElement是包含若干input的行元素
    //设置此参数的目的是为了取得二维的input，
    //也就是除了支持enter上下切换input之外，
    //还可以支持上下左右箭头切换input
    rowElement: {
      type: [String, Object, Boolean],
      default: "tr"
    },
    allowUpDown: Boolean, //是否允许上下箭头切换
    type: {
      type: String,
      default: "select"
    }
  },
  data() {
    return {
      inputs: [],
      keys: [37, 38, 39, 40, 13],
      currentRow: -1,
      currentIndex: -1
    }
  },
  methods: {
    //供外部调用，以防收集不全的情况出现！
    //因为在页面刷新时，如果某组件较大，有时会出现收集不全的情况。
    init() {
      return this.collectAllInput()
    },
    //外部调用，根据row，index定位到指定的input
    focus(row, index) {
      if (arguments.length == 2) {
        let inputs = this.inputs[row]
        if (inputs[index]) {
          inputs[index][this.type] && inputs[index][this.type]()
          return inputs[index]
        }
      } else if (arguments.length == 1) {
        let ipt = this.inputs[row]
        if (ipt) {
          ipt[this.type] && ipt[this.type]()
          return ipt
        }
      }
    },
    //供外部调用，调用后自动聚焦到下n个input
    next(n = 1) {
      const r = this.currentRow
      const i = this.currentIndex
      let nexti = i + n
      let inputs = this.inputs
      let ipt = null
      if (typeof r === "number" && r > -1) {
        inputs = this.inputs[r]
      }
      if (nexti > inputs.length - 1) {
        if (this.inputs[r + 1]) {
          inputs = this.inputs[r + 1]
        }
        nexti = 0
      }
      if (nexti < 0) {
        if (this.inputs[r - 1]) {
          inputs = this.inputs[r - 1]
        }
        nexti = inputs.length - 1
      }
      ipt = inputs[nexti]
      if (ipt) {
        this.$nextTick(() => {
          ipt[this.type] && ipt[this.type]()
        })
        return ipt
      }
      return null
    },
    //收集所有的未隐藏的input，并重新绑定事件
    collectAllInput() {
      const $el = this.$el
      let elems = []
      this.bindListener("remove")
      if (this.rowElement) {
        const rows = $el.querySelectorAll(this.rowElement)
        if (rows && rows.length) {
          let arr = []
          Array.prototype.slice.apply(rows).forEach(row => {
            let inputs = row.querySelectorAll("input")

            if (inputs && inputs.length) {
              inputs = [...inputs].filter(ipt => {
                return isVisible(ipt, row)
              })
              if (inputs.length) {
                arr.push(inputs)
              }
            }
          })
          elems = arr
        }
      } else {
        elems = [...$el.querySelectorAll("input")].filter(el => {
          ipt => {
            return isVisible(ipt, $el)
          }
        })
      }
      this.inputs = elems
      // console.log(elems)
      // console.log(this.inputs)
      this.bindListener()
      return elems
    },
    kbListener(e) {
      let shift = e.shiftKey
      const type = this.type
      const key = e.keyCode
      const currentInput = e.target
      if (this.keys.some(k => k == key)) {
        const row = currentInput.__row
        const i = currentInput.__index
        const inputs = this.inputs
        switch (key) {
          case 38:
          case 40:
            if (this.allowUpDown) {
              let next = 1
              if (key === 38) {
                next = -1
              }
              if ("__row" in currentInput) {
                if (inputs[row + next] && inputs[row + next][i]) {
                  inputs[row + next][i][type]()
                } else {
                  this.$emit("end-row", [row, i])
                }
              }
            }
            break
          default:
            //回车、左右箭头

            if ("__row" in currentInput) {
              let next = 1
              if (key === 37) {
                shift = true
              }
              if (shift) {
                next = -1
              }
              //如果存在左右input
              if (inputs[row][i + next]) {
                inputs[row][i + next][type]()
              } else if (inputs[row + next]) {
                //如果存在下一行
                const r = inputs[row + next]
                const j = shift ? r.length - 1 : 0
                if (r[j]) {
                  r[j][type]()
                }
              } else {
                this.$emit("end", [row, i])
              }
            } else {
              let next = 1
              if (shift) {
                next = -1
              }
              if (inputs[next]) {
                inputs[next][type]()
              } else {
                this.$emit("end", i)
              }
            }
            e.stopPropagation()
            e.preventDefault()
            break
        }
      }
    },
    handleFocus(e) {
      const tar = e.target
      const { __index: i, __row: r } = tar
      this.currentIndex = i
      this.currentRow = r
    },
    bindListener(type = "add") {
      const ev = type + "EventListener"
      //绑定或者解除键盘事件
      this.inputs.forEach((input, idx) => {
        if (Array.isArray(input)) {
          input.forEach((i, j) => {
            if (type === "add") {
              i.__row = idx
              i.__index = j
            } else {
              delete i.__row
              delete i.__index
            }
            //绑定或解绑键盘事件
            if (!this.manual) {
              i[ev](this.trigger, this.kbListener)
            }
            //绑定或解绑focus事件
            i[ev]("focus", this.handleFocus)
          })
        } else {
          if (type === "add") {
            input.__index = idx
          } else {
            delete input.__index
          }
          //绑定或解绑键盘事件
          if (!this.manual) {
            input[ev](this.trigger, this.kbListener)
          }
          //绑定或解绑focus事件
          input[ev]("focus", this.handleFocus)
        }
      })
    }
  },
  render() {
    const slotsDefault = this.$slots.default
    if (Array.isArray(slotsDefault) && slotsDefault.length > 1) {
      return <div>{slotsDefault}</div>
    }
    return this.$slots.default
  },
  mounted() {
    this.$nextTick(() => {
      this.collectAllInput()
    })
  },
  updated() {
    // console.log('keyenter updated')
    this.$nextTick(() => {
      this.collectAllInput()
    })
  }
}
