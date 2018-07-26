<template>
		<div class="container">
			<div class="orderInfo">
				<p>
					<span>订单号：</span>
					<span>{{orderInfo[0].orderCode}}</span>
				</p>
				<p>
					<span>订购货物:</span>
					<span>{{orderInfo[0].orderProduct}}</span>
				</p>
				<p>
					<span>订购量：</span>
					<span>{{orderInfo[0].orderProductNum}}</span>
				</p>
				<p>
					<span>货车司机：</span>
					<span>{{orderInfo[0].orderDriverName}}</span>
				</p>
				<p>
					<span>车牌号：</span>
					<span>{{orderInfo[0].orderCarCode}}</span>
				</p>
				<p>
					<span>下单时间：</span>
					<span>{{orderInfo[0].orderCreatetime}}</span>
				</p>
				<p>
					<span>操作人：</span>
					<span>{{orderInfo[0].caozuoName}}</span>
				</p>
				<p>
					<span>操作账号：：</span>
					<span>{{orderInfo[0].caozuoPhone}}</span>
				</p>
			</div>
			<div class="weui-cell" style="border-top: none">
				<div class="weui-cell__bd">
					<p>订购状态</p>
				</div>
				<div class="weui-cell__ft">
					<p style="color: #2E79FF;">{{orderInfo[0].orderState}}</p>
				</div>
			</div>
			<div class="weui-cell" style="border-top: none">
				<div class="weui-cell__bd">
					<p>订购金额</p>
				</div>
				<div class="weui-cell__ft">
					<p style="color: #FF001F;font-size: 17px">¥ {{orderInfo[0].orderPrice}}</p>
				</div>
			</div>
			<div class="two-bar-codes">
				<p>二维码</p>
				<div class="img">
						<img src="https://qr.api.cli.im/qr?data=www.baidu.com&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=f33aa9d4852b6c3e3439d4e50f311c26" alt="">
				</div>
			</div>
		</div>
	</template>
	
	<script>
		export default {
			data() {
				return {
					orderInfo: [{
						orderCode: "1000201805158866371",
						orderProduct: "92号汽油",
						orderProductNum: "12吨",
						orderDriverName: "张三",
						orderCarCode: "鲁A911XP",
						orderDriverPhone: "XXXXXXXXXXX",
						orderDriverIdCard: "XXXXXXXXXXXXXXXXXX",
						orderPeople: "王发财",
						orderPeoplePhone: "XXXXXXXXXXX",
						orderCreatetime: "2018-05-15  09：34: 00",
						caozuoName: "name（用户名)",
						caozuoPhone: "15066668888",
						orderState: "未入场",
						orderPrice: "48000.00"
					}]
				}
			},
	
			components: {
			},
	
			methods: {
	
			},
	
			created() { }
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
			color:#000;
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
		.two-bar-codes{
			width:100%;
			margin-top: 10px;
			background-color: #fff;
		}
		.two-bar-codes p{
			width: 100%;
			text-align: left !important;
			padding-left: 5%;
			font-size: 14px;
			color: #000;
			height:50px;
			line-height: 50px;
		}
		.two-bar-codes .img{
			width:200px;
			height:200px;
			margin: 20px auto
		}
		.two-bar-codes .img img{
			width:100%;
			height: 100%;
		}
	</style>