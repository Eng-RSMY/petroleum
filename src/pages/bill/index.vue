<template>
	<div class="container">
		<div class="orderInfo" v-for="(item,index) in orderList" :key="index" @click="toOrderInfo(item.orderCode)">
			<p>
				<span>时间：</span>
				<span>{{item.orderCreattime}}</span>
			</p>
			<p>
				<span>品类：</span>
				<span>{{item.productType}}</span>
			</p>
			<p>
				<span>物料:</span>
				<span>{{item.wuliao}}</span>
			</p>
			<p>
				<span>数量：</span>
				<span>{{item.quantity}}</span>
			</p>
			<p>
				<span>实际支付金额：</span>
				<span>{{item.orderPrice}}</span>
			</p>
		</div>

	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{
					productType: "D品类",
					wuliao:"E物料",
					quantity: "12吨",
					orderPrice: "204123.12元",
					orderCreattime: "2018-07-17"
				}, {
					productType: "D品类",
					wuliao:"E物料",
					quantity: "12吨",
					orderPrice: "204123.12元",
					orderCreattime: "2018-07-17"
				}, {
					productType: "D品类",
					wuliao:"E物料",
					quantity: "12吨",
					orderPrice: "204123.12元",
					orderCreattime: "2018-07-17"
				},{
					productType: "D品类",
					wuliao:"E物料",
					quantity: "12吨",
					orderPrice: "204123.12元",
					orderCreattime: "2018-07-17"
				}],

			}
		},

		components: {
		},

		methods: {
			toggleTabs: function (index) {
				this.nowIndex = index;
			},
			toOrderInfo: function (orderCode) {
				wx.navigateTo({
					url: "../../pages/order/orderInfo/main?orderCode=" + orderCode,
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
</style>