<template>
	<div class="container">
		<!-- 选项卡 -->
		<ul class="tabs">
			<li class="li-tab" v-for="(item,index) in tabsParam" :key="index" @click="toggleTabs(index)" :class="{active:index == nowIndex}">{{item}}</li>
		</ul>
		<div class="divTab" v-show="nowIndex===0">
			<div style="width:100%" v-if="ishave">
				<div class="orderInfo" v-for="(item,index) in waiting" :key="index" @click="toOrderInfo(item.id)">
					<p>
						<span>订单号：</span>
						<span>{{item.number}}</span>
					</p>
					<p>
						<span>订购货物:</span>
						<span>{{item.categoryName}} {{item.oilName}}</span>
					</p>
					<p>
						<span>订购量：</span>
						<span>{{item.orderWeight}}</span>
					</p>
					<p>
						<span>货车司机：</span>
						<span>{{item.driverName}}</span>
					</p>
					<p>
						<span>车牌号：</span>
						<span>{{item.carNumber}}</span>
					</p>
					<p>
						<span>下单时间：</span>
						<span>{{item.orderedTime}}</span>
					</p>
					<p>
						<span>订单状态：</span>
						<span>{{item.statusName}}</span>
					</p>
					<div class="weui-cell" style="border-top: none">
						<div class="weui-cell__bd">
							<p style="display: inline-block;width:35%">订购金额</p>
							<p style="color: #FF001F;font-size: 17px;display: inline-block;width:65%">¥ {{item.orderTotalPrice}}</p>
						</div>
						<div class="weui-cell__ft">
							<button class="weui-btn weui-btn_primary button" style="background-color: #2E79FF;" @click.stop="del(item.id,item.number)">取消订单</button>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<img src="/static/images/none.png" alt="" class="img3">
			</div>
			<div v-if="isshow">
				<div class="footer" v-if="foot">
					<p @click="loadingMore">加载更多</p>
				</div>
				<div class="footer" v-else>
					<p>已经到底了</p>
				</div>
			</div>
		</div>
		<div class="divTab" v-show="nowIndex===1">
			<div style="width:100%" v-if="ishave">
				<div class="orderInfo" v-for="(item,index) in orderList" :key="index" @click="toOrderInfo(item.id)">
					<p>
						<span>订单号：</span>
						<span>{{item.number}}</span>
					</p>
					<p>
						<span>订购货物:</span>
						<span>{{item.categoryName}} {{item.oilName}}</span>
					</p>
					<p>
						<span>订购量：</span>
						<span>{{item.orderWeight}}</span>
					</p>
					<p>
						<span>货车司机：</span>
						<span>{{item.driverName}}</span>
					</p>
					<p>
						<span>车牌号：</span>
						<span>{{item.carNumber}}</span>
					</p>
					<p>
						<span>下单时间：</span>
						<span>{{item.orderedTime}}</span>
					</p>
					<p>
						<span>订单状态：</span>
						<span>{{item.statusName}}</span>
					</p>
					<div class="weui-cell" style="border-top: none">
						<div class="weui-cell__bd">
							<p>订购金额</p>
						</div>
						<div class="weui-cell__ft">
							<p style="color: #FF001F;font-size: 17px">¥ {{item.orderTotalPrice}}</p>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<img src="/static/images/none.png" alt="" class="img3">
			</div>
			<div v-if="isshow1">
				<div class="footer" v-if="foot1">
					<p @click="loadingMore1">加载更多</p>
				</div>
				<div class="footer" v-else>
					<p>已经到底了</p>
				</div>
			</div>
		</div>
		<!-- 订单信息 -->
		<!-- 订单金额 -->

	</div>
</template>

<script>
	export default {
		data() {
			return {
				foot: true,
				foot1: true,
				page: 0,
				page1: 0,
				orderList: "",
				waiting: "",
				tabsParam: ['待处理订单', '已完成订单'],//（这个也可以用对象key，value来实现）
				nowIndex: 0,//默认第一个tab为激活状态
				ishave: false,
				ishave1: false,
				isshow: false,
				isshow1: false
			}
		},

		components: {
		},

		methods: {
			toggleTabs: function (index) {
				this.nowIndex = index;
			},
			loadingMore: function () {
				var page = this.page + 1;
				this.page = page
				var params = {
					page: page,
					size: 5,
					sort: "orderedTime,desc"
				}
				this.$http.get("/orders/waiting", params)
					.then(res => {
						console.log(res)
						if (res.data.content.length > 0) {
							this.ishave = true
							for (var i = 0; i < res.data.content.length; i++) {
								this.waiting.push(res.data.content[i]);
							}
							console.log(this.waiting)
						}
						if (res.data.content.length > 0 && res.data.content.length < 5) {
							this.isshow = false
						} else if (res.data.content.length == 5) {
							this.isshow = true
							this.foot = true
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
			},
			loadingMore1: function () {
				var page = this.page1 + 1;
				this.page1 = page
				var params = {
					page: page,
					size: 5,
					sort: "orderedTime,desc"
				}
				this.$http.get("/orders/complete", params)
					.then(res => {
						console.log(res)
						if (res.data.content.length > 0) {
							if (res.data.content.length > 0) {
								this.ishave = true
								for (var i = 0; i < res.data.content.length; i++) {
									this.orderList.push(res.data.content[i]);
								}
								console.log(this.waiting)
							}
							if (res.data.content.length > 0 && res.data.content.length < 5) {
								this.isshow = false
							} else if (res.data.content.length == 5) {
								this.isshow = true
								this.foot = true
							}
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
			},
			del: function (id, number) {
				var that = this;
				wx.showModal({
					title: '提示',
					content: '是否取消该订单',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							that.$http.post(`/orders/${id}/cancel?number=${number}`)
								.then(res => {
									console.log(res)
									if (res.status == "200") {
										wx.showToast({
											title: "订单取消成功",
											icon: "success",
											duration: 2000,
											success: function () {
												var params = {
													page: 0,
													size: 5,
													sort: "orderedTime,desc"
												}
												that.$http.get("/orders/waiting", params)
													.then(re => {
														console.log(re)
														if (re.status == "200") {
															that.waiting = re.data.content
														}
													})
													.catch(re => {
														console.log(re)
														// .response.data.message
														wx.showToast({
															title: re.response.data.message,
															icon: 'none',
															duration: 2000
														})
													})
												var params1 = {
													page: 0,
													size: 5,
													sort: "orderedTime,desc"
												}
												that.$http.get("/orders/complete", params1)
													.then(re => {
														console.log(re)
														if (re.status == "200") {
															that.orderList = re.data.content
														}
													})
													.catch(re => {
														console.log(re)
														// .response.data.message
														wx.showToast({
															title: re.response.data.message,
															icon: 'none',
															duration: 2000
														})
													})
											}
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
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})

			},
			toOrderInfo: function (orderCode) {
				wx.navigateTo({
					url: "../../pages/order/orderInfo/main?orderInfo=" + orderCode,
					fail: function (res) {
						console.log(res)
					}
				})
			}
		},
		onShow() {
			var params = {
				page: this.page,
				size: 5,
				sort: "orderedTime,desc"
			}
			this.$http.get("/orders/waiting", params)
				.then(res => {
					console.log(res)
					if (res.status == "200") {
						this.waiting = res.data.content
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
			var params1 = {
				page: this.page1,
				size: 5,
				sort: "orderedTime,desc"
			}
			this.$http.get("/orders/complete", params1)
				.then(res => {
					console.log(res)
					if (res.status == "200") {
						this.orderList = res.data.content
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
	}
</script>

<style scoped>
	.container {
		width: 100%;
		overflow-x: hidden;
		padding: 0px;
		background-color: #efeff4;
	}

	.active {
		border-bottom: 1px solid #fff;
	}

	.tabs {
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: #2E79FF;
		color: #fff;
		font-size: 14px;
		padding: 0;
		position: fixed;
		left: 0px;
		top: 0px;
		z-index: 9999
	}

	.li-tab {
		width: 20%;
		height: 80%;
		margin: 0px 15%;
		display: inline-block;
		text-align: center;
	}

	.divTab {
		width: 100%;
		margin-top: 50px;
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

	.button {
		width: 60px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		font-weight: normal
	}

	.weui-cell__bd {
		padding-left: 5%;
		color: #000;
	}

	.weui-cell {
		background-color: #fff;
		width: 100%;
		font-size: 14px;
	}

	.weui-cell__ft {
		padding-right: 20px
	}

	.orderInfo {
		width: 100%;
		background-color: #fff;
		color: #898989;
		margin-bottom: 10px;
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
</style>