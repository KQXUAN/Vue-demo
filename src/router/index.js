import Vue from 'vue'
import Router from 'vue-router'

import index from '@/views/index'
// 酒店
import allHotel from '@/views/allHotel'
import hotel from '@/views/hotel';
//景点
import allScene from '@/views/allScene'
import scene from '@/views/scene';
//地图
import map from '@/views/map'
//订单页面
import order from '@/views/orderHotel'
//个人页面
import personal from '@/views/personal'
import orderPage from '@/views/orderPage'
//登录页面
import login from '@/views/login'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/allHotel',
      name: 'allHotel',
      component: allHotel
    },{
      path: '/hotel/:id',
      name: 'hotel',
      component: hotel
    },{
      path: '/allScene',
      name: 'allScene',
      component: allScene
    },
    {
      path: '/scene/:id',
      name: 'scene',
      component: scene
    },
    {
      path: '/order/:type/:id/:room',
      name: 'order',
      component: order
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },{
      path: '/orderPage',
      name: 'orderPage',
      component: orderPage
    },{
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
