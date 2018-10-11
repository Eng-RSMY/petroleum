<template>
	<div>
		<div class="content">
			<div class="from">
				<div class="input-list">
					<span>绑定手机号</span>
					<span><input type="number" :placeholder="user.phone" maxlength="11" @change="panduan" v-model="newUserPhone"></span>
				</div>
				<div class="input-list">
					<span>用户真实姓名</span>
					<span><input type="text" :placeholder="user.realName" maxlength="8" v-model="newRealName"></span>
				</div>
				<div class="input-list">
					<span>设置用户角色</span>
					<span>
						<picker @change="bindAccountChange($event)" :value="accountIndex" :range="accounts">
							<view class="picker">
								{{pickSelect}}
							</view>
						</picker>
					</span>
				</div>
				<div class="input-list" v-if="isDriver">
					<span>司机身份证</span>
					<span><input type="idcard" :placeholder="user.idNumber" maxlength="18" minlength="18" @change="wancheng" v-model="idNumber"></span>
				</div>
				<div class="input-list" v-if="isDriver">
					<span>司机驾驶证号</span>
					<span><input type="idcard" :placeholder="user.driverNumber" maxlength="18" @change="wancheng" v-model="driverNumber"></span>
				</div>
				<div class="input-list">
					<span> 激活用户账户</span>
					<span>
						<view>
							<view>
								<view>
									<switch :checked="checked" @change="switch1Change" />
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
		<div class="footer" @click="save">
			<span style="font-size:16px">保存并更新</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		data() {
			return {
				user: '',
				roles: '',
				flag: false,
				address: '',
				disabled: true,
				accounts: [],
				accounts1: [],
				pickSelect: "请选择",
				accountIndex: 0,
				newUserPhone: '',
				newRealName: '',
				newRemark: '',
				checked: true,
				idNumber: "",
				driverNumber: "",
				isDriver: false,
				roleList: [],
			}
		},
		methods: {
			bindAccountChange: function (e) {
				this.accountIndex = e.mp.detail.value;
				this.pickSelect = this.accounts[e.mp.detail.value];
				if (this.pickSelect == "司机"||this.pickSelect == "押运员") {
					this.isDriver = true;
				} else {
					this.isDriver = false
				}
			},
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.mp.detail.value)
				this.checked = e.mp.detail.value
			},
			wancheng: function (val) {
				console.log(val)
				this.driverNumber = val.target.value
				if (val.target.value.length != 18) {
					wx.showToast({
						title: '请输入正确的18位证件号',
						icon: 'none',
						duration: 1000
					})
				}
			},
			panduan: function (val) {
				let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (val.target.value == "") {
					wx.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 1000
					})
				} else if (!reg.test(val.target.value) || val.target.value.length < 11) {
					wx.showToast({
						title: '请输入正确的11位手机号',
						icon: 'none',
						duration: 1000
					})
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
				console.log(this.accountIndex)
				console.log(this.roles)
				this.$http.post(`/users/${this.$root.$mp.query.id}`, {
					phone: this.newUserPhone || this.user.phone,
					realName: this.newRealName || this.user.realName,
					remark: this.newRemark || this.user.remark,
					enabled: this.checked,
					driverNumber: this.driverNumber || this.user.driverNumber,
					idNumber: this.idNumber || this.user.idNumber,
					roleId: this.roles[this.accountIndex].id
				}).then(res => {
					if (res.status == "200") {
						this.user = res.data;
						this.flag = true;
						wx.showToast({
							title: "修改成功",
							icon: 'none',
							duration: 2000,
							success: function () {
								wx.navigateBack({
									delta: 1
								})
							}
						})
						// pages/userManagement/main

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
		async onShow() {
			wx.showLoading({
				title: "加载中...",
				mask: true
			})
      Object.assign(this.$data, this.$options.data())
			var address = this.$root.$mp.query.address;
			try{
			  let userInfo=await this.$http.get(`/users/${this.$root.$mp.query.id}`)
			  let roles=await this.$http.get(`/users/roles`)
        if(roles.status == "200"&&userInfo.status=="200") {
          this.user = userInfo.data;
          this.address = address;
          this.flag = true;
          this.checked = userInfo.data.enabled;

          this.roles = roles.data;
          this.accounts = []
          roles.data.forEach((element, key) => {
            this.accounts.push(element.name)
            console.log(element.name == this.user.roleName, element.name)
            if (element.name == this.user.roleName) {
              this.accountIndex = key
            }
          });
          this.pickSelect = this.user.roleName
          if (this.pickSelect == "司机" || this.pickSelect == "押运员") {
            this.isDriver = true
          }
          console.log(this.pickSelect)
        }
      }catch (e) {
			  console.log(e)
        wx.showToast({
          title: "获取用户信息失败",
          icon: 'none',
          duration: 2000
        })
      }
			wx.hideLoading();
		}
	};
</script>
<style scoped>
	.content {
		background: #e7e7e7;
	}

	input {
		text-align: right;
	}

	.picker {
		margin-right: 20px
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

	.footer {
		width: 375px;
		height: 50px;
		line-height: 50px;
		position: fixed;
		bottom: 0;

		text-align: center;
		color: #2E79FF;
		background: #fff;
		align-self: flex-end;
	}
</style>
