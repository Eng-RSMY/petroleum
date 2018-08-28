import Vue from 'vue'
import App from './App'
import "../static/weui.css"
import animate from "animate.css"
import cookies from 'weapp-cookie'
//在项目入口文件
import VueInputCode from 'vue-input-code'
let Base64 = require('js-base64').Base64;
Vue.component('VueInputCode', VueInputCode)
var Fly=require("flyio/dist/npm/wx")
var fly=new Fly
fly.config.timeout=10000;
//设置请求基地址
fly.config.baseURL="http://123.206.17.18:8081";
fly.interceptors.request.use((request)=>{
	//给所有请求添加自定义header
	console.log(request)
	if(request.url=="/public/companies"){
		request.headers["Content-Type"]="application/json"
	}else if(request.url == "/public/login_code"){
		request.headers["Content-Type"]="application/x-www-form-urlencoded"
	}else if(request.url == "/oauth/token"){
		var Authorization=Base64.encode("custom:password")
		console.log(Authorization)
		request.headers["Authorization"]="Basic "+Authorization;
		request.headers["Content-Type"]="application/x-www-form-urlencoded"
	}else{
		var token_type=wx.getStorageSync("token_type")
		var access_token=wx.getStorageSync("access_token")
		request.headers["Content-Type"]="application/json"
		request.headers["Authorization"]=token_type+access_token;

	}
	// request.headers["Content-Type"]="application/json"
	// request.headers["Authorization"]="bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJvbGVfY3VzdG9tIl0sImV4cCI6MTU0NDE4NTEwOSwiYXV0aG9yaXRpZXMiOlsi6K6i5Y2VIiwi6LSm5Y2V5p-l6K-iIiwi6Ieq5Yqp5LiL5Y2VIiwi5byA56Wo5L-h5oGvIiwi5Lu35qC85p-l6K-iIiwi5a6i5pyN55S16K-dIiwi5rGH5qy-5L-h5oGv5p-l6K-iIiwi6K6i5Y2V6Lef6LiqIiwi5Lia5Yqh5ZGYIiwi5YWs5Y-46LSm5oi35L2Z6aKdIiwi5oiR55qEIl0sImp0aSI6IjE1YWIzZjQzLWU5ZmEtNDBiNi1iZTU5LWQzMTNiMzE1NjdjMyIsImNsaWVudF9pZCI6ImN1c3RvbSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.Qq5WFMr73BeHr_l9RqAIm8OE3a-XQ-FykqBLme5C0pyv4jO16L1b2-xPRvPvIPIFkFbEWjENEKctpyUA4l0buu6p1TCh4j1sdP7iSLKJDluQTdhUxJBLmOzssJw7JGSeFNjsqSbWcm8x7wu_i5Dcgx9bu4-66nyCNnuM9TAvR6CF7CFZn93VS1UJiQSv41gzUekIW1lm8jEGljhr5KkNAhyBQPr0xYEg-pAQWt1bG-1DmGyFKPGh2251FnbNksRT9-aDuF39Ggeil9wBibS7mzX3ghX-TekgDzLqH3Ch8bcQUeQDl2hG_puCiHN226JApeuT-Nz2Yc7p93l3cPxrPg";

      //打印出请求体
      console.log(request.body)
      //终止请求
      //var err=new Error("xxx")
      //err.request=request
      //return Promise.reject(new Error(""))

    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
		//只将请求结果的data字段返回
        return response
    },
    (err) => {
        //发生网络错误后会走到这里
        //return Promise.resolve("ssss")
    }
)
Vue.prototype.$http=fly //将fly实例挂在vue原型上
Vue.use(animate)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

