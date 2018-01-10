import popupComponent from './popup.vue';
popupComponent.install = (Vue,opts) => {
  Vue.component(popupComponent.name,popupComponent)
}
export default popupComponent;