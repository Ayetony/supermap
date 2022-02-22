import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import ElementUI from "element-ui";
import VueBus from "vue-bus";

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(ElementUI)
Vue.use(VueBus)

const vuexStore = new Vuex.Store({
  state:{
    changed: false,
    visible : false,
    parkShow: false,
    rectsJson: '',
    clearMap: {
      videoClear: false,
      envClear: false,
      broadCastClear: false
    },
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
    },
    getRectsJson(state, arg){
      state.rectsJson = arg
    }
  },
  actions:{
    getRectsJson(context, arg){
      setTimeout(()=>{
        context.commit('getRectsJson', arg)
      },100)
    }
  }
});

new Vue({
  router: router,
  store: vuexStore,
  render: h => h(App),
}).$mount('#app')


