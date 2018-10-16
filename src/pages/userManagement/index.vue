<template>
  <div style="width:100%;overflow-x:hidden">
    <!-- <index-tab></index-tab> -->
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
    <div class="searchBox">
      <div class="weui-search-bar weui-search-bar_focusing" id="searchBar">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" class="weui-search-bar__input" id="searchInput" v-model="nameOrPhone" @change="search"
                 placeholder="搜索用户姓名或手机号" required/>
          <div class="search-box-cancel" v-show="nameOrPhone" @click="cancelSearch">
            重置
          </div>
        </div>
      </div>
    </div>
    <!-- <index-content :userList="userList"></index-content> -->
    <div class="content" v-if="ishave">
      <div class="contentList" @click="edit(item.id)" v-if="showList" v-for="item in userList" :key="item.id">
        <div style="width:70%;padding-left: 20px;box-sizing: border-box">
          <p>
            <span class="spanFirst">用户名</span>
            <span class="spanLast">{{item.realName}}</span>
          </p>
          <p>
            <span class="spanFirst">角色</span>
            <span class="spanLast">{{item.roleName}}</span>
          </p>
          <p>
            <span class="spanFirst">绑定手机号</span>
            <span class="spanLast">{{item.phone}}</span>
          </p>
        </div>
        <div style="width:30%;padding-right: 20px;box-sizing: border-box">
          <button v-if="item.enabled">激活中</button>
          <button class="not" v-else>未激活</button>
        </div>
      </div>
    </div>
    <div v-else>
      <img src="/static/images/none.png" alt="" class="img3">
    </div>
    <!-- 底部 -->
    <div v-if="isshow">
      <div class="footer" v-if="foot">
        <p @click="loadingMore">加载更多</p>
      </div>
      <div class="footer" v-else>
        <p>已经到底了</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        userList: [],
        accounts: ["全部用户"],
        accountIndex: 0,
        nameOrPhone: '',
        foot: true,
        isshow: false,
        ishave: false
      }
    },
    methods: {
      loadingMore: function () {
        this.page = this.page + 1
        var params = {
          nameOrPhone: this.nameOrPhone,
          page: this.page,
          size: 5,
          sort: "id,desc"
        }
        this.$http.get("/users", params)
          .then(res => {
            console.log(res)
            if (res.status == "200") {
              if (res.data.content.length > 0) {
                for (var i = 0; i < res.data.content.length; i++) {
                  this.userList.push(res.data.content[i]);
                }
                console.log(this.userList)
              } else {
                this.foot = false
              }
            } else {
              wx.showToast({
                title: res.statusText,
                icon: 'none',
                duration: 2000
              })
            }
          })

      },
      edit(id) {
        wx.navigateTo({
          url: `../../pages/modifyUser/main?id=${id}`,
          fail: function (res) {
            console.log(res)
          }
        })
      },
      cancelSearch() {
        this.nameOrPhone = ''
        this.search()
      },
      search() {
        let nameOrPhone = this.nameOrPhone
        this.accountIndex = 0
        this.page = 0
        let params = {
          nameOrPhone,
          page: this.page,
          size: 5,
          sort: "id,desc"
        }
        this.$http.get("/users", params).then(res => {
          if (res.status == "200") {
            if (res.data && res.data.content && res.data.content.length > 0) {
              this.ishave = true
              this.userList = res.data.content;
            }
            if (res.data.content.length > 0 && res.data.content.length < 5) {
              this.isshow = false;
              this.foot = false;
            } else if (res.data.content.length == 5) {
              this.isshow = true;
              this.foot = true;
            } else {
              this.ishave = false
              this.userList = []
            }

          } else {
            wx.showToast({
              title: res.statusText,
              icon: 'none',
              duration: 2000
            })
          }
        }).catch(res => {
          console.log(res)
          wx.showToast({
            title: res.response.data.message,
            icon: 'none',
            duration: 2000
          })
        })
      },
      bindAccountChange: function (e) {
        this.nameOrPhone = ""
        this.accountIndex = e.mp.detail.value
        if (this.accountIndex > 0) {
          var params = {
            roleId: this.roleList[(e.mp.detail.value - 1)].id
          }
          this.$http.get("/users/searchByRoleId", params).then(res => {
            console.log(res)
            if (res.data.content.length > 0) {
              this.userList = res.data.content
            } else {
              this.userList = [];
              wx.showToast({
                title: "未查询到数据",
                icon: 'none',
                duration: 2000
              })
            }


          }).catch(res => {
            console.log(res)
            wx.showToast({
              title: res.response.data.message,
              icon: 'none',
              duration: 2000
            })
          })
        } else {
          let params = {
            page: this.page,
            size: 5,
            sort: "id,desc"
          }
          this.$http.get("/users", params).then(res => {
            if (res.status == "200") {
              if (res.data && res.data.content && res.data.content.length > 0) {
                this.ishave = true
                this.userList = res.data.content;
              }
              if (res.data.content.length > 0 && res.data.content.length < 5) {
                this.isshow = false;
                this.foot = false;
              } else if (res.data.content.length == 5) {
                this.isshow = true;
                this.foot = true;
              } else {
                this.ishave = false
                this.userList = []
              }
            } else {
              wx.showToast({
                title: res.statusText,
                icon: 'none',
                duration: 2000
              })
            }
          }).catch(res => {
            console.log(res)
            wx.showToast({
              title: res.response.data.message,
              icon: 'none',
              duration: 2000
            })
          })
        }

      },
      toPermission() {
        wx.navigateTo({
          url: "../../pages/permission/main",
          fail: function (res) {
            console.log(res)
          }
        })
      }
    },
    computed: {
      showList() {
        console.log(this.userList)
        return this.userList.length
      }
    },
    onShow() {
      this.page = 0
      let params = {
        page: this.page,
        size: 5,
        sort: "id,desc"
      }
      this.$http.get("/users", params).then(res => {
        if (res.status == "200") {
          if (res.data && res.data.content && res.data.content.length > 0) {
            this.ishave = true
            this.userList = res.data.content;
          }
          if (res.data.content.length > 0 && res.data.content.length < 5) {
            this.isshow = false;
            this.foot = false;
          } else if (res.data.content.length == 5) {
            this.isshow = true;
            this.foot = true;
          } else {
            this.ishave = false
            this.userList = []
          }
        } else {
          wx.showToast({
            title: res.statusText,
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(res => {
        console.log(res)
        wx.showToast({
          title: res.response.data.message,
          icon: 'none',
          duration: 2000
        })
      })
      this.$http.get("/users/roles").then((res) => {

        this.roleList = res.data;
        for (var i = 0; i < res.data.length; i++) {
          this.accounts.push(res.data[i].name)
        }


      }).catch(res => {
        console.log(res)
        wx.showToast({
          title: res.response.data.message,
          icon: 'none',
          duration: 2000
        })
      })
    }
  };
</script>
<style scoped>
  .top {
    width: 100%;
    display: flex;
    background: #2E79FF;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99999;
  }

  .spanFirst {
    display: inline-block;
    width: 30%;
    line-height: 30px;
    vertical-align: top;
  }

  .spanLast {
    display: inline-block;
    width: 70%;
    line-height: 30px;
  }

  .top div {
    width: 50%;
    text-align: center;
    height: 40px;
    color: #fff;
    font-size: 14px;
    line-height: 40px;
  }

  .content {
    background: #e4e4e4;
    padding-top: 1px;
    width: 100%;
    overflow-x: hidden;
  }

  .contentList {
    margin-top: 10px;
    width: 100%;
    background: #fff;
    padding: 20px 0;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
  }

  .contentList button {
    border: 1px solid #33CCCC;
    background: none;
    font-size: 14px;
    color: #33CCCC;
  }

  .contentList button.not {
    border: 1px solid #FF6633;
    color: #FF6633;
  }

  .searchBox {
    width: 100%;
    height: 50px;
    padding: 12px;
    box-sizing: border-box;
    background: #fff;
    margin-top: 40px;
  }

  .weui-search-bar {
    width: 100%;
    height: 27.5px;
    padding: 0px;
    position: static;
    float: left;
    border-radius: 27.5px;
  }

  .weui-search-bar__box {
    width: 100%;
    height: 27.5px;
    border-radius: 13.75px;
    background: #efeff4;
  }

  .weui-icon-search {
    left: 16.5px;
  }

  .weui-search-bar__input {
    padding: 2.25px 9px !important;
  }

  .search-box-cancel {
    font-size: 28rpx;
    color: #2E79FF;
    float: left;
    position: absolute;
    right: 20rpx;
    top: 0;
    line-height: 27.5px;

  }

  .footer {
    width: 375px;
    height: 50px;
    color: #898989;
    background: #efeff4;
    font-size: 13px;
    text-align: center;
  }

  .footer p {
    padding: 11px 0 0 0;
  }

  .img3 {
    width: 200px;
    height: 200px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px
  }

</style>
