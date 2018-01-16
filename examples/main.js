import css from './styles/index.css'
import Vue from 'vue'
import router from './router'
import App from './App'


//karma-ui引入
import UI from 'karma-ui'
Vue.use(UI);

new Vue({
  router,
  components: {
    App
  },
  template: '<App/>',
}).$mount('#karma-ui')