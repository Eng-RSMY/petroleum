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
			<!-- <div class="search-box-img" @click="addItem">
				<image class="search-box-img-inner" :src="addIconUrl" alt="addIcon" />
			</div> -->
		</div>
		<!-- 单条信息 -->
		<div style="width:100%" v-if="ishave">
			<div v-for="(item,index) in driverList" @click.stop="toSelfHelp" :data-key="item.id">
				<div class="single-msg-box" :style="item.sstyle">
					<div class="single-box" @touchstart="touchS" @touchmove="touchM" @touchend="touchE" :data-key="item.id">
						<div class="s-m-b-inner">
							<div class="single-msg-box-left">
								<p>司机真实姓名：</p>
								<p>绑定手机号：</p>
								<p>身份证号：</p>
								<p>驾驶号码：</p>
							</div>
							<div class="single-msg-box-center">
								<p>{{ item.realName == null? "暂无信息 " : item.realName}}</p>
								<p>{{ item.phone == null? "暂无信息 " :item.phone }}</p>
								<p>{{ item.idNumber == null? " 暂无信息" :item.idNumber}}</p>
								<p>{{ item.driverNumber == null? "暂无信息" : item.driverNumber }}</p>
							</div>
							<div class="single-msg-box-status" v-if="item.working ">
								工作中
							</div>
							<div class="single-msg-box-status" style="border-color:#2E79FF ;color: #2E79FF" v-else>
								未工作
							</div>
						</div>
					</div>
					<div class="s-m-b-right">
						<div class="s-m-b-r-edit" @click.stop="editItem" :data-key="item.id">编辑 </div>
						<!-- <div class="s-m-b-r-del" @click="delItem" :data-key="item.id">删除</div> -->
						<!-- <div class="s-m-b-r-del" :data-key="item.id">删除</div> -->
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
				driverList: [],
				page: 0,
				nameOrPhone: "",
				foot: true,
				isshow: false,
				ishave: false
			}
		},
		methods: {
			showInput() {
				isSearchBarFocus = !isSearchBarFocus
			},
			search: function (val) {
				console.log(val)
				this.nameOrPhone = val.mp.detail.value
				var nameOrPhone = val.mp.detail.value;
				var params = {
					nameOrPhone: nameOrPhone,
					page: 0,
					size: 5,
					sort: "id,desc"
				}
				this.$http.get("/self_order/drivers", params)
					.then(res => {
						console.log(res)
						if (res.status == "200") {
							if (res.data.content.length > 0) {
								this.ishave = true
								this.driverList = res.data.content;
							}
							if (res.data.content.length > 0 && res.data.content.length < 5) {
								this.isshow = true;
								this.foot = false;
							} else if (res.data.content.length = 5) {
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
					})
			},
			loadingMore: function () {
				this.page = this.page + 1
				var page = this.page;
				var params = {
					nameOrPhone: this.nameOrPhone,
					page: page,
					size: 5,
					sort: "id,desc"
				}
				this.$http.get("/self_order/drivers", params)
					.then(res => {
						console.log(res)
						if (res.status == "200") {
							if (res.data.content.length > 0) {
								for (var i = 0; i < res.data.content.length; i++) {
									this.driverList.push(res.data.content[i]);
								}
								console.log(this.driverList)
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
			addItem() {
				var url = "../addDriver/main"
				wx.navigateTo({ url })
			},
			toSelfHelp: function (e) {
				console.log(e)
				var key = e.currentTarget.dataset.key
				var list = this.driverList
				var index = null
				for (let i = 0; i < list.length; i++) {
					if (list[i].id == key) {
						index = i
					}
				}
				var realName = list[index].realName
				var phone = list[index].phone
				var idNumber = list[index].idNumber
				var driverNumber = list[index].driverNumber
				var url = "../selfHelp/main?from=selectDriver&key=" + key + "&realName=" + realName + "&phone=" + phone +
					"&idNumber=" + idNumber + "&driverNumber=" + driverNumber
				wx.navigateTo({ url })
			},
			touchS(e) {
				if (e.touches.length === 1) {
					this.startX = e.touches[0].clientX
				}
			},
			touchM(e) {
				if (e.touches.length === 1) {
					var key = e.currentTarget.dataset.key
					var list = this.driverList
					var moveX = e.touches[0].clientX
					// var disX = Math.floor((this.startX - moveX) / 3)
					var disX = Math.floor((this.startX - moveX))
					var singleBoxStyle = ""
					let index = null
					if (disX === 0 || disX < 0) {
						singleBoxStyle = "left: 0px;"
					} else if (disX > 0) {
						singleBoxStyle = "left: " + disX + "%"
						if (disX >= this.btnWidth) {
							singleBoxStyle = "left: " + this.btnWidth + "%"
						}
					}
					//查找index
					for (let i = 0; i < list.length; i++) {
						if (list[i].id == key) {
							index = i
						}
					}
					list[index].sstyle = singleBoxStyle
				}
			},
			touchE() {

			},
			delItem(e) {
				var key = e.currentTarget.dataset.key
				var list = this.driverList
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
				var url = `../../pages/modifyUser/main?id=${key}&address=addDriver`
				wx.navigateTo({ url })
			}
		},
		mounted() {
			// 获取企业开票信息
			var params = {
				nameOrPhone: this.nameOrPhone,
				page: 0,
				size: 5,
				sort: "id,desc"
			}
			this.$http.get("/self_order/drivers", params)
				.then(res => {
					console.log(res)
					if (res.status == "200") {
						if (res.data.content.length > 0) {
							this.ishave = true
							this.driverList = res.data.content;
						}
						if (res.data.content.length > 0 && res.data.content.length < 5) {
							this.isshow = true;
							this.foot = false;
						} else if (res.data.content.length = 5) {
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
				})
		}
	}
</script>
<style scoped>
	.bbody {
		width: 100%;
		height: 100%;
		background-color: #efeff4;
		overflow: hidden;
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
		width: 20px;
		height: 20px;
		margin: 4px 0 0 15.5px;
		float: left;
		left: 15.5px;
	}

	.search-box-img-inner {
		width: 100%;
		height: 100%;
	}

	.single-msg-box {
		width: 125%;
		height: 140px;
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
		height: 140px;
		position: relative;
		float: left;
	}

	.s-m-b-inner {
		width: 375px;
		height: 140px;
		position: relative;
		float: left;
	}

	.single-msg-box-left {
		width: 98px;
		height: 108px;
		margin: 12px 0 0 17px;
		float: left;
	}

	.single-msg-box-center {
		width: 160px;
		height: 108px;
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
		/* width: 20%; */
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