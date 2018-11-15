import {
  setStyle,
  getStyle
} from 'karma-ui/util/dom.js'
class Transition {
  constructor(duration, timingFunction) {
    this.duration = duration
    this.timingFunction = timingFunction
    this.offsetHeight = 0
  }
  isAppear(el) {
    let t = null
    return new Promise(res=>{

      t = setInterval(()=>{
        if(document.body.contains(el)) {
          clearInterval(t)
          res()
        }
      },8)
    })
  }
  beforeEnter(el) {
    if(document.body.contains(el)) {
      let pnode = el.parentNode
      pnode.dataset.oldHeight = getStyle(pnode,'height')
      pnode.dataset.oldOverflow = getStyle(pnode,'overflow')
      setStyle(pnode, {
        height:pnode.dataset.oldHeight,
        overflow:'hidden'
      })
      setStyle(el, {
        display:'block',
        visibility:'hidden'
      })
      this.offsetHeight = el.offsetHeight
      setStyle(el, {
        display: 'none',
        visibility:'visible',
        height: 0,
        opacity: 0
      })
      pnode.removeAttribute('style')
    }else{
      let wrapper = document.createElement('div')
      wrapper.style.cssText = 'height:0;overflow:hidden;'
      wrapper.appendChild(el)
      document.body.appendChild(wrapper)
      this.offsetHeight = el.offsetHeight
      document.body.removeChild(wrapper)
      setStyle(el, {
        height: 0,
        opacity: 0
      })
    }
  }
  enter(el, done) {
    this.isAppear(el).then(() => {
      setStyle(el, {
        height: this.offsetHeight + 'px',
        opacity: 1,
        transition: this.duration + 'ms ' + this.timingFunction
      })
    })
  }
  leave(el, done) {
    setStyle(el, {
      height: 0,
      opacity: 0
    })
    // console.log(done)
    setTimeout(() => {
      done()
    }, this.duration)
  }
  afterLeave(el) {
    el.removeAttribute('style')
    setStyle(el,{
      display: 'none'
    })
  }
}
//TODO: v-bind:css=false时，leave没有动画！怎么处理？
//TODO: 下拉时，有时会没有过渡效果！
export default {
  name: 'KTransition',
  functional: true,
  props: {
    duration: {
      type: [Number, String],
      default: 350
    },
    timingFunction: {
      type: String,
      default: 'ease'
    }
  },
  render(h, ctx) {
    const handlers = new Transition(
      ctx.props.duration,
      ctx.props.timingFunction
    )
    const children = ctx.children
    return ( <
      transition css = {
        true
      }
      // duration = {{
      //   enter:ctx.props.duration,
      //   leave:ctx.props.duration
      // }}
      onBeforeEnter = {
        handlers.beforeEnter
      }
      onEnter = {
        handlers.enter
      }
      onLeave = {
        handlers.leave
      }
      onAfterLeave = {
        handlers.afterLeave
      } >
      {
        children
      } <
      /transition>
    )
  }
}