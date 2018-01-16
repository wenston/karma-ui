import CarouselComponent from './carousel.vue';
CarouselComponent.install = function(Vue,opts) {
  Vue.component(CarouselComponent.name,CarouselComponent)
}
export default CarouselComponent;