import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import '@supermap/iclient-leaflet'
import 'leaflet/dist/leaflet.css'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import ElementUI from "element-ui";

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(ElementUI)

const vuexStore = new Vuex.Store({
  state:{
    visible : false,
    parkShow: false,
    clearMap: {
      videoClear: false,
      envClear: false,
      broadCastClear: false
    }
  },
  mutations:{
    getVisible(state,arg){
      state.visible = arg
    },
    getParkShow(state,arg){
      state.parkShow = arg;
    },
    getVideoClear(state, arg){
      state.clearMap.videoClear = arg
    },
    getEnvClear(state, arg){
      state.clearMap.envClear = arg;
    },
    getBroadCastClear(state, arg){
      state.clearMap.broadCastClear = arg;
    }
  }
});

new Vue({
  router: router,
  store: vuexStore,
  render: h => h(App),
}).$mount('#app')


