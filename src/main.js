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
	// request.headers["Authorization"]="bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJvbGVfY3VzdG9tIl0sImV4cCI6MTUzNTk5NDMxOSwiYXV0aG9yaXRpZXMiOlsi6K6i5Y2VIiwi6LSm5Y2V5p-l6K-iIiwi6Ieq5Yqp5LiL5Y2VIiwi5byA56Wo5L-h5oGvIiwi5Lu35qC85p-l6K-iIiwi5a6i5pyN55S16K-dIiwi5rGH5qy-5L-h5oGv5p-l6K-iIiwi6K6i5Y2V6Lef6LiqIiwi5Lia5Yqh5ZGYIiwi5YWs5Y-46LSm5oi35L2Z6aKdIl0sImp0aSI6ImE1ZGMwYzNhLTMwZDgtNDNjZS1iYTZhLTE1N2JjN2ZlNDAwNiIsImNsaWVudF9pZCI6ImN1c3RvbSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.oDOfOC2gFksUHgy7TDfpCIRJ2bRODqXkQj6dXGfzATnjHheNMwgtCBr2ai3-q0Qv6A9p_LuWids6lEsHB1tDZX-dK1m35wTGVgA9rmAvZempMRJQIvBB0t1sRLcN6axR_o6YIAzlg23_hrUm_CqnwSRnDARWqHWWXnKbLrFKK1DiYfn8c1p9unTOmj-tht3fpvzaJC1Ae9OrO0hsKE9s9dvRyFqPI1o6o8jik3qT6kpMWl1pYabOB442Hy-a5x7a1Vy4J201sXor2a4qYap3vFXJ3BBr_ZBVYZ897XUZ_NeirV8a4zISTwNJoZ75Yy80fxcHq1zjoJ5M_ccfRfG-Tw";

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

