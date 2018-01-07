import css from './styles/index.css'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'

//karma-ui引入
import * as UI from 'karma-ui'

Vue.use(UI.KButton)

new Vue({
  components: {App},
  template:'<App/>'
}).$mount('#karma-ui')