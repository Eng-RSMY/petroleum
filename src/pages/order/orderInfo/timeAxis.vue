<!--需要在引入后传递两个props：orderStatusFlow（流程信息） status(订单的中文状态)-->
<template>
  <div class="container">
    <div v-if="axis.length">
    <div v-for="(item,index) in axis" :key="index">
      <view class='weui-cell-list'>
        <view class='weui-cell-circle' :class="item.running?'status_running':''"></view>
        <view class='weui-cell-line' :class="item.running?'status_running':''">
          <view class='weui-cell-name'>{{item.name}}</view>
          <view class='weui-cell-time'>{{item.name}} : {{item.time}}</view>
        </view>
      </view>
    </div>
    </div>
    <div class="no-has-flow" v-else>
      暂无流程信息
    </div>
  </div>

</template>
<script>
  export default{
    data(){
      return{
        axis:[]
      }
    },
    props:["orderStatusFlow","status"],
    watch:{
      orderStatusFlow: {
        handler: function () {
          this.renderStatusFlow()
        },
        deep: true
      }
    },
    methods:{
      renderStatusFlow(){
        console.log(this.orderStatusFlow)
        console.log(this.status)
        if(JSON.stringify(this.orderStatusFlow) === '{}'){
          return false
        }
        let arr=[]
        let map=['ordered','madecard','infield','outfield','settlement','invoice','print']
        for(let index in map){
          let obj={
            name:this.orderStatusFlow[map[index]+'Name'],
            time:this.orderStatusFlow[map[index]+'Time']?this.orderStatusFlow[map[index]+'Time'].replace(/T/," "):"无",
          }
          if(this.status===obj.name) {
            obj['running']=true
          }
          else {
            obj['running'] = false
          }
          if(this.orderStatusFlow[map[index]+'Time']===null && this.status==='已取消'){
            obj={
              name:this.orderStatusFlow['cancelName'],
              time:this.orderStatusFlow['cancelTime'],
              running:true
            }
            arr.push(obj)
            break
          }
          arr.push(obj)
        }
        this.axis=arr
        console.log(this.axis)
      }
    },
    mounted(){
      this.renderStatusFlow()
    }
  }
</script>
<style>
  .container {
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:left;
    justify-content:space-between;
    padding:20rpx 20rpx;
    box-sizing:border-box;
  }
  .no-has-flow{
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color:#ddd
  }
  .status_running{
    border-color: #2E79FF !important;
  }
  .weui-cell-list{
    width:100%;
    background: #fff;
  }
  .weui-cell-line{
    width: 100%;
    margin-left: 5px;
    border-left: 1px solid #ddd;
    height: 100rpx;
    background: #fff
  }
  .weui-cell-circle{
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 10px;
    height: 10px;
    border-color: #ddd;
  }
  .weui-cell-name{
    /* width: 50px; */
    font-size:14px;
    padding-left: 15px;
    width: 72px;
  }
  .weui-cell-time{
    width: 100%;
    height: 30rpx;
    font-size: 26rpx;
    color: #ddd;
    padding-top: 15rpx;
    padding-left: 30rpx;
  }
</style>
