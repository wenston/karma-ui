import css from './styles/index.css'
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'

//karma-ui引入
import * as UI from 'karma-ui'
Vue.use(UI.KButton)
Vue.use(UI.KInput)
// Vue.use(UI.KIcon)

//单个引入
// import {KButton} from 'karma-ui';
// Vue.use(KButton)

new Vue({
  components: {App},
  template:'<App/>'
}).$mount('#karma-ui')