import pC from './pagination'
pC.install = (Vue,opts) => {
  Vue.component(pC.name, pC)
}
export default pC
