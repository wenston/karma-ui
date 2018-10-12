export const setStyle = (el, p, value) => {
  if (typeof p === 'object') {
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

export const offset = (elem, parent) => {
  let left = elem.offsetLeft,
    top = elem.offsetTop,
    cur = elem.offsetParent;
  if (!parent) {

    while (cur) {
      left += cur.offsetLeft;
      top += cur.offsetTop
      cur = cur.offsetParent;
    }
  } else {
    while (cur != parent) {
      left += cur.offsetLeft;
      top += cur.offsetTop
      cur = cur.offsetParent;
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
    left: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)
  }
}

export const client = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}