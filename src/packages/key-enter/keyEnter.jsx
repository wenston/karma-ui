//当键入enter的时候，跳到下一个可见的input
//当shift+enter的时候，跳到上一个可见的input
export default {
  name: "KKeyEnter",
  props: {
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
      type:String,
      default: 'focus'
    }
  },
  data() {
    return {
      inputs: [],
      keys: [37, 38, 39, 40, 13]
    }
  },
  methods: {
    //收集所有的input，并重新绑定事件
    collectAllInput() {
      this.$nextTick(() => {
        const $el = this.$el
        this.bindListener("remove")
        if (this.rowElement) {
          const rows = $el.querySelectorAll(this.rowElement)
          if (rows && rows.length) {
            let arr = []
            Array.prototype.slice.apply(rows).forEach(row => {
              const inputs = row.querySelectorAll("input")
              if (inputs && inputs.length) {
                arr.push([...inputs])
              }
            })
            this.inputs = arr
          }
        } else {
          this.inputs = [...$el.querySelectorAll("input")]
        }
        // console.log(this.inputs)
        this.bindListener()
      })
    },
    listener(e) {
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
    bindListener(type = "add") {
      const ev = type + "EventListener"
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
            i[ev](this.trigger, this.listener)
          })
        } else {
          if (type === "add") {
            input.__index = idx
          } else {
            delete input.__index
          }
          input[ev](this.trigger, this.listener)
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
    this.collectAllInput()
  },
  updated() {
    this.collectAllInput()
  }
}
