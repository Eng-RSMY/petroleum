<template>
	<div class="container">
		<div class="orderInfo" v-for="(item,index) in orderList" :key="index" @click="toOrderInfo(item.id)">
			<p>
				<span>订单号：</span>
				<span>{{item.number == null ? "暂无数据" : item.number}}</span>
			</p>
			<p>
				<span>订购货物:</span>
				<span>{{item.categoryName}} {{item.oilName}}</span>
			</p>
			<p>
				<span>订购量：</span>
				<span>{{item.orderWeight == null ? "暂无数据" : item.orderWeight}}</span>
			</p>
			<p>
				<span>货车司机：</span>
				<span>{{item.driverName == null ? "暂无数据" : item.driverName}}</span>
			</p>
			<p>
				<span>车牌号：</span>
				<span>{{item.carNumber == null ? "暂无数据" : item.carNumber}}</span>
			</p>
			<p>
				<span>下单时间：</span>
				<span>{{item.orderedTime == null ? "暂无数据" : item.orderedTime}}</span>
			</p>
			<div class="weui-cell" style="border-top: none">
				<div class="weui-cell__bd">
					<p style="display: inline-block;width:40%">订购金额</p>
					<p style="color: #FF001F;font-size: 17px;display: inline-block;width:60%">{{item.orderTotalPrice == null ? "暂无数据" : "¥"+item.orderTotalPrice}}</p>
				</div>
				<div class="weui-cell__ft">
					<p style="color: #2E79FF;font-size: 17px">{{item.statusName}}</p>
				</div>
			</div>
		</div>
		<div class="footer" v-if="foot">
			<p @click="loadingMore">加载更多</p>
		</div>
		<div class="footer" v-else>
			<p>已经到底了</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderList: "",
				foot: true,
				page: 0,
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
				this.$http.get("/track_order", params)
					.then(res => {
						console.log(res)
						if (res.data.content.length > 0) {
							for (var i = 0; i < res.data.content.length; i++) {
								this.orderList.push(res.data.content[i]);
							}
							console.log(this.orderList)
						} else {
							this.foot = false
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
			toOrderInfo: function (orderCode) {
				wx.navigateTo({
					url: "../../pages/order/orderInfo/main?orderInfo=" + orderCode,
					fail: function (res) {
						console.log(res)
					}
				})
			}
		},

		mounted() {
			var params = {
				page: this.page,
				size: 5,
				sort: "orderedTime,desc"
			}
			this.$http.get("/track_order", params)
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
		margin-top: 10px;
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
		font-size: 14px;
	}

	.weui-cell__ft {
		padding-right: 27px
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