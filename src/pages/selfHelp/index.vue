<template>
	<div class="container">
		<div class="top">
			<p>公司名称：{{companyInfo.name}}</p>
			<div class="weui-flex top_maddle">
				<div class="weui-flex__item">
					<div class="placeholder">{{companyInfo.balance}}</div>
					<div class="placeholder1">账户余额</div>
				</div>
				<div class="weui-flex__item">
					<div class="placeholder">{{companyInfo.orderedMoney}}</div>
					<div class="placeholder1">已下单</div>

				</div>
				<div class="weui-flex__item">
					<div class="placeholder">{{companyInfo.availableBalance}}</div>
					<div class="placeholder1">可用金额</div>

				</div>
			</div>
		</div>
		<!-- 订购货物信息 -->
		<div class="product">
			<p>
				<span>------</span>
				<span style="margin: 0px 30px;">订购货物信息</span>
				<span>------</span>
			</p>
			<div class="weui-cell" style="border-top: none">
				<div class="weui-cell__bd">
					<p>预提货品类</p>
				</div>
				<div class="weui-cell__ft">
					<picker @change="bindPickerChange" :value="index" :range="categories">
						<view class="picker">
							{{pickSelect}}
						</view>
					</picker>
				</div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<p>物料名称</p>
				</div>
				<div class="weui-cell__ft">
					<picker @change="bindPickerChange1" :value="index" :range="oils">
						<view class="picker">
							{{pickSelect1}}
						</view>
					</picker>
				</div>
			</div>
			<div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
				<div class="weui-cell__bd">
					<p>物料名称</p>
				</div>
				<div class="weui-cell__ft">
					<span class="dw" style="color: #000">(吨)</span>
					<input class="input" style="color: #000" type="number" @change="input" pattern="[0-9]*" v-model.lazy="num" placeholder="请输入">
				</div>
			</div>
		</div>
		<div class="choose">
			<p>
				<span>选择司机</span>
			</p>
			<button class="weui-btn weui-btn_default" v-if="showDriver" @click="chooseDriver" style="background-color: #fff;border-color: #dedede">选择司机</button>
			<div class="driver" v-else>
				<p class="close" @click="reset">x</p>
				<p class="driver_name driverInfo">
					<span>司机真实姓名：</span>
					<span>{{driverInfo.realName == "null" ? "暂无数据" : driverInfo.realName }}</span>
				</p>
				<p class="driver_phone driverInfo">
					<span>绑定手机号：</span>
					<span>{{driverInfo.phone == "null" ? "暂无数据" : driverInfo.phone}}</span>
				</p>
				<p class="driver_name driverInfo">
					<span>身份证号：</span>
					<span>{{driverInfo.idNumber == 'null' ? "暂无数据" : driverInfo.idNumber}}</span>
				</p>
				<p class="driver_name driverInfo">
					<span>驾证号码：</span>
					<span>{{driverInfo.driverNumber == "null" ? "暂无数据" : driverInfo.driverNumber}}</span>
				</p>
			</div>
		</div>
		<div class="choose">
			<p>
				<span>选择车辆</span>
			</p>
			<button class="weui-btn weui-btn_default" v-if="showCar" @click="chooseCar" style="background-color: #fff;border-color: #dedede">选择车辆</button>
			<div class="driver" v-else>
				<p class="close" @click="reset1">x</p>
				<p class="driver_name driverInfo">
					<span>车辆名：</span>
					<span>{{carInfo.remark == "null" ? "暂无数据" : carInfo.remark}}</span>
				</p>
				<p class="driver_phone driverInfo">
					<span>车牌号：</span>
					<span>{{carInfo.carNumber == "null" ? "暂无数据" : carInfo.carNumber}}</span>
				</p>
				<p class="driver_name driverInfo">
					<span>行驶证号：</span>
					<span>{{carInfo.drivingNumber == "null" ? "暂无数据" : carInfo.drivingNumber}}</span>
				</p>
				<p class="driver_name driverInfo">
					<span>危险品运输证号：</span>
					<span>{{carInfo.transportNumber == "null" ? "暂无数据" : carInfo.transportNumber}}</span>
				</p>
			</div>
		</div>
		<div class="choose" style="margin-bottom: 60px">
			<p>
				<span>选择已有押车员下单(可不选)</span>
			</p>
			<button class="weui-btn weui-btn_default" v-if="showPeople" @click="choosePeoPle" style="background-color: #fff;border-color: #dedede">选择压车员</button>
			<div class="driver" v-else>
				<p class="close" @click="reset2">x</p>
				<p class="driver_name driverInfo">
					<span>用户名：</span>
					<span>{{escortInfo.username == "null" ? "暂无数据" : escortInfo.username}}</span>
				</p>
				<p class="driver_name driverInfo">
					<span>真实姓名：</span>
					<span>{{escortInfo.realName == "null" ? "暂无数据" : escortInfo.realName}}</span>
				</p>
				<p class="driver_phone driverInfo">
					<span>绑定手机号：</span>
					<span>{{escortInfo.phone == "null" ? "暂无数据" : escortInfo.phone}}</span>
				</p>
				<p class="driver_name driverInfo">
					<span>身份证号：</span>
					<span>{{escortInfo.idNumber == "null" ? "暂无数据" : escortInfo.idNumber}}</span>
				</p>

			</div>
		</div>
		<div class="footer">
			<span style="font-size: 20px">{{sumPrice}}</span>
			<button class="weui-btn weui-btn_primary" @click="creatOrder">提交订单</button>
		</div>
		<div class="js_dialog" id="iosDialog1" v-if="showDialog">
			<div class="weui-mask"></div>
			<div class="weui-dialog">
				<div class="weui-dialog__hd"><strong class="weui-dialog__title">警告</strong></div>
				<div class="weui-dialog__bd">
					<p>您当前可用余额不足，是否仍然下单？</p>
					<p>可用余额：{{companyInfo.balance}}元</p>
					<p>订单金额：{{sumPrice}}元</p>
				</div>
				<div class="weui-dialog__ft">
					<button class="weui-dialog__btn weui-dialog__btn_default" @click="concel">取消</button>
					<button class="weui-dialog__btn weui-dialog__btn_primary" @click="sure">继续下单</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				companyInfo: "",
				pickSelect: "请选择",
				pickSelect1: "请选择",
				index: 0,
				showDriver: true,
				showCar: true,
				showPeople: true,
				showDialog: false,
				categories: [],
				num: "",
				oils: [],
				// 库存
				stock: "",
				// 油品单价
				oilPrice: "",
				// 总价
				sumPrice: "¥0",
				driverInfo: "",
				carInfo: "",
				escortInfo: ""

			}
		},
		components: {
		},

		methods: {
			bindPickerChange: function (e) {
				console.log('picker发送选择改变，携带值为', e)
				wx.showLoading({
					title: "正在获取油品",
					mask: true
				})
				this.pickSelect = this.categories[e.mp.detail.value];
				var categoryName = this.categories[e.mp.detail.value];
				this.$http.get("/self_order/oils", { "categoryName": categoryName })
					.then(res => {
						console.log(res)
						if (res.status == "200") {
							this.oils = [];
							this.pickSelect1 = "请选择"
							wx.hideLoading()
							if (res) {
								for (var i = 0; i < res.data.length; i++) {
									this.oils.push(res.data[i].name)
								}
							}
						}

					})
					.catch(res => {
						console.log(res)
					})
			},
			bindPickerChange1: function (e) {
				if (this.pickSelect == "请选择") {
					wx.showToast({
						title: "请先选择预提货品类",
						icon: 'none',
						duration: 2000
					})
				} else {
					console.log('picker发送选择改变，携带值为', e)
					this.pickSelect1 = this.oils[e.mp.detail.value];
					var oilName = this.oils[e.mp.detail.value];
					this.$http.get("/self_order/oil_product", { "categoryName": this.categoryName, "oilName": oilName })
						.then(res => {
							console.log(res)
							if (res.status == "200") {
								this.oilPrice = res.data.price;
								this.stock = res.data.stock;
							}
						})
						.catch(res => {
							console.log(res)
						})
				}

			},
			input: function (val) {
				console.log(val)
				var num = val.mp.detail.value;
				this.sumPrice = "¥" + (this.oilPrice * num).toFixed(2)
			},
			reset: function () {
				this.showDriver = true;
			},
			reset1: function () {
				this.showCar = true;
			},
			reset2: function () {
				this.showPeople = true;
			},
			chooseDriver: function () {
				// 跳转到司机页面
				// this.showDriver = false;
				wx.navigateTo({
					url: "../../pages/selectDriver/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			chooseCar: function () {
				// 跳转到车辆页面
				// this.showCar = false;
				wx.navigateTo({
					url: "../../pages/selectCar/main?from=selfHelp",
					fail: function (res) {
						console.log(res)
					}
				})

			},
			choosePeoPle: function () {
				// 跳转到押运员页面
				// this.showPeople = false;
				wx.navigateTo({
					url: "../../pages/selectEscort/main",
					fail: function (res) {
						console.log(res)
					}
				})

			},
			creatOrder: function () {

				// 判断当前账户余额是否能够支付，不能支付弹出警告，点击继续支付可以跳转到订单详情页，如果余额够支付 不提示直接跳转到订单详情
				if (this.sumPrice > this.companyInfo.balance) {
					// 余额不足弹窗
					this.showDialog = true;
				} else {
					// 下单
					wx.showLoading({
						title: "正在下单",
						mask: true
					})
					var params = {
						categoryName: this.pickSelect,
						oilName: this.pickSelect1,
						orderWeight: this.num,
						driverId: this.driverInfo.key,
						escortId: this.escortInfo.length > 0 ? this.escortInfo.key : "",
						carId: this.carInfo.key
					}
					this.$http.post("/self_order", params)
						.then(res => {
							console.log(res)
							if (res.status == "200") {
								var orderInfo = res.data.id
								console.log(orderInfo)
								wx.hideLoading()
								wx.navigateTo({
									url: "../../pages/order/orderInfo/main?orderInfo=" + orderInfo+"&from=selfHelp",
									fail: function (res) {
										console.log(res)
									}
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
							console.log(res)
							wx.hideLoading()
							// .response.data.message
							wx.showToast({
								title: res.response.data.message,
								icon: 'none',
								duration: 2000
							})
						})
				}

			},
			concel: function () {
				this.showDialog = false;
			},
			sure: function () {
				wx.showLoading({
					title: "正在下单",
					mask: true
				})
				var params = {
					categoryName: this.pickSelect,
					oilName: this.pickSelect1,
					orderWeight: this.num,
					driverId: this.driverInfo.key,
					escortId: this.escortInfo.length > 0 ? this.escortInfo.key : "",
					carId: this.carInfo.key
				}
				this.$http.post("/self_order", params)
					.then(res => {
						console.log(res)
						wx.hideLoading()
						this.showDialog = false;
						if (res.status == "200") {
							var orderInfo = JSON.stringify(res.data)
							console.log(orderInfo)
							// wx.navigateTo({
							// 	url: "../../pages/order/orderInfo/main?orderInfo="+JSON.stringify(res.data),
							// 	fail: function (res) {
							// 		console.log(res)
							// 	}
							// })
						} else {
							wx.showToast({
								title: res.statusText,
								icon: 'none',
								duration: 2000
							})
						}
					})
					.catch(res => {
						console.log(res)
						// .response.data.message
						wx.showToast({
							title: res.response.data.message,
							icon: 'none',
							duration: 2000
						})
					})

			}

		},

		created() {
			// 获取企业信息
			this.$http.get("/self_order/company_account")
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
				})
			// 获取预提货品类
			this.$http.get("/self_order/categories")
				.then(res => {
					console.log(res)
					if (res.status == "200") {
						for (var i = 0; i < res.data.length; i++) {
							this.categories.push(res.data[i].name)
						}
					} else {
						wx.showToast({
							title: res.statusText,
							icon: 'none',
							duration: 2000
						})
					}
				})
			// 获取物料列表
		},
		mounted(query) {
			// 接收页面参数
			console.log(this.$root.$mp.query)
			var router = this.$root.$mp.query;
			if (router.from == "selectDriver") {
				this.driverInfo = router
				this.showDriver = false
			}
			if (router.from == "selectCar") {
				this.carInfo = router;
				this.showCar = false;
			}
			if (router.from == "selectescorts") {
				this.escortInfo = router;
				this.showPeople = false;
			}
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

	.input {
		float: right;
		width: 50%;
		padding: 0px;
		text-align: right;
		height: 100%;
	}

	input-placeholder {
		text-align: right
	}

	.dw {
		float: right;

	}

	.weui-cell__bd {
		margin-left: 10px;
	}

	.weui-cell {
		background-color: #fff;
	}

	.top {
		background-color: #fff;
		height: 150px;
		color: #4a4a4a;
		width: 100%;
	}

	.top p {
		text-align: center;
		font-size: 16px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.weui-flex__item {
		text-align: center;
		font-size: 22px;
		color: #2E79FF;
	}

	.placeholder1 {
		font-size: 14px;
		margin-top: 10px;
	}

	.product {
		margin-top: 10px;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
	}

	.product>p {
		text-align: center;
		margin: 15px 0px;
		color: #898989;
	}

	.product p span {
		color: #898989;

	}

	.picker {
		color: #000
	}

	.choose {
		background-color: #fff;
		margin-top: 10px;
		width: 100%;
		box-sizing: border-box;
	}

	.choose p {
		text-align: center;
		padding: 10px 0px;
	}

	.weui-btn {
		margin: 50px 0px;
		width: 80%;
		color: #2E79FF;
		margin-left: 10%
	}

	.driver {
		margin: 20px 3%;
		width: 94%;
		border: 1px solid #ddd;

	}

	.close {
		width: 94%;
		padding-right: 3%;
		text-align: right !important;
		font-size: 18px;
	}

	.driverInfo {

		text-align: left !important;
		margin-left: 70px;
		color: #4a4a4a;
		font-size: 14px;
		box-sizing: border-box
	}

	.driverInfo:last-child {
		margin-bottom: 20px;
	}

	.footer {
		width: 100%;
		position: fixed;
		bottom: 0px;
		left: 0px;
		height: 50px;
		border-top: 1px solid #ddd;
		background-color: #fff;
	}

	.footer span {
		float: left;
		width: 60%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: red;
		font-size: 16px;
	}

	.footer button {
		color: #fff;
		float: left;
		width: 40%;
		height: 50px;
		line-height: 50px;
		background-color: #2E79FF;
		margin: 0px;
		border: none !important;
		border-radius: 0px !important;
		box-shadow: 0px 0px 0px #fff;
	}

	.weui-dialog__hd {
		padding: 10px 0px 20px 0px;
	}

	.weui-dialog {
		width: 90%;
		max-width: 650rpx;
		top: 40%;
		left: 50%;
	}

	.weui-dialog__bd p {
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin-bottom: 10px;
	}

	.weui-dialog__bd p:nth-child(2) {
		width: 70%;
		margin-left: 15%;
		color: #fff;
		background-color: #1fa4e4;
		height: 40px;
		line-height: 40px;
		border-radius: 5px;
	}

	.weui-dialog__bd p:nth-child(3) {
		width: 70%;
		background-color: #33d38c;
		margin-left: 15%;
		color: #fff;
		height: 40px;
		line-height: 40px;
		border-radius: 5px;
	}
</style>