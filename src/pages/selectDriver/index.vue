<template>
	<div class="bbody">
		<!-- 搜索框 -->
		<div class="searchBox">
			<div class="weui-search-bar" :class="{'weui-search-bar_focusing': isSearchBarFocus}" id="searchBar">
				<div class="weui-search-bar__box">
					<i class="weui-icon-search"></i>
          <input type="search" class="weui-search-bar__input" id="searchInput" @change="search" placeholder="搜索用户姓名或手机号" required/>
        </div>
			</div>
      <div class="search-box-img" @click="addItem">
        <image class="search-box-img-inner" :src="addIconUrl" alt="addIcon" />
      </div>
		</div>
		<!-- 单条信息 -->
		<div style="width:100%" v-if="ishave">
			<div v-for="(item,index) in driverList" @click.stop="toSelfHelp" :data-key="item.id" :data-iswork="item.working">
				<div class="single-msg-box" :style="item.sstyle">
					<div class="single-box" :data-key="item.id">
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
				}
				this.$http.get("/self_order/drivers?sort=working&sort=id,desc", params)
					.then(res => {
						console.log(res)
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
					})
			},
			loadingMore: function () {
				this.page = this.page + 1
				var page = this.page;
				var params = {
					nameOrPhone: this.nameOrPhone,
					page: page,
					size: 5,
				}
				this.$http.get("/self_order/drivers?sort=working&sort=id,desc", params)
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
				var url = "../NewEnterpriseUser/main?from=selectDriver"
				wx.navigateTo({ url })
			},
			toSelfHelp: function (e) {
				console.log(e)
				var key = e.currentTarget.dataset.key
				var iswork = e.currentTarget.dataset.iswork
				if (iswork) {
					wx.showModal({
						title: '提示',
						content: '该司机正在工作中，请选择其他司机',
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定')
							}
						}
					})
				} else {
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
					var selectDriver = {
						key,
						realName,
						phone,
						idNumber,
						driverNumber
					}
					wx.setStorage({
						key: "selectDriver",
						data: selectDriver,
						success: function () {
							wx.navigateBack({
								delta: 1
							})
						}
					})
				}
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
			},
      queryDrivers(){
        // 获取企业开票信息
        var params = {
          nameOrPhone: this.nameOrPhone,
          page: 0,
          size: 5,
        }
        this.$http.get("/self_order/drivers?sort=working&sort=id,desc", params)
          .then(res => {
            console.log(res)
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
          })
      }
		},
    onShow(){
      this.nameOrPhone=''
      this.queryDrivers()
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

	.disable {
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
		width: 90%;
		height: 27.5px;
		padding: 0px;
		position: static;
		float: left;
		border-radius: 27.5px;
	}

	.weui-search-bar__box {
		width: 100%;
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
		width: 40rpx;
		height: 40rpx;
		margin: 8rpx 0 0 20rpx;
		float: left;
		left: 15.5px;
	}

	.search-box-img-inner {
		width: 100%;
		height: 100%;
	}

	.single-msg-box {
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
		width: 375px;
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
