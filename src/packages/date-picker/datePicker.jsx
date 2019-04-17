import KDate from "./date"
import KInput from "karma-ui/packages/input/input.jsx.vue"
import KDropdown from "karma-ui/packages/dropdown/dropdown"
import KButton from "karma-ui/packages/button/button"
import util from "./util/date"
import mixins from "./util/mixins"
export default {
  mixins: [mixins],
  components: {
    KDate,
    KInput,
    KDropdown,
    KButton
  },
  name: "KDatePicker",
  props: {
    ...KInput.props,
    lazy: {
      type: Boolean,
      default: true
    },
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
          start: util.addDays(new Date(), -2),
          end: util.formatDate(util.getNow())
        },
        {
          name: "近7天",
          start: util.addDays(new Date(), -6),
          end: util.formatDate(util.getNow())
        },
        {
          name: "本周",
          start: util.getMondayInThisWeek(new Date()),
          end: util.formatDate(util.getNow())
        },
        {
          name: "上周",
          ...util.getLastWeek()
        },
        {
          name: "本月",
          start: util.getFirstDayInThisMonth(),
          end: util.formatDate(util.getNow())
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
      const start = new Date(this.startShowingDate || this.initStartDate),
        end = new Date(this.endShowingDate || this.initEndDate),
        start_ms = start - 0,
        end_ms = end - 0
      if (isNaN(start_ms) || isNaN(end_ms)) {
        return true
      }
      if (start_ms >= end_ms) {
        return true
      } else {
        const start_month = start.getMonth() + 1,
          end_month = end.getMonth() + 1,
          start_year = start.getFullYear(),
          end_year = end.getFullYear()
        if (end_year > start_year) {
          if (start_month === 12 && end_month === 1) {
            return true
          }
          return false
        } else {
          if (end_month - start_month > 1) {
            return false
          }
          return true
        }
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
      if (this.range) {
        this.startDate = this.endDate = ""
      } else {
        this.currentDate = this.showingDate = ""
      }
    },
    dateToString() {
      if (this.currentDate) {
        const y = this.currentYear
        const m = this.currentMonth
        const d = this.currentDay
        return util.formatDate(`${y}-${m}-${d}`)
      } else {
        return ""
      }
    },
    setDateByDay(day) {
      const now = new Date() - 0
      //把day转化成毫秒数
      day = day * 86400000
      const theDay = util.formatDate(day + now)
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
          const d = util.formatDate(new Date() - 0 + q.day * 86400000)
          const isIn = this.$_is_in_max_min_range(d)
          return (
            <a
              href="javascript:;"
              class={{
                "k-date-picker-quick-item": true,
                "k-date-picker-quick-disabled": !isIn
              }}
              onClick={e => {
                if (isIn) this.setDateByDay(q.day)
              }}
            >
              {q.name}
            </a>
          )
        })
      }
      if (this.range && this.quickRange && this.quickRange.length) {
        listQuickRange = this.quickRange.map(q => {
          const isIn =
            this.$_is_in_max_min_range(q.start) &&
            this.$_is_in_max_min_range(q.end)
          return (
            <a
              href="javascript:;"
              class={{
                "k-date-picker-quick-item": true,
                "k-date-picker-quick-disabled": !isIn
              }}
              onClick={e => {
                if (isIn) {
                  this.startDate = q.start
                  this.endDate = q.end
                }
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
          width: this.block ? "" : "93px",
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
          },
          keyup: e => {
            if (e.keyCode == 13) this.visible = true
          }
        }
      }
      if (this.range) {
        const rangeP = {
          attrs: {
            tabindex: 1
          },
          class: "k-date-picker-range",

          on: {
            keyup: e => {
              if (e.keyCode == 13) {
                this.visible = true
              }
            }
          },
          style: { width: this.block ? "100%" : "180px", ...this.styles }
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
      if (this.hasActions) {
        let actions = [
          <k-button
            size="mini"
            onClick={() => {
              this.clearDate()
            }}
          >
            清空
          </k-button>,
          <k-button
            size="mini"
            onClick={e => {
              this.visible = false
            }}
          >
            关闭
          </k-button>
        ]
        if (this.range) {
        } else {
          actions.push(
            <k-button
              size="mini"
              type="primary"
              onClick={e => {
                this.currentDate = this.showingDate
                this.visible = false
              }}
            >
              确定
            </k-button>
          )
        }

        return <div class="k-date-picker-actions">{actions}</div>
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
          min: this.min,
          max: this.max,
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
          min: this.min,
          max: this.max,
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
        lazy: this.lazy,
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
        const start = this.startDate,
          end = this.endDate
        let start1 = this.range ? start : this.currentDate
        let start2 = this.range ? end : ""
        if (this.range) {
          if (start && end) {
            if (util.isSameMonth(start, end)) {
              if (util.isSameYear(start, end)) {
                start2 = util.getDateByAddOneMonths(start, 1)
              }
            }
          } else {
            if (start) {
              start2 = util.getDateByAddOneMonths(start, 1)
            } else if (end) {
              start2 = end
              start1 = util.getDateByAddOneMonths(end, -1)
            } else if (!start && !end) {
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
      if (d) this.$emit("valueChange", util.formatDate(d))
      else this.$emit("valueChange", "")
    },
    value(d) {
      if (d) {
        this.currentDate = util.formatDate(d)
      }
    },
    start(d) {
      if (d) {
        this.startDate = util.formatDate(d)
      }
    },
    end(d) {
      if (d) {
        this.endDate = util.formatDate(d)
      }
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
