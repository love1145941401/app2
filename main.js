import Vue from 'vue'
import App from './App'
import store from "./store"
Vue.config.productionTip = false
Vue.prototype.$appServer="http://kv73kg.natappfree.cc"
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
