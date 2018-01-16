import CarouselItemComponent from './carouselItem.vue';
CarouselItemComponent.install = function(Vue,opts) {
  Vue.component(CarouselItemComponent.name,CarouselItemComponent)
}
export default CarouselItemComponent;