import KIcon from "karma-ui/packages/icon/icon"
import util from "./util/date"
import mixins from "./util/mixins"
export default {
  mixins: [mixins],
  inheritAttrs: false,
  name: "KDate",
  components: {
    KIcon
  },
  props: {
    value: {
      type: [Number, String, Date],
      default: ""
    },
    range: Boolean,
    //start和end记录选中的开始、结束日期
    start: [Number, String, Date],
    end: [Number, String, Date],
    min: [Number, String, Date],
    max: [Number, String, Date],
    //cache记录mouseover的开始、结束日期
    cacheStart: [Number, String, Date],
    cacheEnd: [Number, String, Date],
    isStart: Boolean,
    isEnd: Boolean,
    hidePrevNext: Boolean
  },
  data() {
    return {
      //当前展示的年月日日期
      showingDate: this.value,
      currentDay: new Date().getDate(),
      startDate: this.start,
      endDate: this.end
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
    emitEnd(date) {
      this.$emit("change-end", date)
    },
    emitStart(date) {
      this.$emit("change-start", date)
    },
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
      this.$emit("change-ymd", this.showingDate)
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
      this.$emit("change-ymd", this.showingDate)
    },
    _renderBodyTitle() {
      return (
        <div class="k-date-picker-title">
          <div class="k-d-p-p-n-box">
            {this.range && this.hidePrevNext && this.isEnd
              ? null
              : [
                  <k-icon
                    name="k-icon-double-left"
                    class="k-date-picker-prev-next"
                    title="上一年"
                    onClick={e => {
                      this.prevNextYear(-1)
                    }}
                  />,
                  <k-icon
                    name="k-icon-arrow-left"
                    class="k-date-picker-prev-next"
                    title="上个月"
                    onClick={e => {
                      this.prevNextMonth(-1)
                    }}
                  />
                ]}
          </div>
          <div class="k-date-picker-year-month">
            <span class="k-date-picker-item">{this.showingYear}年</span>
            <span class="k-date-picker-item">{this.showingMonth}月</span>
          </div>
          <div class="k-d-p-p-n-box">
            {this.range && this.hidePrevNext && this.isStart
              ? null
              : [
                  <k-icon
                    name="k-icon-arrow-right"
                    class="k-date-picker-prev-next"
                    title="下个月"
                    onClick={e => {
                      this.prevNextMonth(1)
                    }}
                  />,
                  <k-icon
                    name="k-icon-double-right"
                    class="k-date-picker-prev-next"
                    title="下一年"
                    onClick={e => {
                      this.prevNextYear(1)
                    }}
                  />
                ]}
          </div>
        </div>
      )
    },
    isInRange(d) {
      if (this.range) {
        let start = new Date(this.startDate) - 0,
          end = new Date(this.endDate) - 0
        if (start && end) {
          if (d > start && d < end) {
            return true
          }
        }
      } else {
        return false
      }
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
        const curFormatDate = util.formatDate(
          `${this.showingYear}-${this.showingMonth}-${j}`
        )
        const curDate = new Date(curFormatDate) - 0
        const inMaxMinRange = this.$_is_in_max_min_range(curDate)
        
        let p = {
          class: {
            "k-date-picker-select-day": (() => {
              if (this.range) {
                const start = new Date(this.startDate) - 0
                const end = new Date(this.endDate) - 0

                if (start && end) {
                  return (
                    util.isSameDate(curDate, start) ||
                    util.isSameDate(curDate, end)
                  )
                } else if (start) {
                  return util.isSameDate(curDate, start)
                } else if (end) {
                  return util.isSameDate(curDate, end)
                }
              } else {
                return j == selectDay
              }
            })(),
            "k-date-picker-current-day": j == this.currentDay,
            "k-date-picker-active": this.isInRange(curDate),
            "k-date-picker-disabled": !inMaxMinRange
          },
          on: {
            click: e => {
              if (inMaxMinRange) {
                this.showingDate = curFormatDate
                this.emitChange(this.showingDate)
              }
            },
            mouseover: e => {
              if (this.range && inMaxMinRange) this.overAndOut(curDate, e)
            },
            mouseout: e => {
              if (this.range && inMaxMinRange) this.overAndOut(curDate, e)
            }
          }
        }
        if (i == selectDay) {
        } else if (i == this.currentDay) {
        } else {
          // p.class= 'k-date-picker-active'
        }
        tds.push(<td {...p}>{i++}</td>)
      }
      //补充上个月的几天
      {
        let d = w - 1
        let n = 0
        while (d - n >= 1) {
          const day = lastMonthTotalDays - n
          const curDate = util.formatDate(`${lastYear}-${lastMonth}-${day}`)
          const inMaxMinRange = this.$_is_in_max_min_range(curDate)
          const p = {
            class: [
              "k-date-picker_not_cur_month",
              {
                "k-date-picker-active": this.isInRange(curDate),
                "k-date-picker-disabled": !inMaxMinRange
              }
            ],
            on: {
              click: e => {
                if (inMaxMinRange) {
                  this.showingDate = curDate
                  this.emitChange(this.showingDate)
                }
              },
              mouseover: e => {
                if (this.range && inMaxMinRange) this.overAndOut(curDate, e)
              },
              mouseout: e => {
                if (this.range && inMaxMinRange) this.overAndOut(curDate, e)
              }
            }
          }
          tds.unshift(<td {...p}>{day}</td>)
          n++
        }
      }
      {
        //补充下一个月的几天
        let i = 1,
          len = tds.length
        while (i <= len) {
          const j = i
          const curDate = util.formatDate(`${nextYear}-${nextMonth}-${j}`)
          const inMaxMinRange = this.$_is_in_max_min_range(curDate)
          const p = {
            class: [
              "k-date-picker_not_cur_month",
              {
                "k-date-picker-active": this.isInRange(curDate),
                "k-date-picker-disabled": !inMaxMinRange
              }
            ],
            on: {
              click: e => {
                if (this.range) {
                  this.emitChange(curDate)
                } else {
                  if (inMaxMinRange) {
                    this.showingDate = d
                    this.emitChange(curDate)
                  }
                }
              },
              mouseover: e => {
                if (this.range && inMaxMinRange) this.overAndOut(curDate, e)
              },
              mouseout: e => {
                if (this.range && inMaxMinRange) this.overAndOut(curDate, e)
              }
            }
          }
          tds.push(<td {...p}>{j}</td>)
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
    overAndOut(curDate, e) {
      if (this.range) {
        let start = new Date(this.start) - 0
        let end = new Date(this.end) - 0
        if (start && end) {
          return
        }
        if (start || end) {
          if (start) {
            if (curDate - start < 0) {
              // console.log('变开始为结束')
              this.emitEnd(this.start)
              this.$emit('change-cache-start',curDate)
            } else {
              this.endDate = curDate
              this.$emit("change-cache-end", curDate)

            }
            // console.log(this.startDate,this.endDate)
          } else {
            if (curDate - end > 0) {
              // console.log('变结束为开始')
              this.emitStart(this.end)
              this.$emit('change-cache-end',curDate)
              // this.$nextTick(() => {
              //   this.endDate = curDate
              // })
            } else {
              this.startDate = curDate
              this.$emit("change-cache-start", curDate)
            }
          }
        }
        if (e.type === "mouseout") {
          if (!start) {
            this.startDate = ""
          }
          if (!end) {
            this.endDate = ""
          }
        }
      }
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
    // value(v) {
    //   this.showingDate = v
    // },
    value: {
      immediate: true,
      handler(d) {
        this.showingDate = d
        if(this.range)
        this.$emit("change-showing-date", d)
        else this.$emit('change-ymd',d)
      }
    },
    showingDate: {
      immediate: true,
      handler(d) {
        this.$emit("change-showing-date", d)
      }
    },
    start(d) {
      if (this.range) {
        this.startDate = d
        // console.log(d)
      }
    },
    end(d) {
      if (this.range) {
        this.endDate = d
        // console.log(d)
      }
    },
    cacheStart(d) {
      // console.log("cache start:", d)
      if (this.range) this.startDate = d
    },
    cacheEnd(d) {
      // console.log("cache end:", d)
      if (this.range) this.endDate = d
    }
  }
}
