import Vue from 'vue'
import App from './App'
import "../static/weui.css"
import animate from "animate.css"
//在项目入口文件
import VueInputCode from 'vue-input-code'
Vue.component('VueInputCode', VueInputCode)
var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly
fly.config.timeout=10000;
//设置请求基地址
fly.config.baseURL="http://123.206.17.18:8081";
fly.interceptors.request.use((request)=>{
    //给所有请求添加自定义header
	request.headers["Authorization"]="bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiLllYrllYrllYoiLCJzY29wZSI6WyJyb2xlX2N1c3RvbSJdLCJleHAiOjE1NDIwOTIwODIsImF1dGhvcml0aWVzIjpbIuWPuOacuiJdLCJqdGkiOiIzYTMwYTU2Yy02YzAwLTRlNTYtODM2Ni1iN2YxMzA4YzE5ZDIiLCJjbGllbnRfaWQiOiJjdXN0b20iLCJ1c2VybmFtZSI6IuWViuWViuWViiJ9.E_AvDubjQGmIc2SeB0KtHom5W8aMoKOMxaJrW8OrRDme98gccdQSPgoXNQR-sr6cXMBSpXkjIGxcul2sBRZ-PjmSHI2Z7r8tI-NISgrgET5Ai_w3RX99ufaBfcfJ6v-y3xuapJkc4p17Kk7DE2jG8kvffaPaK0n5R4aPQuxCd095-E26fqZQUx3C9VswQADvmrg_Y0dN1nqth2uy5qzHV24nBskspuXrSubDZgFjMznyE5DbooF6dxc6NZC6EjCRj_cZFb9ss3hvXQIiuwui0ukIFg5F9KdObm8dQfTuiy2Op60Kveu0C0CVpDYA2r11z98JZM-nJXaLUrc3Fwv3bw";
	request.headers["Content-Type"]="application/json"
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

