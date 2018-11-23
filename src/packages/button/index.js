import ButtonComponent from './button.jsx'
ButtonComponent.install = (Vue, options = {}) => {
  Vue.component(ButtonComponent.name,ButtonComponent)
}
export default ButtonComponent