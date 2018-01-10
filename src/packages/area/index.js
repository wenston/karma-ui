import AreaComponent from './area.vue';
AreaComponent.install = (Vue,opts) => {
  Vue.component(AreaComponent.name,AreaComponent)
};
export default AreaComponent;