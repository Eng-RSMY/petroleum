<template>
	<div class="bbody">
		<!-- 搜索框 -->
		<div class="searchBox">
			<div class="weui-search-bar" :class="{'weui-search-bar_focusing': isSearchBarFocus}" id="searchBar">
				<div class="weui-search-bar__box">
					<i class="weui-icon-search"></i>
					<input type="search" class="weui-search-bar__input" id="searchInput" @change="search" placeholder="搜索车牌号" required/>
				</div>
			</div>
			<div class="search-box-img" @click="addItem">
				添加
			</div>
		</div>
		<!-- 单条信息 -->
		<div style="width:100%" v-if="ishave">
			<div v-for="(item,index) in carList" :data-key="item.id" :data-iswork="item.working" @click.stop="toSelfHelp">
				<div class="single-msg-box" :style="item.sstyle">
					<div class="single-box" :data-key="item.id">
						<div class="s-m-b-inner">
							<div class="single-msg-box-left">
								<p>车牌号：</p>
								<p>行驶证号：</p>
								<p>危险品运输号：</p>
							</div>
							<div class="single-msg-box-center">
								<p>{{ item.carNumber ==null ? "暂无信息" : item.carNumber }}</p>
								<p>{{ item.drivingNumber ==null ? "暂无信息" : item.drivingNumber}}</p>
								<p>{{ item.transportNumber ==null ? "暂无信息" : item.transportNumber}}</p>
							</div>
							<div class="single-msg-box-status" v-if="item.working">
								工作中
							</div>
							<div class="single-msg-box-status" style="border-color:#2E79FF ;color: #2E79FF" v-else>
								未工作
							</div>
							<div class="btnGroup">
								<span class="edit disable" v-if="item.working" :data-key="item.id">编辑</span>
								<span class="edit " v-else :data-key="item.id" @click.stop="editItem">编辑</span>
							</div>
						</div>

					</div>

				</div>
			</div>
		</div>
		<div v-else>
			<img src="/static/images/none.png" alt="" class="img3">
		</div>
		<!-- 底部 -->
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
	import addIconUrl from '../../img/addIcon.png'

	export default {
		data() {
			return {
				addIconUrl,
				isSearchBarFocus: false,
				startX: null,
				btnWidth: -25,
				carList: [],
				page: 0,
				carNumber: "",
				foot: true,
				router: "",
				isshow: false,
				ishave: false
			}
		},
		methods: {
			showInput() {
				isSearchBarFocus = !isSearchBarFocus
			},
			search: function (val) {
				this.carNumber = val.mp.detail.value
				var carNumber = val.mp.detail.value;
				var params = {
					carNumber: carNumber,
					page: 0,
					size: 5,
					sort: "id,desc"
				}
				this.$http.get("/self_order/cars", params)
					.then(res => {
						if (res.status == "200") {
							if (res.data.content.length > 0) {
								this.ishave = true
								this.driverList = res.data.content;
							}
							if (res.data.content.length > 0 && res.data.content.length < 5) {
								this.isshow = false;
								this.foot = false;
							} else if (res.data.content.length == 5) {
								this.isshow = true;
								this.foot = true;
							} else {
								this.ishave = false
								this.driverList = []
							}
						} else {
							wx.showToast({
								title: res.statusText,
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(res => {
						// .response.data.message
						wx.showToast({
							title: res.response.data.message,
							icon: 'none',
							duration: 2000
						})
					})
			},
			addItem() {
				var url = "../addCar/main?from=" + this.router;
				wx.navigateTo({ url })
			},
			loadingMore: function () {
				this.page = this.page + 1
				var page = this.page;
				var params = {
					carNumber: this.carNumber,
					page: page,
					size: 5,
					sort: "id,desc"
				}
				this.$http.get("/self_order/cars", params)
					.then(res => {
						if (res.status == "200") {
							if (res.data.content.length > 0) {
								for (var i = 0; i < res.data.content.length; i++) {
									this.driverList.push(res.data.content[i]);
								}
							} else {
								this.foot = false
							}
						} else {
							wx.showToast({
								title: res.statusText,
								icon: 'none',
								duration: 2000
							})
						}
					})

			},
			toSelfHelp: function (e) {
				if (this.router == "workbench") {

				} else {
					var key = e.currentTarget.dataset.key
					var iswork = e.currentTarget.dataset.iswork
					if (iswork) {
						wx.showModal({
							title: '提示',
							content: '该车辆正在工作中，请选择其他车辆',
							showCancel: false,
							success: function (res) {
								if (res.confirm) {
								}
							}
						})
					} else {
						var list = this.carList
						var index = null
						for (let i = 0; i < list.length; i++) {
							if (list[i].id == key) {
								index = i
							}
						}
						var remark = list[index].remark
						var carNumber = list[index].carNumber
						var drivingNumber = list[index].drivingNumber
						var transportNumber = list[index].transportNumber
						var selectCar = {
							key: key,
							remark,
							carNumber,
							drivingNumber,
							transportNumber,
						}
						wx.setStorage({
							key: "selectCar",
							data: selectCar,
							success: function () {
								wx.navigateBack({
									delta: 1
								})
							}
						})
						// var url = "../selfHelp/main?from=selectCar&key=" + key + "&remark=" + remark + "&carNumber=" + carNumber +
						// 	"&drivingNumber=" + drivingNumber + "&transportNumber=" + transportNumber
						// if (this.router == "selfHelp") {
						// 	wx.navigateTo({ url })
						// }
					}
				}


			},
			delItem(e) {
				var key = e.currentTarget.dataset.key
				var list = this.carList
				let index = null
				for (let i = 0; i < list.length; i++) {
					if (list[i].id == key) {
						index = i
					}
				}
				list.splice(index, 1)
			},
			editItem(e) {
				var key = e.currentTarget.dataset.key
				// var list = this.carList
				// var index = null
				// for (let i = 0; i < list.length; i++) {
				// 	if (list[i].id == key) {
				// 		index = i
				// 	}
				// }
				// var carName = list[index].name
				// var carPlate = list[index].plate
				// var driveNum = list[index].driveNum
				// var dangerNum = list[index].dangerNum
				// var url = "../addCar/main?key=" + key + "&carName=" + carName + "&carPlate=" + carPlate +
				// "&driveNum=" + driveNum + "&dangerNum=" + dangerNum
				var url = "../addCar/main?key=" + key + "&from=selfHelp"
				wx.navigateTo({ url })
			}
		},
		components: {
		},
		onShow() {
			var params = {
				carNumber: this.carNumber,
				page: 0,
				size: 5,
				sort: "id,desc"
			}
			this.$http.get("/self_order/cars", params)
				.then(res => {
					if (res.status == "200") {
						if (res.data.content.length > 0) {
							this.ishave = true
							this.carList = res.data.content;
						}
						if (res.data.content.length > 0 && res.data.content.length < 5) {
							this.isshow = false;
							this.foot = false;
						} else if (res.data.content.length == 5) {
							this.isshow = true;
							this.foot = true;
						}
					} else {
						wx.showToast({
							title: res.statusText,
							icon: 'none',
							duration: 2000
						})
					}
				})
			var router = this.$root.$mp.query.from;
			this.router = router
			if (router == "workbench") {
				wx.setNavigationBarTitle({
					title: '车辆管理',
					fail: function (res) {
					}
				})
			} else {
				wx.setNavigationBarTitle({
					title: '选择车辆',
					fail: function (res) {
					}
				})
			}
		},
	}
</script>
<style scoped>
	.bbody {
		width: 100%;
		height: 100%;
		background-color: #efeff4;
	}

	.btnGroup {
		width: 100%;
		height: 40px;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		clear: both;
		margin-top: 10px
	}

	.edit {
		float: right;
		margin-right: 20px;
		width: 50px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 12px;
		color: #fff;
		background-color: #2E79FF;
		border-radius: 5px;
		margin-top: 5px;
	}
	.disable{
		color: #fff;
		background-color: #898989;

	}
	.searchBox {
		width: 100%;
		height: 50px;
		padding: 12px;
		box-sizing: border-box;
		background: #fff;
	}

	.weui-search-bar {
		width: 310px;
		height: 27.5px;
		padding: 0px;
		position: static;
		float: left;
		border-radius: 27.5px;
	}

	.weui-search-bar__box {
		width: 310px;
		height: 27.5px;
		border-radius: 13.75px;
		background: #efeff4;
	}

	.weui-icon-search {
		left: 16.5px;
	}

	.weui-search-bar__input {
		padding: 2.25px 9px !important;
	}

	.search-box-img {
		height: 20px;
		margin: 4px 0 0 15.5px;
		float: left;
		left: 15.5px;
		font-size: 12px;
		color: #2E79FF
	}

	.search-box-img-inner {
		width: 100%;
		height: 100%;
	}

	.single-msg-box {
		/* width: 375px; */
		width: 100%;
		margin: 6.5px 0 0 0;
		position: relative;
		background: #fff;
		font-family: PingFang;
		font-size: 14px;
		overflow: hidden;
		color: #898989;
	}

	.single-msg-box p {
		padding: 6.5px 0 0 0;
	}

	.single-box {
		width: 100%;
		position: relative;
		float: left;
	}

	.s-m-b-inner {
		width: 100%;
		position: relative;
		float: left;
	}

	.single-msg-box-left {
		width: 98px;
		margin: 12px 0 0 17px;
		float: left;
	}

	.single-msg-box-center {
		width: 160px;
		margin: 12px 0 0 0;
		float: left;
	}

	.single-msg-box-status {
		width: 60px;
		height: 20px;
		margin: 15px 0 0 23.5px;
		border: 1px solid #E7021E;
		color: #E7021E;
		text-align: center;
		float: left;
	}

	.s-m-b-right {
		width: 10%;
		height: 140px;
		line-height: 140px;
		position: absolute;
		right: 0px;
		float: left;
		text-align: center;
		color: #fff;
		background: black;
	}

	.s-m-b-r-edit {
		width: 100%;
		height: 140px;
		float: left;
		background: #2E79FF;
	}

	.s-m-b-r-del {
		width: 50%;
		height: 140px;
		float: left;
		background: #E7021E;
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

	.img3 {
		width: 200px;
		height: 200px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -100px;
		margin-top: -100px
	}
</style>