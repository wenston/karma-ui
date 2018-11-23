//全局配置各个组件的参数，如果prop有默认值，就可以全局设置参数
// 例：
// Vue.use(karmaUI, {
//   KButton: {
//     size: 'large',
//     type: 'danger',
//     tag: 'span'
//   },
//   KInput: {
//     size: 'large',
//     type: 'number',
//   }
// })
export default (comp, options = {}) => {
  if(comp.props) {
    let props = comp.props
    for(let prop in props) {
      if('default' in props[prop]) {
        if(options[prop]) {
          props[prop].default = options[prop]
        }
      }
    }
  }
}