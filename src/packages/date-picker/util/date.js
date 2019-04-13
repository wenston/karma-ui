function isLeapYear(y) {
  const cond1 = y % 4 == 0 //条件1：年份必须要能被4整除
  const cond2 = y % 100 != 0  //条件2：年份不能是整百数
  const cond3 = y % 400 ==0  //条件3：年份是400的倍数
  //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
  //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
  //所以得出判断闰年的表达式：
  return cond1 && cond2 || cond3
}
export const getMonths = y => [undefined,31,isLeapYear(y)?29:28,31,30,31,30,31,31,30,31,30,31]
export const weeks = [undefined,'一','二','三','四','五','六','日']
//根据月，向前或者后获取月
export const addMonths = (m,n) => {
  m=+m
  n=+n
  return (m+n)%12
} 
export default {
  getMonths,
  weeks,
  addMonths
}
