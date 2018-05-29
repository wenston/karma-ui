//判断当前元素是否出现在可视区内
import {
  getStyle,
  scroll,
  client,
  offset
} from 'karma-ui/util/dom.js'
const check = '@@checkVisible'
const inVisible = ({
  el = null, //元素
  once = false, //到可视区后只触发一次回调，然后解除绑定。但解除绑定之前，unviewable会一直触发。如果用在懒加载组件上，建议给true。以减少资源占用
  delay = 0, //延迟触发回调
  viewable, //出现在可视区后回调
  unviewable, //不在可视区的回调
}) => {
  if (!el) {
    console.error('inVisible:', '请传入一个元素')
    return
  }
  let timer = null
  el[check] = () => {
    if (!document.body.contains(el)) return;
    let scrollTop = scroll().top,
      clientHeight = client().height,
      elOffsetTop = offset(el).top,
      elHeight = parseInt(getStyle(el, 'height'))
    elHeight = isNaN(elHeight) ? 0 : elHeight

    //何时不在可视区。注意要监控scroll 和 resize事件
    // scrollTop>elOffsetTop+elHeight || scrollTop+clientHeight<elOffsetTop

    //如果不在可视区
    if (scrollTop > elOffsetTop + elHeight || scrollTop + clientHeight < elOffsetTop) {

      unviewable && unviewable()
    } else { //如果在可视区
      if (once) {
        window.removeEventListener('scroll', el[check])
        window.removeEventListener('resize', el[check])
        el[check] = null
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        viewable && viewable()
      }, delay)
    }
  }

  window.addEventListener('scroll', el[check])
  window.addEventListener('resize', el[check])
  el[check](); //要不要加，不加的时候，如果初始页面的scrollTop是0的时候，就不会触发回调？
}

export default inVisible