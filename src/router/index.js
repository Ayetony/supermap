import Index from '@/components/Index'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import BroadCast from "@/components/BroadCast";

Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/Index'
        },
        {
            path: "/index",
            component: Index
        },
        {
            path: '/broadcast',
            component: BroadCast
        },
        {
            path: '/home',
            component: Home
        }
    ]
})
