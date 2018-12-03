<template>
	<div class="container">
		<!-- <div class="orderInfo" v-for="(item,index) in orderList" :key="index" @click="toOrderInfo(item.number)"> -->
		<div v-if="ishave" style="width:100%">
			<div class="orderInfo" v-for="(item,index) in orderList" :key="index" @click="toOrderInfo(item.id)">
				<p>
					<span>时间：</span>
					<span>{{item.orderedTime == null ? "暂无数据" : item.orderedTime}}</span>
				</p>
				<p>
					<span>品类：</span>
					<span>{{item.categoryName == null ? "暂无数据" : item.categoryName}}</span>
				</p>
				<p>
					<span>物料:</span>
					<span>{{item.oilName == null ? "暂无数据" : item.oilName}}</span>
				</p>
				<p>
					<span>实装量：</span>
					<span>{{item.weight == null ? "暂无数据" : item.weight+"吨"}}</span>
				</p>
        <p>
          <span>车牌号：</span>
          <span>{{item.carNumber == null ? "暂无数据" : item.carNumber}}</span>
        </p>
				<p>
					<span>实际支付金额：</span>
					<span>{{item.totalPrice == null ? "暂无数据" : "￥"+ item.totalPrice +"元"}}</span>
				</p>
			</div>
		</div>
		<div v-else>
			<img src="/static/images/none.png" alt="" class="img">
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
</template>

<script>
	export default {
		data() {
			return {
				orderList: [],
				foot: true,
				page: 0,
				isshow: false,
				ishave: false
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
					size: 20,
					sort: "orderedTime,desc"
				}
				this.$http.get("/bill", params)
					.then(res => {
						if (res.data.content.length > 0) {
							for (var i = 0; i < res.data.content.length; i++) {
								res.data.content[i].orderedTime=res.data.content[i].orderedTime.replace(/T/," ")
								this.orderList.push(res.data.content[i]);
							}
						} else {
							this.foot = false
						}
					})
					.catch(res => {
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
					}
				})
			}
		},

		mounted() {
      Object.assign(this.$data, this.$options.data())
			var params = {
				page: this.page,
				size: 20,
				sort: "orderedTime,desc"
			}
			this.$http.get("/bill", params)
				.then(res => {
					if (res.status == "200") {
						if (res.data.content.length > 0) {
							this.ishave = true
							for (var i = 0; i < res.data.content.length; i++) {
								res.data.content[i].orderedTime=res.data.content[i].orderedTime.replace(/T/," ")
								this.orderList = res.data.content
							}

						}
						if (res.data.content.length > 0 && res.data.content.length < 20) {
							this.isshow = false
						} else if (res.data.content.length == 20) {
							this.isshow = true
							this.foot = true
						}
					}
				})
				.catch(res => {
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

	.img {
		width: 200px;
		height: 200px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -100px;
		margin-top: -100px
	}
</style>
