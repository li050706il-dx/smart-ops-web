import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../views/Login.vue'; import Layout from '../layouts/MainLayout.vue'; import Dashboard from '../views/Dashboard.vue'; import Devices from '../views/Devices.vue'; import WorkOrders from '../views/WorkOrders.vue'; import Inspection from '../views/Inspection.vue'; import Notices from '../views/Notices.vue'; import Users from '../views/Users.vue'
const routes=[{path:'/login',component:Login},{path:'/',component:Layout,redirect:'/dashboard',children:[{path:'dashboard',component:Dashboard},{path:'devices',component:Devices},{path:'workorders',component:WorkOrders},{path:'inspection',component:Inspection},{path:'notices',component:Notices},{path:'users',component:Users}]}]
const router=createRouter({history:createWebHistory(),routes})
router.beforeEach(to=>{const auth=useAuthStore(); if(to.path!=='/login'&&!auth.token)return '/login'; if(to.path==='/login'&&auth.token)return '/dashboard'})
export default router
