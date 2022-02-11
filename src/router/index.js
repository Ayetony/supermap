import Index from '@/components/Index'
import Vue from 'vue'
import VueRouter from 'vue-router'
import ParkQuery from "@/components/ParkQuery";
import Home from "@/components/Home";

Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: "/index",
            component: Index
        },
        {
            path: '/park',
            component: ParkQuery
        },
        {
            path: '/home',
            component: Home
        }
    ]
})
