import KDate from "./date"
export default {
  components: {
    KDate
  },
  name: "KDatePicker",
  props: {
    ...KDate.props,
    range: {
      type: Boolean,
      default: false
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
      currentDate: this.value
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
    dateToString() {
      if(this.currentDate) {

        const y = this.currentYear
        const m =
          this.currentMonth < 10 ? "0" + this.currentMonth : this.currentMonth
        const d = this.currentDay < 10 ? "0" + this.currentDay : this.currentDay
        return `${y}-${m}-${d}`
      }else{
        return ''
      }
    },
    setDateByDay(day) {
      const now = new Date() - 0
      //把day转化成毫秒数
      day = day * 86400000
      this.currentDate = now + day
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
    }
  },
  render() {
    const p = {
      props: {
        ...this.$props,
        show: this.visible,
        value: this.dateToString()
      },
      on: {
        ...this.$listeners,
        "update:show": v => {
          this.visible = v
          // this.$emit('update:show',v)
        },
        change: d => {
          this.currentDate = d
        }
      }
    }
    return <k-date {...p}>{this._renderQuick()}</k-date>
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
