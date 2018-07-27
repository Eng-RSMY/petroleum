<template>
	<div class="container">
		<!-- This is a workbence -->
		<!-- 顶部公司信息 -->
		<div class="top">
			<p>山东xxxxx化学品运输公司</p>
			<div class="weui-flex top_maddle">
				<div class="weui-flex__item">
					<div class="placeholder">52134</div>
					<div class="placeholder1">账户余额</div>
				</div>
				<div class="weui-flex__item">
					<div class="placeholder">46789</div>
					<div class="placeholder1">已下单</div>

				</div>
				<div class="weui-flex__item">
					<div class="placeholder">4561</div>
					<div class="placeholder1">可用金额</div>

				</div>
			</div>
		</div>
		<!-- 常用功能 -->
		<div class="weui-cell">
			<div class="weui-cell__bd">
				<p style="font-size: 14px;font-weight: bold">常用功能</p>
			</div>
		</div>
		<div class="weui-flex top_maddle" style="background-color: #fff;padding-bottom: 20px">
			<div class="weui-flex__item" @click="toSelfHelp()">
				<div class="placeholder">
					<img src="/static/images/selfHelp.png" alt="" class="img">
				</div>
				<div class="placeholder1">自助下单</div>
			</div>
			<div class="weui-flex__item" @click="toBill()">
				<div class="placeholder">
					<img src="/static/images/zdcx.png" alt="" class="img">
				</div>
				<div class="placeholder1">账单查询</div>
			</div>
			<div class="weui-flex__item" @click="toTrackeOrder()">
				<div class="placeholder">
					<img src="/static/images/trackeOrder.png" alt="" class="img">
				</div>
				<div class="placeholder1">订单跟踪</div>
			</div>
		</div>
		<!-- 全部功能 -->
		<div class="weui-cell" style="margin-top: 10px;">
			<div class="weui-cell__bd">
				<p style="font-size: 14px;font-weight: bold">全部功能</p>
			</div>
		</div>
		<div class="weui-flex top_maddle" style="background-color: #fff;padding-bottom: 20px">
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/yhgl.png" alt="" class="img">
				</div>
				<div class="placeholder1">用户管理</div>
			</div>
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/xjzh.png" alt="" class="img">
				</div>
				<div class="placeholder1">新建用户</div>
			</div>
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/jgcx.png" alt="" class="img">
				</div>
				<div class="placeholder1">价格查询</div>

			</div>

		</div>
		<div class="weui-flex top_maddle" style="background-color: #fff;padding-bottom: 20px">
			<div class="weui-flex__item" @click="toMakeCard">
				<div class="placeholder">
					<img src="/static/images/rczk.png"  alt="" class="img">
				</div>
				<div class="placeholder1">入场制卡</div>
			</div>
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/hkcx.png" alt="" class="img">
				</div>
				<div class="placeholder1">汇款查询</div>
			</div>
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/zhcz.png"
					 alt="" class="img">
				</div>
				<div class="placeholder1">账户充值</div>
			</div>
		</div>
		<div class="weui-flex top_maddle" style="background-color: #fff;padding-bottom: 20px">
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/zlwh.png" alt="" class="img">
				</div>
				<div class="placeholder1">资料维护</div>
			</div>
			<div class="weui-flex__item" @click="toTicket()">
				<div class="placeholder">
					<img src="/static/images/kpxx.png"  alt="" class="img">
				</div>
				<div class="placeholder1">开票信息</div>
			</div>
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/kf.png" alt="" class="img">
				</div>
				<div class="placeholder1">客服电话</div>
			</div>
		</div>
		<div class="weui-flex top_maddle" style="background-color: #fff;padding-bottom: 20px">
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/yjcl.png" alt="" class="img">
				</div>
				<div class="placeholder1">预警管理</div>

			</div>
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/car.png"  alt="" class="img">
				</div>
				<div class="placeholder1">车辆管理</div>
			</div>
			<div class="weui-flex__item">
				<div class="placeholder">
					<img src="/static/images/xtgg.png" alt="" class="img">
				</div>
				<div class="placeholder1">系统公告</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		components: {
		},

		methods: {
			toSelfHelp: function () {
				wx.navigateTo({
					url: "../../pages/selfHelp/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toMakeCard: function () {
				wx.navigateTo({
					url: "../../pages/makeCard/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toTrackeOrder: function () {
				wx.navigateTo({
					url: "../../pages/trackeOrder/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toBill:function(){
				wx.navigateTo({
					url: "../../pages/bill/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toTicket:function(){
				wx.navigateTo({
					url: "../../pages/ticket/main",
					fail: function (res) {
						console.log(res)
					}
				})
			}
		},

		created() { }
	}
</script>

<style scoped>
	.container {
		width: 100%;
		overflow-x: hidden;
		padding: 0px;
		background-color: #efeff4;
	}

	.weui-cell__bd {
		margin-left: 10px;
	}

	.weui-cell {
		background-color: #fff;
	}

	.top {
		background-color: #2E79FF;
		height: 150px;
		color: #fff;
		width: 100%;
	}

	.top p {
		text-align: center;
		font-size: 20px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.weui-flex__item {
		text-align: center;
		font-size: 22px;
	}

	.placeholder1 {
		font-size: 14px;
		margin-top: 10px;
	}

	.weui-cell {
		width: 100%;
		height: 30px;
	}

	.img {
		width: 50px;
		height: 50px;
		margin-top: 20px;
	}

	.top_maddle {
		width: 100%;
	}
</style>