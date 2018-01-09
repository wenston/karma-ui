import css from './styles/index.css'
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'

//karma-ui引入
import * as UI from 'karma-ui'
for(let ui in UI) {
  Vue.use(UI[ui])
}
// Vue.use(UI.KButton)
// Vue.use(UI.KInput)
// Vue.use(UI.KSelect)
// Vue.use(UI.KOption)
// Vue.use(UI.KIcon)

//单个引入
// import {KButton} from 'karma-ui';
// Vue.use(KButton)

new Vue({
  components: {App},
  template:'<App/>'
}).$mount('#karma-ui')