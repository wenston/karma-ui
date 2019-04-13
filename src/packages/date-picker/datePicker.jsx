import KInput from "karma-ui/packages/input/input.jsx"
import KDropdown from "karma-ui/packages/dropdown/dropdown"
import util from "./util/date"
export default {
  name: "KDatePicker",
  components: {
    KInput,
    KDropdown
  },
  props: {
    ...KInput.props,
    readonly: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Number, String, Date],
      default: ""
    }
  },
  model: {
    prop: "value",
    event: "valueChange"
  },
  methods: {
    renderTitle() {
      const p = {
        props: {
          ...this.$props
        }
      }
      return <k-input {...p} />
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
    //根据年、月、日渲染出某月的所有天
    _renderDays(D) {
      D = new Date(D)

      let year = D.getFullYear()
      let month = D.getMonth() + 1
      //某月第一天对应的完整日期
      const firstDate = new Date(year + "-" + month + "-" + 1)
      //获取某月第一天的对应星期几
      const w = firstDate.getDay()
      console.log(year + "-" + month + "-" + 1, w)
      //获取上个月
      const lastMonth = util.addMonths(month, -1)
      //判断上个月的年份
      const lastYear = lastMonth > month ? year - 1 : year
      //获取本月共有天数
      const monthDays = util.getMonths(year)[month]
      //获取上个月的共有天数
      const lastMonthTotalDays = util.getMonths(lastYear)[lastMonth]

      //渲染出month对应的所有天，一共6行，多了的行显示下一个月的前几天
      let i = 1
      let tds = []
      while (i <= monthDays) {
        tds.push(<td>{i++}</td>)
      }
      //补充上个月的几天
      {
        let d = w - 1
        let n = 0
        while (d - n >= 1) {
          console.log(d, n)
          tds.unshift(
            <td class="k-date-picker_not_cur_month">
              {lastMonthTotalDays - n}
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
          tds.push(<td class="k-date-picker_not_cur_month">{i++}</td>)
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
        <div class="k-date-picker">
          <table class="k-date-picker-main">
            {this._renderWeeksTitle()}
            {this._renderDays("2019-05-01")}
          </table>
        </div>
      )
    }
  },
  render() {
    const p = {
      props: {
        title: this.renderTitle(),
        body: this.renderBody(),
        bodyClassName: "k-date-picker"
      }
    }
    return <KDropdown {...p} />
  }
}
