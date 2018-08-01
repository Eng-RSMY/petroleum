<template>
  <div>
    <div class="content">
      <div class="from">
        <div class="input-list">
          <span>公司名称</span>
          <span><input type="text" placeholder="山东XXX"></span>
        </div>
        <div class="input-list">
          <span>公司联系人</span>
          <span><input type="text" placeholder="马云"></span>
        </div>
        <div class="input-list">
          <span>联系人电话</span>
          <span><input type="text" placeholder="1888888888"></span>
        </div>
        <div class="remarks">
          <view class="remarks-title">公司地址</view>
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
    margin-top: 10px;
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
