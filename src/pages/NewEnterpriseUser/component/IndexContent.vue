<template>
	<div>
		<div class="content">
			<div class="from">
				<div class="input-list">
					<span>用户名</span>
					<span><input type="text" placeholder="请输入用户名" v-model="newUserName"></span>
				</div>
				<div class="input-list">
					<span>绑定手机号</span>
					<span><input type="text" placeholder="请输入手机号" v-model="newUserPhone"></span>
				</div>
				<div class="input-list">
					<span>用户真实姓名</span>
					<span><input type="text" placeholder="请输入用户真实姓名" v-model="newRealName"></span>
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
				<div class="input-list">
					<span>用激活账户</span>
					<span>
						<view>
							<view>
								<view>
									<switch :checked="checked" @change="handleSwitch($event)" />
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
								<textarea class="" placeholder="请输入备注信息" v-model="newRemark" />
							</view>
						</view>
					</view>
				</div>
			</div>
		</div>
		<button class="weui-btn weui-btn_primary button" @click="update">保存并更新</button>
	</div>
</template>

<script>
	export default {
		name: "IndexTitle",
		data() {
			return {
				accounts: [],
				accountIndex: 0,
				newUserName: '',
				newUserPhone: '',
				newRealName: '',
				newRemark: '',
				checked: false
			}
		},
		methods: {
			bindAccountChange: function (e) {
				this.accountIndex = e.mp.detail.value
			},
			history: function () {
				wx.switchTab({
					url: "../../pages/workbench/main",
					fail: function (res) {
					}
				})
			},
			handleSwitch(e) {
				this.checked = e.mp.detail.value;
			},
			prompt(title) {
				wx.showToast({
					title: title,
					icon: 'none',
					duration: 2000
				})
			},
			update: function () {
				switch (this.accounts[this.accountIndex]) {
					case '业务员':
						var roleid = 2;
						break;
					case '司机':
						var roleid = 3;
						break;
					case '押运员':
						var roleid = 4;
						break;
					case '财务':
						var roleid = 5;
						break;
				}
				this.$http.post(`/users`, {
					username: this.newUserName,
					phone: this.newUserPhone,
					realName: this.newUserName,
					remark: this.newRemark,
					roleId: roleid,
					enabled: this.checked
				}).then(res => {
					this.prompt('新建成功');
					setTimeout(() => {
						wx.switchTab({
							url: "../../pages/workbench/main",
							fail: function (res) {
							}
						})
					}, 1000)
				}).catch((res) => {
					var str = res.response.data.message;
					str = str.replace("[", "");
					str = str.replace("]", "");
					str = str.split(" ")
					this.prompt(str[0])
				})
			}
		},
		beforeMount() {
			// 获取角色
			this.$http.get("/users/roles").then((res) => {
				if (res.status == "200") {
					for (let item of res.data) {
						this.accounts.push(item.name);
					};
				} else {
					wx.showToast({
						title: res.statusText,
						icon: 'none',
						duration: 2000
					})
				}
			})
		},
	};
</script>

<style scoped>
	.content {
		background: #e7e7e7;
	}

	.from {}

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