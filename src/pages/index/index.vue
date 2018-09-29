<template>
	<div style="height:100%;background-color: #fff">
		<transition name="fade" mode="out-in" style="height:100%">

      <swiper class="mb1 swiper_height" circular="true" autoplay="true" indicator-dots="true" indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#000000">
        <block v-for="(item,index) in banner" :index="index" :key="key">
          <swiper-item @click="toDetail(item.id)">
            <image :src="item.imageUrl" mode="scaleToFill" class="slide-image"/>
          </swiper-item>
        </block>
      </swiper>

      <div class="page mb1">
        <div class="page__bd">
          <div class="weui-grids">
            <div v-for="(item,index) in oilPriceGrids" :key="index">
              <div class="weui-grid oil_grid">
                <image class="oil_img" src="/static/images/oil.png" />
                <div class="oil_label_name">{{item.oilName}}</div>
                <div class="oil_label_price">￥{{item.price}}元/吨</div>
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
        banner: [],
        oilPriceGrids:[]
      };
		},
    components:{news},
		methods: {
      async queryBanner(){
        try{
          let result=await this.$http.get("/public/banner")
          if(result&&result.data){
            this.banner=result.data
          }
        }catch (e){
          wx.showToast({
            title: '新闻获取失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      async queryOilPrice(){
        try{
          let result=await this.$http.get("/public/price")
          if(result&&result.data){
            this.oilPriceGrids=result.data
          }
        }catch (e){
          wx.showToast({
            title: '油价获取失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
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
      this.queryBanner()
      this.queryOilPrice()
		}
	}
</script>

<style scoped>

  .swiper_height{
    height: 400rpx;
  }

  .slide-image{
    width: 100%;
    height: 100%;
  }

  .login_btn {
    color: #ffffff;
    background-color: #2E79FF;
    margin: 10rpx 15rpx;
  }

  .oil_label_price {
    font-size: 30rpx;
  }

  .oil_label_name {
    font-size: 28rpx;
  }

  .oil_img {
    height: 80rpx;
    width: 50rpx;
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
