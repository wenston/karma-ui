import KIcon from "karma-ui/packages/icon/icon"
import util from "./util/date"
export default {
  inheritAttrs: false,
  name: "KDate",
  components: {
    KIcon
  },
  props: {
    value: {
      type: [Number, String, Date],
      default: ""
    }
  },
  data() {
    return {
      //当前展示的年月日日期
      showingDate: this.value
    }
  },
  computed: {
    showingFormatDate() {
      let now = new Date(this.showingDate)
      if (now == "Invalid Date") {
        now = new Date()
      }
      return now
    },
    showingYear() {
      return this.showingFormatDate.getFullYear()
    },
    showingMonth() {
      return this.showingFormatDate.getMonth() + 1
    },
    showingDay() {
      return this.showingFormatDate.getDate()
    }
  },
  methods: {
    emitChange(date) {
      this.$emit("change", date)
    },
    clearDate() {
      this.showingDate = ""
      this.emitChange("")
    },
    _renderWeeksTitle() {
      let weeks = util.weeks.slice(1)
      let ths = []
      for (let w in weeks) {
        ths.push(<th>{weeks[w]}</th>)
      }
      return (
        <thead>
          <tr>{ths}</tr>
        </thead>
      )
    },
    prevNextYear(n) {
      this.showingDate = `${this.showingYear + n}-${this.showingMonth}-${
        this.showingDay
      }`
      this.$emit('change-ymd',this.showingDate)
    },
    prevNextMonth(n) {
      let showM = this.showingMonth
      let m = util.addMonths(this.showingMonth, n)
      let y = this.showingYear
      if (n < 0 && m > showM) {
        y = y - 1
      } else if (n > 0 && m < showM) {
        y = y + 1
      }
      this.showingDate = `${y}-${m}-${this.showingDay}`
      this.$emit('change-ymd',this.showingDate)
    },
    _renderBodyTitle() {
      return (
        <div class="k-date-picker-title">
          <div>
            <k-icon
              name="k-icon-double-left"
              class="k-date-picker-prev-next"
              title="上一年"
              onClick={e => {
                this.prevNextYear(-1)
              }}
            />
            <k-icon
              name="k-icon-arrow-left"
              class="k-date-picker-prev-next"
              title="上个月"
              onClick={e => {
                this.prevNextMonth(-1)
              }}
            />
          </div>
          <div class="k-date-picker-year-month">
            <span class="k-date-picker-item">{this.showingYear}年</span>
            <span class="k-date-picker-item">{this.showingMonth}月</span>
          </div>
          <div>
            <k-icon
              name="k-icon-arrow-right"
              class="k-date-picker-prev-next"
              title="下个月"
              onClick={e => {
                this.prevNextMonth(1)
              }}
            />
            <k-icon
              name="k-icon-double-right"
              class="k-date-picker-prev-next"
              title="下一年"
              onClick={e => {
                this.prevNextYear(1)
              }}
            />
          </div>
        </div>
      )
    },
    //根据年、月、日渲染出某月的所有天
    _renderDays(D) {
      D = new Date(D)

      let year = this.showingYear
      let month = this.showingMonth
      //某月第一天对应的完整日期
      const firstDate = new Date(year + "-" + month + "-" + 1)
      //今天是多少号
      const selectDay = this.showingDay
      //获取某月第一天的对应星期几
      const w = firstDate.getDay()
      //获取上个月
      const lastMonth = util.addMonths(month, -1)
      //判断上个月的年份
      const lastYear = lastMonth > month ? year - 1 : year
      //获取本月共有天数
      const monthDays = util.getMonths(year)[month]
      //获取上个月的共有天数
      const lastMonthTotalDays = util.getMonths(lastYear)[lastMonth]
      //获取下个月
      const nextMonth = util.addMonths(month, 1)
      //获取下一年
      const nextYear = nextMonth < month ? year + 1 : year

      //渲染出month对应的所有天，一共6行，多了的行显示下一个月的前几天
      let i = 1
      let tds = []
      while (i <= monthDays) {
        const j = i
        let p = {
          on: {
            click: e => {
              this.showingDate = `${this.showingYear}-${this.showingMonth}-${j}`
              this.emitChange(this.showingDate)
            }
          }
        }
        if (i == selectDay) {
          p.class = "k-date-picker-select-day"
        }
        tds.push(<td {...p}>{i++}</td>)
      }
      //补充上个月的几天
      {
        let d = w - 1
        let n = 0
        while (d - n >= 1) {
          const day = lastMonthTotalDays - n
          tds.unshift(
            <td
              class="k-date-picker_not_cur_month"
              onClick={e => {
                this.showingDate = `${lastYear}-${lastMonth}-${day}`
                this.emitChange(this.showingDate)
              }}
            >
              {day}
            </td>
          )
          n++
        }
      }
      {
        //补充下一个月的几天
        let i = 1,
          len = tds.length
        while (i <= len) {
          const j = i
          tds.push(
            <td
              class="k-date-picker_not_cur_month"
              onClick={e => {
                this.showingDate = `${nextYear}-${nextMonth}-${j}`
                this.emitChange(this.showingDate)
              }}
            >
              {j}
            </td>
          )
          i++
        }
      }
      //补充完后，用tr标签7个一组分开，分成6组
      let trs = []
      {
        let i = 0
        while (i <= 5) {
          let tr = []
          let j = 0
          while (j < 7) {
            tr.push(tds[i * 7 + j])
            j++
          }
          trs.push(<tr>{tr}</tr>)
          i++
        }
      }
      return <tbody>{trs}</tbody>
    },
    renderBody() {
      return (
        <div>
          {this._renderBodyTitle()}
          <table class="k-date-picker-main">
            {this._renderWeeksTitle()}
            {this._renderDays(this.showingDate)}
          </table>
        </div>
      )
    }
  },
  render() {
    return this.renderBody()
  },
  watch: {
    value(v) {
      this.showingDate = v
    }
  }
}
