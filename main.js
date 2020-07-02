import Vue from 'vue'
import App from './App'
import api from './common/api.js'
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store
Vue.prototype.$api = api;

const app = new Vue({
	api,
	store,
    ...App
})
app.$mount()
