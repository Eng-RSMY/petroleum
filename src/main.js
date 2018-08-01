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
	request.headers["Authorization"]="bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJvbGVfY3VzdG9tIl0sImV4cCI6MTU0MjA4NjMyMCwiYXV0aG9yaXRpZXMiOlsi5Y-45py6Il0sImp0aSI6IjkwMWZlOWUyLTA0NTItNDk0MS04NjZkLTkwMTE5NDgzNzA1ZSIsImNsaWVudF9pZCI6ImN1c3RvbSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.Fx4Uga_HqtpwF8i0rYxC6TyiGhIj6W6Hr_LX1i_lj8uC-DoU71rVdL-GWlyXC0EmGtC08Hd169INgjNh6JAkiDIPq3UCO6lgTKOHd9raY-Qitby-nGT5mte6dDsSLS3U-DgVVvIFMM_0kKPcIbfchgmqH7s5nTJfOd40JnQHaRqfBvV0FMazivTo2HPzMwxgfUN8lJJjsEkDrUQxRMt0_-dyExWUa74BAYMI04noIRy4KSTcrzlHW0lpLEAqEPaym88w7mIQK4gt3axuM-FVPu8PwIF-qiJRhlnFQFuAqxBbKQheLM02OFRD03if7225cYa5GN7_PFgt214ltBY0bQ";
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

