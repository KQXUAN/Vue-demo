// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import store from './store/store'
import VueRouter from 'vue-router';
// import  { ConfirmPlugin } from 'vux'

// Vue.use(ConfirmPlugin)
// Vue.use(ToastPlugin)
Vue.use(vuex)
Vue.config.productionTip = false

router.beforeEach((to, from,next) => {
  if(to.path.indexOf('order')>-1){
    router.push('/login')
  }
  next();

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  VueRouter,
  components: { App },
  template: '<App/>'
})
