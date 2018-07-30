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
	request.headers["Authorization"]="bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJvbGVfY3VzdG9tIl0sImV4cCI6MTU0MTY1Nzk4OCwiYXV0aG9yaXRpZXMiOlsiMTIzIiwiMTIzMTIiLCIxMjMyMiIsIuS8geS4mueuoeeQhuWRmCJdLCJqdGkiOiJhOGEzYTZlNi1hNjJjLTRmYjItODhjMy1hOGJmMDRlYjY3MmYiLCJjbGllbnRfaWQiOiJjdXN0b20iLCJ1c2VybmFtZSI6ImFkbWluIn0.Pk_eKdD5WYIqsL5umBeWLXzegChScLlXGGtXjwVghz9q8jKX7bPktmklvivdEW512-gBLJglEyaq6LbfQ9-YgXTVQKCrZ9DGTsmT61hK5P0AsMITslxNiOy7YmZgihMdgS1BxMqs_K4M6wt7Kxt7a8o-Gtt0wS2lCGkTD1tYbEwGtjf-oWIbqeM8ast7K_9n5hq-llMdqkkpW2UcozmKpVQ6QmG33KuTW-AFTCTCvZRIfzLIaHH4hHCHQbrn1OZLq7u74bnF1-qjpsJetCaNFfbEXRAaPItfXGoEd2ixtoWXCXxoTQ-0SlADto_e6L2lA0tu2Ifyn1DH5mH-_N9Hrw";
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

