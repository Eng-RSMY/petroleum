<template>
	<div class="container">
		<div class="orderInfo">
			<p class="title">订单详情</p>
			<p>
				<span>订单号：</span>
				<span>{{orderInfo.number == null ? "暂无数据" : orderInfo.number}}</span>
			</p>
			<p>
				<span>订购货物:</span>
				<span>
					{{orderInfo.categoryName}} 
					{{orderInfo.oilName}}
				</span>
			</p>
			<p>
				<span>订购量：</span>
				<span>{{orderInfo.orderWeight == null ? "暂无数据" : orderInfo.orderWeight}}</span>
			</p>
			<p>
				<span>下单价格：</span>
				<span>{{orderInfo.orderPrice}}</span>
			</p>
			<p>
				<span>货车司机：</span>
				<span>{{orderInfo.driverName == null ? "暂无数据" : orderInfo.driverName}}</span>
			</p>
			<p>
				<span>车牌号：</span>
				<span>{{orderInfo.carNumber == null ? "暂无数据" : orderInfo.carNumber}}</span>
			</p>
			<p>
				<span>司机手机号:</span>
				<span>{{orderInfo.driverPhone == null ? "暂无数据" : orderInfo.driverPhone}}</span>
			</p>
			<p>
				<span>司机身份证号：</span>
				<span>{{orderInfo.driverIdNumber  == null ? "暂无数据" : orderInfo.driverIdNumber}}</span>
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
				<span>{{orderInfo.orderedTime == null ? "暂无数据" : orderInfo.orderedTime}}</span>
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
		<div class="weui-cell" style="border-top: none;padding: 20px 0px;">
			<div class="weui-cell__bd">
				<p>订购状态</p>
			</div>
			<div class="weui-cell__ft">
				<p style="color: #2E79FF;">{{orderInfo.statusName}}</p>
			</div>
		</div>
		<div class="weui-cell" style="border-top: none;padding: 20px 0px;">
			<div class="weui-cell__bd">
				<p>订购金额</p>
			</div>
			<div class="weui-cell__ft">
				<p style="color: #FF001F;font-size: 17px">¥ {{orderInfo.orderTotalPrice}}</p>
			</div>
		</div>
		<div class="two-bar-codes">
			<p>二维码</p>
			<canvas class="img" style="width: 200px; height: 200px;" canvas-id="myQrcode"></canvas>
			<!-- <div class="img">
					<img src="https://qr.api.cli.im/qr?data=www.baidu.com&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=f33aa9d4852b6c3e3439d4e50f311c26" alt="">
			</div> -->
		</div>
	</div>
</template>

<script>
	import drawQrcode from 'weapp-qrcode'
	export default {
		data() {
			return {
				orderInfo: "",
				from:"",
			}
		},

		components: {
		},

		methods: {
			


		},

		onUnload(){
			console.log("页面已卸载")
			if(this.from == "selfHelp"){
				wx.switchTab({
					url:"/pages/workbench/main"
				})
			}
			
		},
		mounted() {
			var orderId = this.$root.$mp.query.orderInfo;
			var from=this.$root.$mp.query.from;
			if(from){
				this.from=from;
			}
			this.$http.get(`/orders/${orderId}`)
				.then(res => {
					console.log(res)
					if (res.status == "200") {
						this.orderInfo = res.data
						// this.qrcode(res.data.encryptOrderNumber)
						drawQrcode({
							width: 200,
							height: 200,
							canvasId: 'myQrcode',
							text: res.data.encryptOrderNumber
						})
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
			// 获取物料列表
		},
	}
</script>

<style scoped>
	.container {
		width: 100%;
		padding: 0px;
		background-color: #efeff4;
		overflow-x: hidden;
	}
	.title {
		width: 100%;
		background-color: #fff;
		color: #000;
		font-size: 14px;
		border-bottom: 1px solid #ddd;
		height: 50px;
		line-height: 50px;
		padding-left: 5%;
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
		height: 40px;
		font-size: 14px;
		line-height: 40px;
	}

	.orderInfo p span:first-child {
		display: inline-block;
		width: 30%;
		padding-left: 40px;
	}

	.two-bar-codes {
		width: 100%;
		margin-top: 10px;
		background-color: #fff;
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
		width: 200px;
		height: 200px;
		margin: 20px auto
	}

	.two-bar-codes .img img {
		width: 100%;
		height: 100%;
	}
</style>