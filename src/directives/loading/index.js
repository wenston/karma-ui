import Vue from 'vue'
import {
  getStyle,
  setStyle
} from 'karma-ui/util/dom'
import {
  debounce
} from 'karma-ui/util/throttle_debounce'
import LoadingComponent from 'karma-ui/packages/loading/Loading.vue'
const instance = '@@instance'

export default {
  bind(el, binding) {
    const LoadingConstructor = Vue.extend(LoadingComponent)
    el[instance] = new LoadingConstructor().$mount()
    el[instance].setSize(true).setPosition('absolute')
    const position = getStyle(el, 'position')
    if (position !== 'fixed' && position !== 'relative' && position !== 'absolute') {
      setStyle(el, 'position', 'relative')
    }
    el.appendChild(el[instance].$el)
  },
  inserted(el, binding) {
    let isShow = false,v = binding.value
    if(typeof v === 'boolean') {
      isShow = v
    }else{
      isShow = v.loading
    }
    el[instance].setOptions(v)
    isShow && el[instance].show()
  },
  update(el, binding) {
    let isShow = false, v= binding.value
    if(typeof v === 'boolean') {
      isShow = v
    }else{
      isShow = v.loading
    }
    el[instance].setOptions(v)
    if (isShow) {
      debounce().then(el[instance].show)
    } else {
      debounce().then(el[instance].hide)
    }
  },
  unbind(el, binding) {
    el[instance] = null
  }

}