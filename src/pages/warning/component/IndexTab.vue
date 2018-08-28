<template>
  <div>
    <div class="top">
      <div>预警级别</div>
      <div>
        <view class="weui-cell weui-cell_select">
          <view class="weui-cell__bd">
            <picker @change="bindAccountChange($event)" :value="accountIndex" :range="accounts">
              <view class="weui-select">{{accounts[accountIndex]}}</view>
            </picker>
          </view>
        </view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    data () {
      return {
        accounts: ["全部级别", "1级", "2级", "3级", "4级", "5级"],
        accountIndex: 0
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
  .top{
    width: 100%;
    display: flex;
	position: fixed;
	left: 0px;
	top: 0px;
    background: #2E79FF;
	z-index: 99999
  }
  .top div{
    width: 50%;
    text-align: center;
    height: 40px;
    color: #fff;
    font-size: 14px;
    line-height: 40px;
  }

</style>
