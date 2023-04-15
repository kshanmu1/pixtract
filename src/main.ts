import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Highcharts from "highcharts";
import Maps from "highcharts/modules/map";
import HighChartsVue from 'highcharts-vue'

Vue.config.productionTip = false

//Use highcharts
Maps(Highcharts);
Vue.use(HighChartsVue)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
