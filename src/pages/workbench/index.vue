<template>
	<div class="container">
		<!-- This is a workbence -->
		<!-- 顶部公司信息 -->
		<div class="top">
			<p >{{companyInfo.name}}</p>
			<!-- <p >中国石油化工股份有限公司山东石油分公司</p> -->
			<div class="weui-flex top_maddle marginTop" >
				<div class="weui-flex__item">
					<div class="placeholder fontWight">{{companyInfo.balance ? companyInfo.balance:"无"}}</div>
					<div class="placeholder2">账户余额</div>
				</div>
				<div class="weui-flex__item">
					<div class="placeholder fontWight">{{companyInfo.orderedMoney ? companyInfo.orderedMoney : "无"}}</div>
					<div class="placeholder2">已下单</div>
				</div>
				<div class="weui-flex__item">
					<div class="placeholder fontWight">{{companyInfo.availableBalance ? companyInfo.availableBalance : "无"}}</div>
					<div class="placeholder2">可用金额</div>
				</div>
			</div>
		</div>
		<!-- 常用功能 -->
		<div v-if="isdisplay">
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<p style="font-size: 18px;font-weight: bold;">常用功能</p>
				</div>
			</div>
			<div class="weui-flex top_maddle" style="background-color: #fff;padding-bottom: 20px;margin-top:-15px;">
				<div class="weui-flex__item" @click="toSelfHelp()" v-if="roleList.selfOrder">
					<div class="placeholder">
						<img src="/static/images/selfHelp.png" alt="" class="img">
					</div>
					<div class="placeholder1">自助下单</div>
				</div>
				<div class="weui-flex__item" @click="toBill()" v-if="roleList.billInquiry">
					<div class="placeholder">
						<img src="/static/images/zdcx.png" alt="" class="img">
					</div>
					<div class="placeholder1">账单查询</div>
				</div>
				<div class="weui-flex__item" @click="toTrackeOrder()" v-if="roleList.orderTracking">
					<div class="placeholder">
						<img src="/static/images/trackeOrder.png" alt="" class="img">
					</div>
					<div class="placeholder1">订单跟踪</div>
				</div>
			</div>
		</div>
		<!-- 全部功能 -->
		<div class="weui-cell" style="margin-top: 10px;display:block;">
			<div class="weui-cell__bd">
				<p style="font-size: 18px;font-weight: bold">全部功能</p>
			</div>
		</div>
		<div class="weui-flex top_maddle" style="background-color: #fff;padding-bottom: 20px;margin-top:-15px;">
			<div class="weui-flex__item" @click="toUserManagement" v-if="roleList.userManagement">
				<div class="placeholder">
					<img src="/static/images/yhgl.png" alt="" class="img">
				</div>
				<div class="placeholder1">用户管理</div>
			</div>
			<div class="weui-flex__item" @click="toNewEnterpriseUser" v-if="roleList.newUser">
				<div class="placeholder">
					<img src="/static/images/xjzh.png" alt="" class="img">
				</div>
				<div class="placeholder1">新建用户</div>
			</div>
			<div class="weui-flex__item" @click="toCheckPrice()" v-if="roleList.checkPrice">
				<div class="placeholder">
					<img src="/static/images/jgcx.png" alt="" class="img">
				</div>
				<div class="placeholder1">价格查询</div>
			</div>
			<div class="weui-flex__item" @click="toMakeCard" v-if="roleList.admissionCard">
				<div class="placeholder">
					<img src="/static/images/rczk.png" alt="" class="img">
				</div>
				<div class="placeholder1">入场制卡</div>
			</div>
			<div class="weui-flex__item" @click="toMoneyInQuiry" v-if="roleList.remittanceInformationInquiry">
				<div class="placeholder">
					<img src="/static/images/hkcx.png" alt="" class="img">
				</div>
				<div class="placeholder1">汇款查询</div>
			</div>
			<div class="weui-flex__item" @click="toDataMaintenance" v-if="roleList.dataMaintenance">
				<div class="placeholder">
					<img src="/static/images/zlwh.png" alt="" class="img">
				</div>
				<div class="placeholder1">资料维护</div>
			</div>
			<div class="weui-flex__item" @click="toTicket()" v-if="roleList.billingInformation">
				<div class="placeholder">
					<img src="/static/images/kpxx.png" alt="" class="img">
				</div>
				<div class="placeholder1">开票信息</div>
			</div>
			<div class="weui-flex__item" @click="toKF()" v-if="roleList.consumerHotline">
				<div class="placeholder">
					<img src="/static/images/kf.png" alt="" class="img">
				</div>
				<div class="placeholder1">客服电话</div>
			</div>
			<div class="weui-flex__item" @click="toWarning" v-if="roleList.earlyWarning">
				<div class="placeholder">
					<img src="/static/images/yjcl.png" alt="" class="img">
				</div>
				<div class="placeholder1">预警管理</div>

			</div>
			<div class="weui-flex__item" @click="toCar" v-if="roleList.vehicleManagement">
				<div class="placeholder">
					<img src="/static/images/car.png" alt="" class="img">
				</div>
				<div class="placeholder1">车辆管理</div>
			</div>
			<div class="weui-flex__item" @click="toNews()">
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
				companyInfo: "",
				roleList: {
					selfOrder: false,//自助下单
					billInquiry: false,//账单查询
					orderTracking: false,//订单跟踪
					userManagement: false,//用户管理
					newUser: false,//新建用户
					checkPrice: false,//价格查询
					admissionCard: false,//入场制卡
					remittanceInformationInquiry: false,//汇款信息查询
					dataMaintenance: false,//资料维护
					billingInformation: false,//开票信息
					consumerHotline: false,//客服电话
					vehicleManagement: false,//车辆管理
					earlyWarning: false,
				},
				isdisplay: false
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
			toDataMaintenance() {
				wx.navigateTo({
					url: "../../pages/dataMaintenance/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toMoneyInquiry: function () {
				wx.navigateTo({
					url: "../../pages/moneyInquiry/main",
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
			toNewEnterpriseUser: function () {
				wx.navigateTo({
					url: "../../pages/NewEnterpriseUser/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toUserManagement: function () {
				wx.navigateTo({
					url: "../../pages/userManagement/main",
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
			toCheckPrice: function () {
				wx.navigateTo({
					url: "../../pages/checkPrice/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toMoneyInQuiry: function () {
				wx.navigateTo({
					url: "../../pages/moneyInquiry/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toBill: function () {
				wx.navigateTo({
					url: "../../pages/bill/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toWarning: function () {
				wx.navigateTo({
					url: "../../pages/warning/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toTicket: function () {
				wx.navigateTo({
					url: "../../pages/ticket/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toNews: function () {
				wx.navigateTo({
					url: "../../pages/news/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			toKF: function () {
				wx.navigateTo({
					url: "../../pages/customerService/main",
				})
			},
			toCar: function () {
				wx.navigateTo({
					url: "../../pages/selectCar/main?from=workbench",
					fail: function (res) {
						console.log(res)
					}
				})
			}
		},

		mounted() {
			// 公司信息
			wx.showLoading({
				title: "加载中...",
				mask: true
			})
			this.$http.get("/workbench/company_account")
				.then(res => {
					console.log(res)
					if (res.status == "200") {
						this.companyInfo = res.data;
					} else {
						wx.showToast({
							title: res.statusText,
							icon: 'none',
							duration: 2000
						})
					}

				}).catch(res => {
					wx.showToast({
						title: res.response.data.message,
						icon: 'none',
						duration: 2000
					})
				})
			var that = this;
			// 获取当前用户的登录信息
			this.$http.get("/mine").then(res => {
				console.log(res.data.role.permissions)
				// that.$http.get("")
				for (var i = 0; i < res.data.role.permissions.length; i++) {
					console.log(res.data.role.permissions[i].name == "入场制卡")
					if (res.data.role.permissions[i].name == "自助下单") {
						this.roleList.selfOrder = true;
					}
					if (res.data.role.permissions[i].name == "账单查询") {
						this.roleList.billInquiry = true;
					}
					if (res.data.role.permissions[i].name == "订单跟踪") {
						this.roleList.orderTracking = true;
					}
					if (res.data.role.permissions[i].name == "用户管理") {
						this.roleList.userManagement = true;
					}
					if (res.data.role.permissions[i].name == "新建用户") {
						this.roleList.newUser = true;
					}
					if (res.data.role.permissions[i].name == "价格查询") {
						this.roleList.checkPrice = true;
					}
					if (res.data.role.permissions[i].name == "入场制卡") {
						this.roleList.admissionCard = true;
					}
					if (res.data.role.permissions[i].name == "汇款信息查询") {
						this.roleList.remittanceInformationInquiry = true;
					}
					if (res.data.role.permissions[i].name == "资料维护") {
						this.roleList.dataMaintenance = true;
					}
					if (res.data.role.permissions[i].name == "开票信息") {
						this.roleList.billingInformation = true;
					}
					if (res.data.role.permissions[i].name == "客服电话") {
						this.roleList.consumerHotline = true;
					}
					if (res.data.role.permissions[i].name == "车辆管理") {
						this.roleList.vehicleManagement = true;
					}
					if (res.data.role.permissions[i].name == "预警管理") {
						this.roleList.earlyWarning = true;
					}

				}
				if (res.data.role.permissions.length > 3) {
					console.log(1111111)
					this.isdisplay = true
				}
			}).catch(res => {
				wx.showToast({
					title: res.response.data.message,
					icon: 'none',
					duration: 2000
				})
			})
			// 根据用户获取权限
			setTimeout(function () {
				wx.hideLoading()
			}, 2000)
		},
	}
</script>

<style scoped>
	.container {
		width: 100%;
		overflow-x: hidden;
		padding: 0px;
		background-color: #efeff4;
		display: inherit;
	}
	.marginTop{
		margin-top: 40px;
	}
	.weui-cell__bd {
		margin-left: 10px;
	}

	.weui-flex__item {
		width: 33%;
		display: inline-block;
	}

	.weui-cell {
		background-color: #fff;
	}

	.top {
		background-color: #2E79FF;
		color: #fff;
		width: 100%;
		padding-bottom: 10px
	}

	.top p {
		text-align: center;
		width:90%;
		margin-left: 5%;
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.weui-flex__item {
		text-align: center;
		font-size: 22px;
	}

	.placeholder1 {
		font-size: 14px;
	}

	.placeholder2 {
		font-size: 14px;
	}
	.fontWight{
		font-weight: bold
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