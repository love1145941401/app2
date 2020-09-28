import Vue from 'vue'
import App from './App'
import store from "./store"
import "mock/mockData.js"
Vue.config.productionTip = false
Vue.prototype.$appServer="http://6s43d5.natappfree.cc"
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
