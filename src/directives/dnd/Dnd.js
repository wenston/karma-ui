import { setStyle, getStyle, offset } from 'karma-ui/util/dom.js'
export class Dnd {
  //如果有parent参数，则拖拽范围是parent内
  constructor(el, handler,  opts = {
    parent: document.body,
    limit: false
  }) {
    this.dx = 0
    this.dy = 0
    this.el = el
    this.handler = handler
    this.parent = opts.parent
    this.opts = opts
    this.eventDown = this.eventDown.bind(this)
    this.eventMove = this.eventMove.bind(this)
    this.eventUp = this.eventUp.bind(this)
    this.bindEvent()
  }
  bindEvent() {
    this.handler.addEventListener('mousedown', this.eventDown)
  }
  eventDown(e) {
    const offsetLeft = this.parent
      ? offset(this.el, this.parent).left
      : offset(this.el).left
    const offsetTop = this.parent
      ? offset(this.el, this.parent).top
      : offset(this.el).top
    const position = getStyle(this.el, 'position')
    if (position === 'static' || position === 'relative') {
      setStyle(this.el, {
        position: 'absolute',
      })
    }
    // setStyle(this.handler, {
    //   cursor: 'move',
    // })

    setStyle(this.el, this.getLeftAndTop(offsetLeft, offsetTop))
    setStyle(document.body, {
      userSelect: 'none',
    })
    this.dx = e.clientX - offsetLeft
    this.dy = e.clientY - offsetTop
    document.addEventListener('mousemove', this.eventMove)
    document.addEventListener('mouseup', this.eventUp)
  }
  eventMove(e) {
    setStyle(this.el, this.getLeftAndTop(e.clientX - this.dx, e.clientY - this.dy))
  }
  eventUp(e) {
    // setStyle(this.handler, {
    //   cursor: 'default',
    // })
    setStyle(document.body, {
      userSelect: 'auto',
    })
    document.removeEventListener('mousemove', this.eventMove)
    document.removeEventListener('mouseup', this.eventUp)
  }
  getLeftAndTop(left, top) {
    if (this.opts.limit) {
      let l = document.documentElement.clientWidth - parseFloat(getStyle(this.el, 'width'))
      let t = document.documentElement.clientHeight - parseFloat(getStyle(this.el, 'height'))
      if (left < 0) {
        left = 0
      } else if (left > l) {
        left = l
      }
      if (top < 0) {
        top = 0
      } else if (top > t) {
        top = t
      }
    }
    return {
      left: left + 'px',
      top: top + 'px'
    }
  }
  destroy() {
    this.handler.removeEventListener('mousedown', this.eventDown)
  }
}
