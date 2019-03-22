export const throttle = (interval= 100) => {
  let last = +new Date(), timer, now = +new Date()
  if(now - last > interval) {
    return new Promise(res=>{
      timer = setTimeout(()=>{
        res()
      }, interval)
    })
  }else{
    clearTimeout(timer)
    return Promise.reject()
  }
}
let debounceTimer = null
export const debounce = (delay = 100) => {
  // let timer = null
  clearTimeout(debounceTimer)
  return new Promise((resolve)=>{
    debounceTimer = setTimeout(()=>{
      resolve()
    }, delay)
  })
}