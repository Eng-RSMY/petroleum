<template>
	<div class="container">
		<!-- 选项卡 -->
		<ul class="tabs">
			<li class="li-tab" v-for="(item,index) in tabsParam" :key="index" @click="toggleTabs(index)" :class="{active:index == nowIndex}">{{item}}</li>
		</ul>
		<div class="divTab" v-show="nowIndex===0">
			<p class="title">订单详情</p>
			<div class="orderInfo" v-for="(item,index) in orderList" :key="index" v-if="item.orderState==1" @click="toOrderInfo(item.orderCode)">
				<p>
					<span>订单号：</span>
					<span>{{item.orderCode}}</span>
				</p>
				<p>
					<span>订购货物:</span>
					<span>{{item.productType}}</span>
				</p>
				<p>
					<span>订购量：</span>
					<span>{{item.quantity}}</span>
				</p>
				<p>
					<span>货车司机：</span>
					<span>{{item.shiji}}</span>
				</p>
				<p>
					<span>车牌号：</span>
					<span>{{item.carCode}}</span>
				</p>
				<p>
					<span>下单时间：</span>
					<span>{{item.orderCreattime}}</span>
				</p>
				<div class="weui-cell" style="border-top: none">
					<div class="weui-cell__bd">
						<p>订购金额</p>
					</div>
					<div class="weui-cell__ft">
						<p style="color: #FF001F;font-size: 17px">¥ {{item.orderPrice}}</p>
					</div>
				</div>
			</div>

		</div>
		<div class="divTab" v-show="nowIndex===1">
				<p class="title">订单详情</p>
				<div class="orderInfo" v-for="(item,index) in orderList" :key="index" v-if="item.orderState==2" @click="toOrderInfo(item.orderCode)" >
					<p>
						<span>订单号：</span>
						<span>{{item.orderCode}}</span>
					</p>
					<p>
						<span>订购货物:</span>
						<span>{{item.productType}}</span>
					</p>
					<p>
						<span>订购量：</span>
						<span>{{item.quantity}}</span>
					</p>
					<p>
						<span>货车司机：</span>
						<span>{{item.shiji}}</span>
					</p>
					<p>
						<span>车牌号：</span>
						<span>{{item.carCode}}</span>
					</p>
					<p>
						<span>下单时间：</span>
						<span>{{item.orderCreattime}}</span>
					</p>
					<div class="weui-cell" style="border-top: none">
						<div class="weui-cell__bd">
							<p>订购金额</p>
						</div>
						<div class="weui-cell__ft">
							<p style="color: #FF001F;font-size: 17px">¥ {{item.orderPrice}}</p>
						</div>
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
				orderList: [{
					orderCode: "2314311484619",
					productType: "92号汽油",
					quantity: "12吨",
					shiji: "啦啦啦",
					orderPrice: "45000.00",
					orderState: "2",
					carCode: "鲁A415cc",
					orderCreattime: "2018-07-17  14:00:00"
				}, {
					orderCode: "2314311484619",
					productType: "95号汽油",
					quantity: "12吨",
					orderPrice: "45000.00",
					shiji: "啦啦啦",
					carCode: "鲁A911XP",
					orderState: "1",
					orderCreattime: "2018-07-17  14:00:00"
				}, {
					orderCode: "2314311484619",
					productType: "97号汽油",
					quantity: "12吨",
					orderPrice: "45000.00",
					shiji: "啦啦啦",
					orderState: "1",
					carCode: "鲁A415CC",
					orderCreattime: "2018-07-18  14:00:00"
				}],
				tabsParam: ['待处理订单', '已完成订单'],//（这个也可以用对象key，value来实现）
				nowIndex: 0,//默认第一个tab为激活状态
			}
		},

		components: {
		},

		methods: {
			toggleTabs: function (index) {
				this.nowIndex = index;
			},
			toOrderInfo:function(orderCode){
				wx.navigateTo({
					url: "../../pages/order/orderInfo/main?orderCode="+orderCode,
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
</style>