<template>
  <div>
    <modal :hidden="hidden" confirm-text="关闭" @confirm="confirm" no-cancel="nocancel">
      <div class="filterbox">
        <input class="componyinput" v-model="componyName" type="text" placeholder="请输入公司名称" @change="queryComponys">
        <div v-show="hasCompony" class="compony_list">
          <div class="compony" v-for="(item,index) in componyList" :key="index" @click="chooseCompony(item)">{{item.name}}</div>
        </div>
        <div  v-show="!hasCompony" class="no_compony_list">
          暂无数据
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
  export default {
    props:["isHidden","phoneNum"],
    data(){
      return{
        hidden:!this.isHidden,
        nocancel:'nocancel',
        compony:{},
        componyName:'',
        componyList:[],
        hasCompony:false
      }
    },
    methods:{
      queryComponys() {
        const that=this
        let params = {
          phone:this.phoneNum,
        }
        if(this.componyName){
          params['companyName']=this.componyName
        }
        this.$http.get(`/public/companies`, params).then(res => {
          if (res.data.length>0) {
            that.componyList=res.data
            that.hasCompony=true
          }else {
            that.hasCompony=false
          }
        }).catch(res => {
          wx.showToast({
            title: res.response.data.message,
            icon: 'none',
            duration: 2000
          })
        })
      },
      chooseCompony(item){
        this.company=item
        this.confirm()
      },
      confirm(){
        this.hidden=true
        this.$emit("change",!this.hidden,this.company)
      }
    },
    mounted(){
      this.queryComponys()
    }
  }
</script>

<style>
  .filterbox {
    height: 600rpx;
    width: 100%;
  }
  .componyinput{
    width: 100%;
    display: block;
    height: 100rpx;
    line-height: 45px;
    background-color: #fff;
    padding-left: 16px;
    box-sizing: border-box;
    color: #565656;
    vertical-align: middle;
    border: 1rpx solid #565656;
  }
  .compony_list{
    overflow: scroll;
    height: 500rpx;
  }
  .no_compony_list{
    text-align: center;
    height: 500rpx;
    line-height: 500rpx;
  }
  .compony{
    border: 1rpx solid #f0f0f0;
    border-top: 0;
    overflow: auto;
    height: 100rpx;
    line-height: 45px;
    width: 100%;
  }
  .compony:hover {
    background-color: #f0f0f0;
  }
</style>
