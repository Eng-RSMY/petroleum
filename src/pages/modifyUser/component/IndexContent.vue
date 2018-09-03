<template>
	<div>
		<div class="content">
			<div class="from">
				<div class="input-list">
					<span>用户名</span>
					<span><input type="text" :placeholder="user.username" v-model="newUserName" :disabled="disabled"></span>
				</div>
				<div class="input-list">
					<span>绑定手机号</span>
					<span><input type="number" :placeholder="user.phone" maxlength="11" v-model="newUserPhone"></span>
				</div>
				<div class="input-list">
					<span>用户真实姓名</span>
					<span><input type="text" :placeholder="user.realName" v-model="newRealName"></span>
				</div>
				<div class="input-list-select input-list">
					<span>设置用户角色</span>
					<span>
						<view class="weui-cell weui-cell_select">
							<view class="weui-cell__bd">
								<picker @change="bindAccountChange($event)" :value="accountIndex" :range="accounts">
									<view class="weui-select">{{accounts[accountIndex]}}</view>
								</picker>
							</view>
						</view>
					</span>
				</div>
				<div class="input-list" v-if="isDriver">
					<span>司机身份证</span>
					<span><input type="idcard" :placeholder="user.idNumber" maxlength="18" minlength="18" v-model="idNumber"></span>
				</div>
				<div class="input-list" v-if="isDriver">
					<span>司机驾驶证号</span>
					<span><input type="text" :placeholder="user.driverNumber" maxlength="12" v-model="driverNumber"></span>
				</div>
				<div class="input-list">
					<span>用激活账户</span>
					<span>
						<view>
							<view>
								<view>
									<switch :checked="checked" />
								</view>
							</view>
						</view>
					</span>
				</div>
				<div class="remarks">
					<view class="remarks-title">备注信息</view>
					<view class="">
						<view class="">
							<view class="">
								<textarea class="" :placeholder="user.remark ? user.remark : '请输入备注信息'" v-model="newRemark" />
							</view>
						</view>
					</view>
				</div>
			</div>
		</div>
		<button class="weui-btn weui-btn_primary button" @click="save">保存并更新</button>
	</div>
</template>

<script>
	export default {
		name: "IndexTitle",
		props: ['user', 'address'],
		data() {
			return {
				disabled: true,
				accounts: [],
				accounts1: [],
				accountIndex: 0,
				newUserName: '',
				newUserPhone: '',
				newRealName: '',
				newRemark: '',
				checked: '',
				idNumber:"",
				driverNumber:"",
				isDriver:false,
				roleList:[],
				
			}
		},
		computed: {
		},
		methods: {
			bindAccountChange: function (e) {
				this.accountIndex = e.mp.detail.value;
				if(this.roleList[e.mp.detail.value].name == "司机"){
					this.isDriver=true;
				}else{
					this.isDriver=false
				}
			},
			history: function () {
				console.log(this.address)
				if (this.address == "addDriver") {
					wx.navigateTo({
						url: "../../pages/selectDriver/main",
						fail: function (res) {
							console.log(res)
						}
					})
				} else if (this.address == "addEscort") {
					wx.navigateTo({
						url: "../../pages/selectEscort/main",
						fail: function (res) {
							console.log(res)
						}
					})
				} else {
					wx.navigateTo({
						url: "../../pages/userManagement/main",
						fail: function (res) {
							console.log(res)
						}
					})
				}
			},
			save: function () {
				this.$http.post(`/users/${this.$root.$mp.query.id}`, {
					username: this.newUserName || this.user.username,
					phone: this.newUserPhone || this.user.phone,
					realName: this.newRealName || this.user.realName,
					remark: this.newRemark || this.user.remark,
					roleId: this.accounts1[this.accountIndex].id || this.$root.$mp.query.id
				}).then(res => {
					if (res.status == "200") {
						this.user = res.data;
						this.flag = true;
						wx.showToast({
							title: "修改成功",
							icon: 'none',
							duration: 2000,
						})
						// pages/userManagement/main
						wx.switchTab({
							url: "../../pages/userManagement/main",
							fail: function (res) {
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
						wx.showToast({
							title: res.response.data.message,
							icon: 'none',
							duration: 2000
						})
					})
			}
		},
		mounted() {
			if (this.user.enabled) {
				this.checked = true
			} else {
				this.checked = false
			}
			// 获取角色
			this.$http.get("/users/roles").then((res) => {
				if (res.status == "200") {
					this.roleList = res.data;
					for (let item of res.data) {
						this.accounts.push(item.name)
					}
					this.accounts1 = res.data;
				} else {
					wx.showToast({
						title: res.statusText,
						icon: 'none',
						duration: 2000
					})
				}
			})
		},
		onShow() {
			console.log(this.user)
			this.accountIndex=this.accounts.indexOf(this.user.roleName)
			this.user.roleName == "司机" ? this.isDriver=true : this.isDriver=false
			console.log(this.accountIndex)
		}
	};
</script>

<style scoped>
	.content {
		background: #e7e7e7;
	}

	.input-list {
		display: flex;
		font-size: 15px;
		padding: 10px;
		margin-top: 10px;
		background: red;
		background: #fff;
		justify-content: space-between;
	}

	.input-list-select {
		height: 45px;
		line-height: 45px;
	}

	.remarks {
		background: #fff;
		padding: 10px;
	}

	.remarks-title {
		font-size: 14px;
	}

	.remarks textarea {
		background: #e7e7e7;
		width: 100%;
		font-size: 14px;
		padding: 20px 0;
		height: 30px;
		text-indent: .1rem;
	}

	.button {
		position: fixed;
		bottom: 20px;
		left: 5%;
		width: 90%;
	}
</style>