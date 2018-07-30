<template>
  <div>
    <div class="content">
      <div class="from">
        <div class="input-list">
          <span>用户名</span>
          <span><input type="text" placeholder="请输入用户名"></span>
        </div>
        <div class="input-list">
          <span>绑定手机号</span>
          <span><input type="text" placeholder="请输入手机号"></span>
        </div>
        <div class="input-list">
          <span>用户真实姓名</span>
          <span><input type="text" placeholder="马云"></span>
        </div>
        <div class="input-list-select input-list">
          <span>设置用户角色</span>
          <span>
            <view class="weui-cell weui-cell_select">
              <view class="weui-cell__bd">
                <picker @change="bindAccountChange($event)" :value="accountIndex" :range="accounts">
                  <view class="weui-select">{{accounts[accountIndex]}}</view>
                </picker>
              </view>
            </view>
          </span>
        </div>
        <div class="input-list">
          <span>用激活账户</span>
          <span>
            <view>
              <view>
                <view>
                    <switch checked />
                </view>
              </view>
            </view>
          </span>
        </div>
        <div class="remarks">
          <view class="remarks-title">备注信息</view>
          <view class="">
            <view class="">
              <view class="">
                <textarea class="" placeholder="请输入文本"/>
              </view>
            </view>
          </view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    data () {
      return {
        accounts: ["财务人员", "业务员", "运输司机", "押车员"],
        accountIndex: 0,
      }
    },
    methods: {
      bindAccountChange: function(e) {
        this.accountIndex = e.mp.detail.value
      },
    }
  };
</script>

<style scoped>
  .content{
    background: #e7e7e7;
  }
  .from {
  }
  .input-list{
    display: flex;
    font-size: 15px;
    padding: 10px;
    margin-top: 10px;
    background: red;
    background: #fff;
    justify-content: space-between;
  }
  .input-list-select{
    height: 45px;
    line-height: 45px;
  }
  .remarks{
    background: #fff;
    padding: 10px;
  }
  .remarks-title{
    font-size: 14px;
  }
  .remarks textarea {
    background: #e7e7e7;
    width: 100%;
    font-size: 14px;
    padding: 20px 0;
    height: 30px;
    text-indent: .1rem;
  }
</style>
