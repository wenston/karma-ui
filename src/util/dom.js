export const setStyle = (el, p, value) => {
  if (typeof p === "object") {
    for (let k in p) {
      el.style[k] = p[k]
    }
  } else {
    el.style[p] = value
  }
}

export const getStyle = (elem, prop) => {
  return window.getComputedStyle(elem, null)[prop]
}

export const isVisible = (elem, p_elem = document.body) => {
  let isvisible = true
  function isHide(elem) {
    return (
      getStyle(elem, "display").toLowerCase() === "none" ||
      getStyle(elem, "visibility").toLowerCase() === "hidden"
    )
  }
  function fn(elem) {
    if (isHide(elem)) {
      isvisible = false
      return
    } else {
      const p = elem.parentNode
      if (p === p_elem) {
        if (isHide(p)) {
          isvisible = false
        }
        return
      } else {
        fn(p)
      }
    }
  }
  fn(elem)
  return isvisible
}

//注意，offset包含了元素内部的滚动高度！
export const offset = (elem, parent) => {
  let left = elem.offsetLeft,
    top = elem.offsetTop,
    cur = elem.offsetParent
  if (!parent) {
    while (cur) {
      left += cur.offsetLeft
      top += cur.offsetTop
      cur = cur.offsetParent
    }
  } else {
    while (cur && cur != parent) {
      left += cur.offsetLeft
      top += cur.offsetTop
      cur = cur.offsetParent
    }
  }
  return {
    left,
    top
  }
}

export const scroll = () => {
  return {
    top: Math.max(document.documentElement.scrollTop, document.body.scrollTop),
    left: Math.max(
      document.documentElement.scrollLeft,
      document.body.scrollLeft
    )
  }
}

export const client = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

//_offset是偏移量
export const scrollIntoViewIfNeed = (elem, wrapperElem, _offset = 0) => {
  if (elem && wrapperElem) {
    let top = offset(elem, wrapperElem).top
    let elemHeight = parseFloat(getStyle(elem, "height"))
    let bodyHeight = parseFloat(getStyle(wrapperElem, "height"))
    let scrollTop = wrapperElem.scrollTop
    if (top > bodyHeight + scrollTop - elemHeight || top < scrollTop) {
      wrapperElem.scrollTop = top - bodyHeight + elemHeight + _offset
    }
  } else {
    console.warn(`scrollIntoViewIfNeed函数传入了无效的参数`)
  }
}
