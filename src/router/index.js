import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import BroadCast from "@/components/broadcast/broadCast";
import IndexMap from "@/components/video/indexMap"
import EnvMonitor from "@/components/environment/envMonitor";

Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: "/index",
            component: IndexMap
        },
        {
            path: '/broadcast',
            component: BroadCast
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/env',
            component: EnvMonitor
        }
    ]
})
