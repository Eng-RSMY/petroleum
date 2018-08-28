<template>
	<div>
		<!-- <index-tab></index-tab> -->
		<div class="top">
			<div @click="toPermission">配置角色权限</div>
			<div>
				<view class="weui-cell weui-cell_select">
					<view class="weui-cell__bd">
						<picker @change="bindAccountChange($event)" :value="accountIndex" :range="accounts">
							<view class="weui-select">{{accounts[accountIndex]}}</view>
						</picker>
					</view>
				</view>
			</div>
		</div>
		<!-- <index-content :userList="userList"></index-content> -->
		<div class="content">
			<div class="contentList" @click="edit(item.id)" v-if="showList" v-for="item in userList" :key="item.id">
				<div>
					<p><span>用户名</span> <span>{{item.username}}</span> </p>
					<p><span>角色</span> <span>{{item.roleName}}</span> </p>
					<p><span>绑定手机号</span><span>{{item.phone}}</span> </p>
				</div>
				<div>
					<button v-if="item.enabled">激活中</button>
					<button class="not" v-else>未激活</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				userList: '',
				accounts: ["全部用户"],
				accountIndex: 0,
			}
		},
		methods: {
			edit(id) {
				wx.navigateTo({
					url: `../../pages/modifyUser/main?id=${id}`,
					fail: function (res) {
						console.log(res)
					}
				})
			},
			bindAccountChange: function (e) {
				this.accountIndex = e.mp.detail.value
				if (this.accountIndex > 0) {
					var params = {
						roleId: this.roleList[(e.mp.detail.value - 1)].id
					}
					this.$http.get("/users/searchByRoleId", params).then(res => {
						console.log(res)
						if (res.data.content.length > 0) {
							this.userList = res.data.content
						} else {
							this.userList = [];
							wx.showToast({
								title: "未查询到数据",
								icon: 'none',
								duration: 2000
							})
						}


					}).catch(res => {
						console.log(res)
						wx.showToast({
							title: res.response.data.message,
							icon: 'none',
							duration: 2000
						})
					})
				} else {
					this.$http.get("/users/").then(res => {
						if (res.status == "200") {
							this.userList = res.data.content;
						} else {
							wx.showToast({
								title: res.statusText,
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(res => {
						console.log(res)
						wx.showToast({
							title: res.response.data.message,
							icon: 'none',
							duration: 2000
						})
					})
				}

			},
			toPermission() {
				wx.navigateTo({
					url: "../../pages/permission/main",
					fail: function (res) {
						console.log(res)
					}
				})
			}
		},
		computed: {
			showList() {
				console.log(this.userList)
				return this.userList.length
			}
		},
		mounted() {
			this.$http.get("/users/").then(res => {
				if (res.status == "200") {
					this.userList = res.data.content;
				} else {
					wx.showToast({
						title: res.statusText,
						icon: 'none',
						duration: 2000
					})
				}
			}).catch(res => {
				console.log(res)
				wx.showToast({
					title: res.response.data.message,
					icon: 'none',
					duration: 2000
				})
			})
			this.$http.get("/users/roles").then((res) => {

				this.roleList = res.data;
				this.roleList.forEach(ele => {
					this.accounts.push(ele.name)
				});

			}).catch(res => {
				console.log(res)
				wx.showToast({
					title: res.response.data.message,
					icon: 'none',
					duration: 2000
				})
			})
		}
	};
</script>
<style scoped>
	.top {
		width: 100%;
		display: flex;
		background: #2E79FF;
	}

	.top div {
		width: 50%;
		text-align: center;
		height: 40px;
		color: #fff;
		font-size: 14px;
		line-height: 40px;
	}

	.content {
		background: #e4e4e4;
		padding-top: 1px;
	}

	.contentList {
		margin-top: 10px;
		width: 100%;
		height: 70px;
		background: #fff;
		padding: 20px 0;
		font-size: 14px;
		display: flex;
		justify-content: space-around;
	}

	.contentList p span:nth-child(1) {
		width: 100px;
		display: inline-block;
	}

	.contentList button {
		border: 1px solid #33CCCC;
		background: none;
		font-size: 14px;
		color: #33CCCC;
	}

	.contentList button.not {
		border: 1px solid #FF6633;
		color: #FF6633;
	}
</style>