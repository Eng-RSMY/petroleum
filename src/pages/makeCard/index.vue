<template>
	<div class="container">
		<div v-if="ishave" style="width:100%;">
			<div class="orderInfo">
				<p>
					<span>订单号：</span>
					<span>{{orderInfo.number}}</span>
				</p>
				<p>
					<span>订购货物:</span>
					<span>{{orderInfo.categoryName}} {{orderInfo.oilName}}</span>
				</p>
				<p>
					<span>订购量：</span>
					<span>{{orderInfo.orderWeight}}</span>
				</p>
				<p>
					<span>下单价格：</span>
					<span>{{orderInfo.orderPrice}}</span>
				</p>
				<p>
					<span>货车司机：</span>
					<span>{{orderInfo.driverName}}</span>
				</p>
				<p>
					<span>车牌号：</span>
					<span>{{orderInfo.carNumber}}</span>
				</p>
				<p>
					<span>司机手机号:</span>
					<span>{{orderInfo.driverPhone}}</span>
				</p>
				<p>
					<span>司机身份证号：</span>
					<span>{{orderInfo.driverIdNumber}}</span>
				</p>
				<p>
					<span>押运员：</span>
					<span>{{orderInfo.escortName == null ? "未选择押运员" : orderInfo.escortName }}</span>
				</p>
				<p>
					<span>押运员手机号：</span>
					<span>{{orderInfo.escortPhone == null ? "未选择押运员" : orderInfo.escortPhone }}</span>
				</p>
				<p>
					<span>下单时间：</span>
					<span>{{orderInfo.orderedTime}}</span>
				</p>
				<p>
					<span>操作人：</span>
					<span>{{orderInfo.operatorName == null ? "暂无数据" : orderInfo.operatorName}}</span>
				</p>
				<p>
					<span>操作帐号</span>
					<span>{{orderInfo.operatorUsername == null ? "暂无数据" : orderInfo.operatorUsername}}</span>
				</p>
				<p>
					<span>操作人手机号：</span>
					<span>{{orderInfo.operatorPhone == null ? "暂无数据" : orderInfo.operatorPhone}}</span>
				</p>
			</div>
			<div class="weui-cell" style="border-top: none">
				<div class="weui-cell__bd">
					<p>订购状态</p>
				</div>
				<div class="weui-cell__ft">
					<p style="color: #2E79FF;">{{orderInfo.statusName}}</p>
				</div>
			</div>
			<div class="weui-cell" style="border-top: none">
				<div class="weui-cell__bd">
					<p>订购金额</p>

				</div>
				<div class="weui-cell__ft">
					<p style="color: #FF001F;font-size: 17px">¥ {{orderInfo.orderTotalPrice}}</p>
				</div>
			</div>
			<div class="two-bar-codes" @click="showImg">
				<!-- <div class="two-bar-codes"> -->
				<p>二维码</p>

				<qrcode :value="orderInfo.encryptOrderNumber" :options="{ size: 200 }"></qrcode>

			</div>
			<div class="mask" v-if="isShowImg" @click="hideImg">
				
			</div>
		</div>
		<div v-else>
			<img src="/static/images/none.png" alt="" class="img3">
		</div>

	</div>


</template>

<script>
	export default {
		data() {
			return {
				orderInfo: "",
				ishave: false,
				isShowImg: false
			}
		},
		methods: {
			test(url, id) {
				console.log(url, id)
			},
			showImg(e) {
				var qrcode = e.currentTarget.dataset.qrcode
				this.isShowImg = true
			},
			hideImg() {
				this.isShowImg = false
			}
		},

		mounted() {
			this.$http.get("/card")
				.then(res => {
					console.log(res)
					if (res.status == "200") {
						this.orderInfo = res.data
						this.ishave = true
						// this.qrcode(res.data.encryptOrderNumber)


					} else {
						wx.showToast({
							title: res.statusText,
							icon: 'none',
							duration: 2000
						})
					}
				})
				.catch(res => {
					wx.showToast({
						title: res.response.data.message,
						icon: 'none',
						duration: 2000
					})
				})
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		padding: 0px;
		background-color: #efeff4;
		overflow-x: hidden;
	}

	.weui-cell__bd {
		padding-left: 5%;
		color: #000;
	}

	.weui-cell {
		background-color: #fff;
		width: 100%;
		margin-top: 10px;
		font-size: 14px;
		padding: 20px 0px;
	}

	.weui-cell__ft {
		padding-right: 20px
	}

	.orderInfo {
		width: 100%;
		background-color: #fff;
		color: #898989;
	}

	.orderInfo p {
		width: 100%;
		font-size: 14px;
		line-height: 30px;
	}

	.orderInfo p span:first-child {
		display: inline-block;
		width: 35%;
		padding-left: 20px;
		vertical-align: top;
		box-sizing: border-box
	}

	.orderInfo p span:last-child {
		display: inline-block;
		width: 65%;
		padding-right: 20px;
		box-sizing: border-box
	}

	.two-bar-codes {
		width: 100%;
		margin-top: 10px;
		background-color: #fff;
		padding-bottom: 40px
	}

	.two-bar-codes p {
		width: 100%;
		text-align: left !important;
		padding-left: 5%;
		font-size: 14px;
		color: #000;
		height: 50px;
		line-height: 50px;
	}

	.two-bar-codes .img {
		margin: 20px auto;
	}

	/* .img3 {
		width: 200px;
		height: 200px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -100px;
		margin-top: -100px
	} */

	/* .mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0px;
		top: 0px;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 99;
	} */

	/* .img1 {
		width: 250px;
		height: 250px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -125px;
		margin-top: -125px;
	} */
</style>