import css from './styles/index.css'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'

new Vue({
  components: {App},
  template:'<App/>'
}).$mount('#karma-ui')