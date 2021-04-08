function isLeapYear(y) {
  const cond1 = y % 4 == 0 //条件1：年份必须要能被4整除
  const cond2 = y % 100 != 0  //条件2：年份不能是整百数
  const cond3 = y % 400 == 0  //条件3：年份是400的倍数
  //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
  //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
  //所以得出判断闰年的表达式：
  return cond1 && cond2 || cond3
}
export const toDateType = v => {
  let value = v
  if (typeof value === "string") {
    value = value.split(".")[0]
    value = (value + "Z")
      .replace(/\//g, "-")
      .replace(/[\u4E00-\u9FA5]/g, "")
      .replace(/-(\d+)-(\d+)/, function(all, a, b) {
        ;/^\d$/.test(a) && (a = "0" + a)
        ;/^\d$/.test(b) && (b = "0" + b)
        return "-" + a + "-" + b
      })
      .replace(/(\d+):(\d+):(\d+)/, function(all, a, b, c) {
        let arrTemp = []
        ;/^\d$/.test(a) && (a = "0" + a)
        ;/^\d$/.test(b) && (b = "0" + b)
        ;/^\d$/.test(c) && (c = "0" + c)
        arrTemp.push(a, b, c)
        return arrTemp.join(":")
      })
      .replace(/\d(\s+)\d/, function(all, a) {
        if (/^\s+$/.test(a)) {
          return all.replace(a, "T")
        }
      }) //强制把时间格式加T
  }
  let dt = value
  if (Object.prototype.toString.call(dt) !== "[object Date]") {
    dt = new Date(new Date(value).toUTCString().replace("GMT", ""))
  }
  if(typeof v === 'string' &&  dt == "Invalid Date") {
    dt = new Date(v.replace(/\-/g, '/'))
  }
  if (dt == "Invalid Date") {
    //后台有时候是mm-dd-yyy  经过前面一系列变化，在加上t，就成了无效的日期，加t 只能是yyyy-mm-dd
    if (value) {
      dt = new Date(
        new Date(value.replace(/t/i, " ")).toUTCString().replace("GMT", "")
      )
    }
  } 
  return dt

  // var year = dt.getFullYear()
  // var month = parseInt(dt.getMonth()) + 1
  // var day = parseInt(dt.getDate())
  // var hours = parseInt(dt.getHours())
  // var minutes = parseInt(dt.getMinutes())
  // var seconds = parseInt(dt.getSeconds())

  // month = month < 10 ? "0" + month : month
  // day = day < 10 ? "0" + day : day
  // hours = hours < 10 ? "0" + hours : hours
  // minutes = minutes < 10 ? "0" + minutes : minutes
  // seconds = seconds < 10 ? "0" + seconds : seconds
  // return {
  //   year: year,
  //   month: month,
  //   day: day,
  //   hours: hours,
  //   minutes: minutes,
  //   seconds: seconds
  // }
}
export const getNow = () => {
  let now = null
  if (!now) {
    return (() => {
      return new Date()
    })()
  }
  return now
}
export const getMonths = y => [undefined, 31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const weeks = [undefined, '一', '二', '三', '四', '五', '六', '日']
//根据月，向前或者后获取月
export const addMonths = (m, n) => {
  m = +m
  n = +n
  let next = (m + n) % 12
  if (next === 0) {
    next = 12
  }
  return next
}
//获取上个月、下个月的日期
export const getDateByAddOneMonths = (date, n) => {
  date = toDateType(date)
  const month = date.getMonth() + 1
  const y = date.getFullYear()
  const month_n = addMonths(month, n)
  if (n === 1 && month > month_n) {
    return `${y + 1}-${month_n}-01`
  } else if (n === -1 && month < month_n) {
    return `${y - 1}-${month_n}-01`
  }
  return `${y}-${month_n}`
}
export const isSameMonth = (date1, date2) => {
  date1 = toDateType(date1)
  date2 = toDateType(date2)
  return date1.getMonth() === date2.getMonth()
}
export const isSameYear = (date1, date2) => {
  date1 = toDateType(date1)
  date2 = toDateType(date2)
  return date1.getFullYear() === date2.getFullYear()
}
export const isSameDay = (d1, d2) => {
  d1 = toDateType(d1)
  d2 = toDateType(d2)
  return d1.getDate() === d2.getDate()
}
export const isSameDate = (d1, d2) => {
  //只比较是否同年同月同日
  return isSameDay(d1, d2) && isSameMonth(d1, d2) && isSameYear(d1, d2)
}
export const formatDate = (date) => {
  date = toDateType(date)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  return `${y}-${m}-${d}`
}
export const addDays = (date, day) => {
  date = toDateType(date) - 0
  day = day * 86400000
  return formatDate(date + day)
}
export const getMondayInThisWeek = () => {
  const d = getNow()
  let day = d.getDay()
  if(day === 0) {
    day = 7
  }
  return addDays(new Date(), (day - 1) * -1)
}
export const getLastWeek = () => {
  const thisMonday = getMondayInThisWeek()
  const start = addDays(thisMonday, -7)
  const end = addDays(start, 6)
  return { start, end }
}
export const getFirstDayInThisMonth = () => {
  const d = getNow()
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  return formatDate(`${y}-${m}-1`)
}
export const getLastMonth = () => {
  const d = getNow()
  const m = d.getMonth() + 1
  let y = d.getFullYear()
  const lastM = addMonths(m,-1)
  if(lastM>m) {
    y = y - 1
  }
  const days = getMonths(y)[lastM]
  const start = formatDate(`${y}-${lastM}-1`)
  return {
    start,
    end: formatDate(addDays(start,days-1))
  }
}
export default {
  toDateType,
  getNow,
  getMonths,
  weeks,
  addMonths,
  isSameDay,
  isSameYear,
  isSameMonth,
  isSameDate,
  getDateByAddOneMonths,
  formatDate,
  addDays,
  getMondayInThisWeek,
  getLastWeek,
  getFirstDayInThisMonth,
  getLastMonth
}
