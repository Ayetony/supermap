import Vue from 'vue'
import App from './App.vue'
import '@supermap/iclient-leaflet'
import 'leaflet/dist/leaflet.css'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'


Vue.config.productionTip = false

import ElementUI from "element-ui";
Vue.use(ElementUI)

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')


