import Vue from 'vue'
import App from './App'

// 引入阿里图标
import "./static/icon/iconfont/iconfont.css"
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
