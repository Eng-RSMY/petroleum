<template>
	<div style="width:100%;overflow-x:hidden">
		<div class="content">
			<div class="from">
				<div class="input-list">
					<span>绑定手机号</span>
					<span><input type="number" maxlength="11" placeholder="请输入手机号" @change="panduan" v-model="newUserPhone"></span>
				</div>
				<div class="input-list">
					<span>用户真实姓名</span>
					<span><input type="text" placeholder="请输入用户真实姓名" maxlength="8" v-model="newRealName"></span>
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
					<span>{{accounts[accountIndex]}}身份证</span>
					<span><input type="idcard" :placeholder="'请输入'+accounts[accountIndex]+'身份证号'" @change="wancheng" v-model="idNumber"></span>
				</div>
				<div class="input-list" v-if="isDriver">
					<span>{{accounts[accountIndex]}}驾驶证号</span>
					<span><input type="idcard" :placeholder="'请输入'+accounts[accountIndex]+'驾驶证号'" @change="wancheng" v-model="driverNumber"></span>
				</div>
				<div class="input-list">
					<span> 激活用户账户</span>
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
		<div class="footer" @click="update">
			<span style="font-size:32rpx">保存</span>
		</div>
		<!-- <button class="weui-btn weui-btn_primary button" @click="update">保存并更新</button> -->
	</div>
</template>

<script>
	export default {
		name: "IndexTitle",
		data() {
			return {
				accounts: [],
				accountIndex: 0,
				newUserPhone: '',
				newRealName: '',
				newRemark: '',
				checked: true,
				roleList: [],
				idNumber: "",
				driverNumber: "",
				isDriver: false
			}
		},
		methods: {
			bindAccountChange: function (e) {
        if(e){
          this.accountIndex = e.mp.detail.value;
        }
				if (this.roleList[this.accountIndex].name == "司机" || this.roleList[this.accountIndex].name == "押运员") {
					this.isDriver = true;
				} else {
					this.isDriver = false
				}
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
				var roleid = this.roleList[this.accountIndex].id;
				var params = {
					phone: this.newUserPhone,
					realName: this.newRealName,
					remark: this.newRemark,
					roleId: roleid,
					enabled: this.checked,
				}
				if (this.roleList[this.accountIndex].name == "司机" ||
          this.roleList[this.accountIndex].name == "押运员") {
					params.idNumber = this.idNumber;
					params.driverNumber = this.driverNumber
				}
				this.$http.post(`/users`, params).then(res => {
					this.prompt('新建成功');
					Object.assign(this.$data, this.$options.data())
          if(this.$root.$mp.query.from==="selectDriver"){
            wx.navigateBack()
          }else{
					setTimeout(() => {
						wx.switchTab({
							url: "../../pages/workbench/main",
							fail: function (res) {
							}
						})
					}, 1000)
          }
				}).catch((res) => {
					var str = res.response.data.message;
					str = str.replace("[", "");
					str = str.replace("]", "");
					str = str.split(" ")
					this.prompt(str[0])
				})
			}
		},
		onShow() {
//			Object.assign(this.$data, this.$options.data())
			// 获取角色
			console.log("我展示了")
			this.$http.get("/users/roles").then((res) => {
        let rolesMap={}
				this.roleList = res.data;
				if(res.data){
          res.data.forEach((ele,index)=>{
            this.accounts.push(ele.name)
            rolesMap[ele.name]=index
          })
        }
        if(this.$root.$mp.query.from==="selectDriver"){
          this.accountIndex=rolesMap['司机'];
          this.bindAccountChange()
        }

			}).catch(res => {
				wx.showToast({
					title: res.response.data.message,
					icon: 'none',
					duration: 2000
				})
			})
		},
	};
</script>

<style scoped>
	.content {
		background: #e7e7e7;
	}

	input {
		text-align: right;
		width: 100%;
	}

	.input-list {
		display: flex;
		font-size: 30rpx;
		padding: 10px;
		margin-top: 10px;
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
		margin-top: 10px;
	}

	.remarks-title {
		font-size: 30rpx;
	}

	.remarks textarea {
		background: #e7e7e7;
		width: 100%;
		font-size: 28rpx;
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
