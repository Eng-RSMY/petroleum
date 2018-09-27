<template>
	<div style="height:100%;background-color: #fff">
		<transition name="fade" mode="out-in" style="height:100%">

      <swiper class="mb1" circular="true" autoplay="true" indicator-dots="true" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#000000">
        <block v-for="(item,index) in imgUrls" :index="index" :key="key">
          <swiper-item @click="toDetail(item.id)">
            <image :src="item.url" class="slide-image" width="100%" height="150"/>
          </swiper-item>
        </block>
      </swiper>

      <div class="page mb1">
        <div class="page__bd">
          <div class="weui-grids">
            <div v-for="item in oilPriceGrids" :key="index">
              <div class="weui-grid oil_grid">
                <image class="oil_img" src="/static/images/car.png" />
                <div class="oil_label">{{item.oilPrice}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button @click="toLogin" class="login_btn mb1" size="default">进入我的工作台</button>

      <news :fromIndex="true"></news>

		</transition>
	</div>
</template>

<script>
	import cookies from 'weapp-cookie'
  import news from '../news/index.vue'
	export default {
		data() {
			return {
        imgUrls: [
          {
            id:'1',
            url:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
          },
          {
            id:'1',
            url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
          },
          {
            id:'1',
            url:'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
          }
        ],
        oilPriceGrids:[]
      };
		},
    components:{news},
		methods: {
      async toLogin(){
        const access_token = wx.getStorageSync('access_token');
        const token_type = wx.getStorageSync('token_type');
        const refresh_token = wx.getStorageSync('refresh_token');
        if(refresh_token){
          let params={
            grant_type:'refresh_token',
            refresh_token:refresh_token
          }
          try {
            let result = await this.$http.post("/oauth/token", params)
            if(result.data&&result.data.access_token&&result.data.refresh_token){
              wx.setStorageSync('access_token',result.data.access_token)
              wx.setStorageSync('refresh_token',result.data.refresh_token)
              wx.setStorageSync('token_type', result.data.token_type)
              wx.switchTab({
                url: "../../pages/workbench/main",
                fail: function (result) {
                  console.log(result)
                }
              })
            }else {
              wx.navigateTo({
                url: "../login/main",
                fail: function (res) {
                  console.log(res)
                }
              })
            }
          }catch (e){
            wx.navigateTo({
              url: "../login/main",
              fail: function (res) {
                console.log(res)
              }
            })
          }
        }else{
        wx.navigateTo({
          url: "../login/main",
          fail: function (res) {
            console.log(res)
          }
        })
        }
      },
      toDetail(id){
        wx.navigateTo({
          url: `../newsDetail/main?id=${id}`,
          fail: function (res) {
            console.log(res)
          }
        })
      }
		},

		mounted() {
		}
	}
</script>

<style scoped>
	.container {
		height: 100%;
		padding-top: 20px;
		background-color: #fff;
	}

	.title,
	.title1 {
		width: 100%;
		box-sizing: border-box;
		text-align: left;
		padding-left: 30px;
		color: #000;
		height: 75px;
		line-height: 75px;
		font-size: 36px;
		margin-bottom: 20px;
	}

	.title1 {
		font-size: 24px;
	}

	.subtitle,
	.subtitle1 {
		width: 100%;
		box-sizing: border-box;
		text-align: left;
		color: #565656;
		font-size: 16px;
		margin-bottom: 10px
	}

	.pic {
		display: inline-block;
		/* height: 45px; */
		line-height: 45px;
		width: 100%;
		background-color: #fff;
		padding-left: 16px;
		box-sizing: border-box;
		color: #565656;
		border: 1px solid #4a4a4a;
	}

	.subtitle1 {
		padding-left: 30px;
	}

	.login-form {
		width: 84%;
		margin: 0 auto
	}

	.input-frame {
		border: 1px solid #4a4a4a;
		margin-bottom: 25px;
	}

	.checkbox {
		font-size: 14px;
		color: #2E79FF;
		margin: 15px 0px 30px 0px;
	}

	.prefix {
		display: inline-block;
		color: #4a4a4a;
		height: 45px;
		line-height: 45px;
		width: 20%;
		border-right: 1px solid #4a4a4a;
		text-align: center;
		box-sizing: border-box;
		vertical-align: middle
	}

	.input1 {
		display: inline-block;
		height: 45px;
		line-height: 45px;
		width: 76%;
		background-color: #fff;
		padding-left: 16px;
		box-sizing: border-box;
		color: #565656;
		vertical-align: middle
	}

	.input-title {
		text-align: center;
		font-size: 12px;
		color: #4a4a4a;
		margin-top: 130px;
		margin-bottom: 15px;

	}

	.pevStep {
		text-align: center;
		font-size: 14px;
		color: #4a4a4a;
		margin-top: 30px;
	}

	.picker {
		display: inline-block;
		/* height: 45px; */
		line-height: 45px;
		width: 100%;
		background-color: #fff;
		padding-left: 16px;
		box-sizing: border-box;
		color: #565656;
		border: 1px solid #4a4a4a;
	}

	.input-code {
		position: absolute;
		left: 0px;
		top: 0px;
		width: 0;
		height: 0;
		opacity: 0;
		overflow: visible;
		z-index: -1;
	}

	.index-nav-bar {
		display: none;
	}

	.time {
		width: 84%;
		font-size: 14px;
		color: #898989;
		text-align: left;
	}

	.color {
		color: #2E79FF;
	}

	.sure {
		width: 84%;
		margin-top: 100px;
		height: 40px;
		line-height: 40px;
		background-color: #2E79FF;
		color: #fff;
		border: none;
	}

  .login_btn {
    color: #ffffff;
    background-color: #2E79FF;
    margin-bottom: 10rpx;
    margin-top: 10rpx;
  }

  .oil_label {
    font-size: 30rpx;
  }

  .oil_img {
    height: 80rpx;
    width: 80rpx;
  }

  .oil_grid {
    text-align: center;
  }

  .mb1 {
    margin-bottom: 10rpx;
  }

	page .code .input-content-wrap .input-code-wrap {
		display: flex;
		align-items: center;
		justify-content: center1;
		height: 150rpx;
	}

	page .code .input-content-wrap .input-code-wrap .code_dot {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #000;
		background-color: #fff;
		box-sizing: border-box;
		width: 124rpx;
		height: 150rpx;
		border: #dfdfdf solid 1rpx;
		border-left: none 0;
		font-size: 60rpx;
	}

	page .code .input-content-wrap .input-code-wrap .code_dot:nth-child(1) {
		border-left: 2rpx solid #ddd;
	}

	page .code .input-content-wrap .input-code-wrap .code_dot i {
		/* background: #000; */
		border-radius: 50%;
		width: 20rpx;
		height: 20rpx;
		display: flex;
		align-items: center;
	}

	page .code .input-content {
		position: absolute;
		opacity: 0;
		left: -100%;
		top: 600rpx;
		background: #f56;
		z-index: -999;
		text-align: center;
	}

	page .code .input-content.active {
		z-index: -99;
	}

	.input {
		height: 40px;
		width: 40px;
		flex: 1;
		background-color: #fff;
		color: #262626;
		font-size: 48rpx;
		margin: 0 10rpx 0 10rpx;
		border: 1rpx #4287ff solid;
		position: relative;
		box-sizing: border-box
	}

	.input_none {
		height: 40px;
		width: 40px;
		flex: 1;
		background-color: #fff;
		color: #262626;
		font-size: 48rpx;
		margin: 0 10rpx 0 10rpx;
		border: 1rpx #dfdfdf solid;
		position: relative;
		box-sizing: border-box
	}

	.input text {
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.input_none text {
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.img {
		width: 16px;
		height: 16px;
		display: inline-block;
		margin-right: 5px;
		vertical-align: middle
	}

	.span {
		display: inline-block;
		height: 100%;
		line-height: 16px;
	}
</style>
