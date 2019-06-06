import DPComponent from './datePicker';
DPComponent.install = function (Vue, opts) {
  Vue.component(DPComponent.name, DPComponent)
}
export default DPComponent;