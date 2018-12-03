<template>
  <div>
    <div class="top">
      <div @click="toPermission">配置角色权限</div>
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
        accounts: ["全部用户", "管理员用户", "财务人员", "业务员", "运输司机", "押车员"],
        accountIndex: 0
      }
    },
    methods: {
      bindAccountChange: function(e) {
        this.accountIndex = e.mp.detail.value
      },
      toPermission () {
        wx.navigateTo({
          url: "../../pages/permission/main",
          fail: function (res) {
          }
        })
      }
    }
  };
</script>

<style scoped>
  .top{
    width: 100%;
    display: flex;
    background: #2E79FF;
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
