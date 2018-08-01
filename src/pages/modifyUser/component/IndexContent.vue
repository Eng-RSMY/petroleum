<template>
  <div>
    <div class="content">
      <div class="from">
        <div class="input-list">
          <span>用户名</span>
          <span><input type="text" :placeholder="user.username" v-model="newUserName"></span>
        </div>
        <div class="input-list">
          <span>绑定手机号</span>
          <span><input type="text" :placeholder="user.phone" v-model="newUserPhone"></span>
        </div>
        <div class="input-list">
          <span>用户真实姓名</span>
          <span><input type="text" :placeholder="user.realName" v-model="newRealName"></span>
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
                    <switch :checked="checked" />
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
                <textarea class="" :placeholder="user.remark ? user.remark : '请输入备注信息'" v-model="newRemark"/>
              </view>
            </view>
          </view>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <button @click="history">取消编辑</button>
        <button @click="update">保存并更新</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    props: ['user'],
    data () {
      return {
        accounts: [],
        accountIndex: 0,
        newUserName: '',
        newUserPhone:'',
        newRealName:'',
        newRemark:'',
        checked:''
      }
    },
    computed: {
    },
    methods: {
      bindAccountChange: function(e) {
        this.accountIndex = e.mp.detail.value
      },
      history: function() {
        wx.navigateTo({
          url: "../../pages/userManagement/main",
          fail: function (res) {
          }
        })
      },
      update: function() {
        this.$http.post(`/users/${this.$root.$mp.query.id}`,{
          username:this.newUserName || this.user.username,
          phone:this.newUserPhone || this.user.phone,
          realName:this.newUserName || this.user.realName,
          remark:this.newRemark || this.user.remark,
          roleId:this.$root.$mp.query.id
        }).then(res => {
          if (res.status == "200") {
            this.user = res.data;
            this.flag = true;
          } else {
            wx.showToast({
              title: res.statusText,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    },
    beforeMount () {
      if(this.user.enabled){
        this.checked = true
      }else {
        this.checked = false
      }
      // 获取角色
      this.$http.get("/users/roles").then((res)=>{
        if (res.status == "200") {
          for (let item of res.data) {
            this.accounts.push(item.name)
          }
        } else {
          wx.showToast({
            title: res.statusText,
            icon: 'none',
            duration: 2000
          })
        }
      })
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
  .bottom{
    padding: 20px 20px;
  }
  .bottom button {
    margin-top: 10px;
  }
  .bottom button:nth-child(1) {
    color: red;
  }
</style>
