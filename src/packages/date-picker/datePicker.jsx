import KDate from "./date"
import KInput from "karma-ui/packages/input/input.jsx.vue"
import KDropdown from "karma-ui/packages/dropdown/dropdown"
import KButton from "karma-ui/packages/button/button"
import util from "./util/date"
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
    start: [Number, String, Date],
    end: [Number, String, Date],
    min: [Number, String, Date],
    max: [Number, String, Date],
    startPlaceholder: {
      type: String,
      default: "开始日期"
    },
    endPlaceholder: {
      type: String,
      default: "结束日期"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    styles: {
      type: Object,
      default: () => ({})
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
    },
    //快捷选择区间
    quickRange: {
      type: [Array, Boolean],
      default: () => [
        {
          name: "近3天",
          start: util.addDays(new Date(),-2),
          end: new Date()
        },
        {
          name: "近7天",
          start:util.addDays(new Date(),-6),
          end: new Date()
        },
        {
          name: "本周",
          start: util.getMondayInThisWeek(new Date()),
          end: new Date()
        },
        {
          name: "上周",
          ... util.getLastWeek()
        },
        {
          name: "本月",
          start: util.getFirstDayInThisMonth(),
          end: new Date()
        },
        {
          name: "上个月",
          ...util.getLastMonth()
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
      showingDate: "",
      startDate: this.start,
      endDate: this.end,
      cacheStart: this.start,
      cacheEnd: this.end,
      initStartDate: "",
      initEndDate: "",
      startShowingDate: "",
      endShowingDate: ""
    }
  },
  computed: {
    hidePrevNext() {
      const start =
          new Date(this.startShowingDate) - 0 ||
          new Date(this.initStartDate) - 0,
        end =
          new Date(this.endShowingDate) - 0 || new Date(this.initEndDate) - 0
      if (isNaN(start) || isNaN(end)) {
        return true
      }
      const startM = new Date(start).getMonth(),
        endM = new Date(end).getMonth()
      if (start >= end) {
        return true
      } else {
        if (endM - startM > 1) {
          return false
        }
        return true
      }
    },
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
      this.currentDate = this.showingDate = ""
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
      const theDay = day + now
      if (this.range) {
        this.endDate = this.startDate = theDay
      } else {
        this.showingDate = this.currentDate = theDay
      }
      this.visible = false
    },
    _renderQuick() {
      let listQuick = [],
        listQuickRange = []
      if (this.quick && this.quick.length) {
        listQuick = this.quick.map(q => {
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
      }
      if (this.range && this.quickRange && this.quickRange.length) {
        listQuickRange = this.quickRange.map(q => {
          return (
            <a
              href="javascript:;"
              class="k-date-picker-quick-item"
              onClick={e => {
                this.startDate = q.start
                this.endDate = q.end
              }}
            >
              {q.name}
            </a>
          )
        })
      }
      return (
        <div slot="quick" class="k-date-picker-quick">
          {listQuick}
          {listQuickRange}
        </div>
      )
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
        style: {
          width: "93px",
          ...this.styles
        },
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
      if (this.range) {
        const rangeP = {
          attrs: {
            tabindex: 1
          },
          class: "k-date-picker-range",
          style: { width: "180px", ...this.styles }
        }
        return (
          <div {...rangeP}>
            <div class="k-date-picker-range-placeholder">
              {this.start ? (
                <span class="k-date-picker-range-item">{this.start}</span>
              ) : (
                <span class="k-date-picker-range-item k-d-p-r-p">
                  {this.startPlaceholder}
                </span>
              )}

              <span class="k-d-p-r-p">至</span>
              {this.end ? (
                <span class="k-date-picker-range-item">{this.end}</span>
              ) : (
                <span class="k-date-picker-range-item k-d-p-r-p">
                  {this.endPlaceholder}
                </span>
              )}
              {this.start || this.end ? (
                <k-icon
                  name="k-icon-close"
                  class="k-date-picker-icon-close"
                  onClick={e => {
                    this.startDate = this.endDate = ""
                    e.stopPropagation()
                  }}
                />
              ) : (
                <k-icon name="k-icon-calendar" class="k-date-picker-icon" />
              )}
            </div>
          </div>
        )
      }
      return (
        <k-input {...p}>
          <k-icon name="k-icon-calendar" class="k-date-picker-icon" />
        </k-input>
      )
    },
    _renderActions() {
      if (this.hasActions && !this.range) {
        return (
          <div class="k-date-picker-actions">
            <k-button
              size="mini"
              type="primary"
              onClick={e => {
                if (this.range) {
                } else {
                  this.currentDate = this.showingDate
                  this.visible = false
                }
              }}
            >
              确定
            </k-button>
          </div>
        )
      }
    },
    handleStartEndChange(d) {
      const start = new Date(this.startDate) - 0
      const end = new Date(this.endDate) - 0
      const dd = new Date(d) - 0
      if (!start) {
        this.startDate = d
      } else {
        if (!end) {
          this.endDate = d
        } else {
          //重新选择
          this.startDate = d
          this.endDate = ""
        }
      }
    },
    getPrevNextMonth(d, n) {
      const sd = new Date(d)
      const sd_y = sd.getFullYear()
      const sd_m = sd.getMonth() + 1
      const sd_d = sd.getDate()
      const next_m = util.addMonths(sd_m, n)
      let next_y = sd_y
      if (n === 1 && next_m < sd_m) {
        next_y += 1
      } else if (n === -1 && next_m > sd_m) {
        next_y -= 1
      }

      return `${next_y}-${next_m}-01`
    },
    renderBody() {
      const startProps = {
        props: {
          value: this.initStartDate,
          hasActions: false,
          range: this.range,
          start: this.startDate,
          end: this.endDate,
          cacheStart: this.cacheStart,
          cacheEnd: this.cacheEnd,
          isStart: true,
          hidePrevNext: this.hidePrevNext
        },
        on: {
          ...this.$listeners,
          change: d => {
            if (this.range) {
              this.handleStartEndChange(d)
            } else {
              this.currentDate = d
              this.visible = false
            }
          },
          "change-end": d => {
            this.endDate = d
            this.startDate = ""
          },
          "change-start": d => {
            this.startDate = d
            this.endDate = ""
          },
          "change-cache-start": d => {
            this.cacheStart = util.formatDate(d)
          },
          "change-cache-end": d => {
            this.cacheEnd = util.formatDate(d)
          },
          "change-showing-date": d => {
            this.startShowingDate = d
          },
          "change-ymd": d => {
            this.showingDate = d
          }
        }
      }
      const endProps = {
        props: {
          value: this.initEndDate,
          start: this.startDate,
          end: this.endDate,
          range: true,
          hasActions: true,
          cacheStart: this.cacheStart,
          cacheEnd: this.cacheEnd,
          isEnd: true,
          hidePrevNext: this.hidePrevNext
        },
        on: {
          ...this.$listeners,
          change: d => {
            this.handleStartEndChange(d)
          },
          "change-end": d => {
            this.endDate = d
            this.cacheEnd = d
            this.startDate = ""
          },
          "change-start": d => {
            this.startDate = d
            this.cacheStart = d
            this.endDate = ""
          },
          "change-cache-start": d => {
            this.cacheStart = util.formatDate(d)
          },
          "change-cache-end": d => {
            this.cacheEnd = util.formatDate(d)
          },
          "change-showing-date": d => {
            this.endShowingDate = d
          },
          "change-ymd": d => {
            // this.showingDate = d
            // console.log(d)
          }
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
        "update:show": v => {
          this.visible = v
        }
      }
    }
    return <k-dropdown {...p} />
  },
  watch: {
    visible(v) {
      if (v) {
        let start1 = this.range ? this.startDate : this.currentDate
        let start2 = this.range ? this.endDate : ""
        if (this.range) {
          if (this.startDate && this.endDate) {
            if (util.isSameMonth(this.startDate, this.endDate)) {
              if (util.isSameYear(this.startDate, this.endDate)) {
                start2 = util.getDateByAddOneMonths(this.startDate, 1)
              }
            }
          } else {
            if (this.startDate) {
              start2 = util.getDateByAddOneMonths(this.startDate, 1)
            } else if (this.endDate) {
              start2 = this.endDate
              start1 = util.getDateByAddOneMonths(this.endDate, -1)
            } else if (!this.startDate && !this.endDate) {
              start2 = util.getDateByAddOneMonths(new Date(), 1)
            }
          }
        }
        this.initEndDate = start2
        this.initStartDate = start1 || util.formatDate(new Date())
      }
    },
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
    },
    start(d) {
      this.startDate = d
    },
    end(d) {
      this.endDate = d
    },
    startDate(d) {
      // console.log(d)
      this.$nextTick(() => {
        if (d && this.endDate) {
          this.$emit("update:end", util.formatDate(this.endDate))
          this.$emit("update:start", util.formatDate(d))
          this.visible = false
          return
        }
        if (!d) {
          this.$emit("update:start", "")
        }
      })
    },
    endDate(d) {
      this.$nextTick(() => {
        if (d && this.startDate) {
          this.$emit("update:start", util.formatDate(this.startDate))
          this.$emit("update:end", util.formatDate(d))
          this.visible = false
          return
        }
        if (!d) {
          this.$emit("update:end", "")
        }
      })
    }
  }
}
