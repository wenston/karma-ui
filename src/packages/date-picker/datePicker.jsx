import KDate from "./date"
import KInput from "karma-ui/packages/input/input.jsx.vue"
import KDropdown from "karma-ui/packages/dropdown/dropdown"
import KButton from "karma-ui/packages/button/button"
export default {
  components: {
    KDate,
    KInput,
    KDropdown,
    KButton
  },
  name: "KDatePicker",
  props: {
    ...KInput.props,
    placeholder: {
      type: String,
      default: "选择日期"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    styles: {
      type: Object,
      default: () => ({
        width: "93px"
      })
    },
    range: {
      type: Boolean,
      default: false
    },
    hasActions: {
      type: Boolean,
      default: true
    },
    quick: {
      type: [Array, Boolean],
      default: () => [
        {
          name: "今天",
          day: 0
        },
        {
          name: "昨天",
          day: -1
        },
        {
          name: "前天",
          day: -2
        }
      ]
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  data() {
    return {
      visible: this.show,
      currentDate: this.value,
      showingDate: ''
    }
  },
  computed: {
    formatDate() {
      let now = new Date(this.currentDate)
      if (now == "Invalid Date") {
        now = new Date()
      }
      return now
    },
    currentYear() {
      return this.formatDate.getFullYear()
    },
    currentMonth() {
      return this.formatDate.getMonth() + 1
    },
    currentDay() {
      return this.formatDate.getDate()
    }
  },
  methods: {
    clearDate() {
      this.currentDate = this.showingDate = ''
    },
    dateToString() {
      if (this.currentDate) {
        const y = this.currentYear
        const m =
          this.currentMonth < 10 ? "0" + this.currentMonth : this.currentMonth
        const d = this.currentDay < 10 ? "0" + this.currentDay : this.currentDay
        return `${y}-${m}-${d}`
      } else {
        return ""
      }
    },
    setDateByDay(day) {
      const now = new Date() - 0
      //把day转化成毫秒数
      day = day * 86400000
      this.showingDate = this.currentDate = now + day
      this.visible = false
    },
    _renderQuick() {
      if (this.quick && this.quick.length) {
        const list = this.quick.map(q => {
          return (
            <a
              href="javascript:;"
              class="k-date-picker-quick-item"
              onClick={e => {
                this.setDateByDay(q.day)
              }}
            >
              {q.name}
            </a>
          )
        })
        return (
          <div slot="quick" class="k-date-picker-quick">
            {list}
          </div>
        )
      }
    },
    to2(n) {
      n = +n
      if (n > 9) {
        return n
      }
      return "0" + n
    },
    renderTitle() {
      const p = {
        props: {
          ...this.$props,
          readonly: true,
          value: this.dateToString()
        },
        on: {
          clear: () => {
            this.clearDate()
          }
        }
      }
      return (
        <k-input {...p}>
          <k-icon name="k-icon-calendar" class="k-date-picker-icon" />
        </k-input>
      )
    },
    _renderActions() {
      if (this.hasActions) {
        return (
          <div class="k-date-picker-actions">
            <k-button size="mini" type="primary" onClick={e=>{
              if(this.range) {

              }else{
                this.currentDate = this.showingDate
                this.visible = false
              }
            }}>
              确定
            </k-button>
          </div>
        )
      }
    },
    renderBody() {
      const startProps = {
        props: {
          value: this.currentDate,
          hasActions: false
        },
        on: {
          ...this.$listeners,
          "update:show": v => {
            this.visible = v
            // this.$emit('update:show',v)
          },
          change: d => {
            this.currentDate = d
            if(!this.range) {
              this.visible = false
            }
          },
          'change-ymd': d=> {
            this.showingDate = d
          }
        }
      }
      const endProps = {
        props: {
          value: this.currentDate,
          hasActions: true
        }
      }
      return [
        this._renderQuick(),
        <div class="k-date-picker-right">
          <div class="k-date-picker-right-top">
            <k-date {...startProps} />
            {this.range
              ? [<div class="k-date-picker-line" />, <k-date {...endProps} />]
              : null}
          </div>
          {this._renderActions()}
        </div>
      ]
    }
  },
  render() {
    const p = {
      props: {
        show: this.visible,
        trigger: this.trigger,
        bodyClassName: "k-date-picker",
        title: this.renderTitle(),
        body: this.renderBody()
      },
      on: {
        'update:show':v=> {
          this.visible = v
        }
      }
    }
    return <k-dropdown {...p} />
  },
  watch: {
    show(v) {
      this.visible = v
    },
    currentDate(d) {
      d = new Date(d) - 0
      if (d)
        this.$emit(
          "valueChange",
          `${this.currentYear}-${this.to2(this.currentMonth)}-${this.to2(
            this.currentDay
          )}`
        )
      else this.$emit("valueChange", "")
    },
    value(d) {
      this.currentDate = d
    }
  }
}
