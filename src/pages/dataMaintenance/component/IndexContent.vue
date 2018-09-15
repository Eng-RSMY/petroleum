<template>
	<div>
		<div class="content">
			<div class="from">
				<div class="input-list">
					<span>公司名称</span>
					<span><input type="text" class="input" disabled="true" @change="name" :value="company.name"></span>
				</div>
				<div class="input-list">
					<span>公司联系人</span>
					<span><input type="text" class="input" maxlength="8" @change="contact" :value="company.contact"></span>
				</div>
				<div class="input-list">
					<span>联系人电话</span>
					<span><input type="number" class="input" @change="panduan" maxlength="11" :value="company.phone"></span>
				</div>
				<div class="remarks">
					<view class="remarks-title">公司地址</view>
					<view class="">
						<view class="">
							<view class="">
								<textarea class="" :placeholder="company.address" :value="address" @change="address" />
							</view>
						</view>
					</view>
				</div>
			</div>
		</div>
		<div class="footer" @click="update">
			<span>保存并更新</span>
		</div>

	</div>
</template>

<script>
	export default {
		name: "IndexTitle",
		data() {
			return {
				accountIndex: 0,
				company: {
					name: '',
					contact: '',
					phone: '',
					address: ''
				},

			}
		},
		methods: {
			bindAccountChange: function (e) {
				this.accountIndex = e.mp.detail.value
			},
			name: function (val) {
				this.company.name = val.target.value
			},
			contact: function (val) {
				this.company.contact = val.target.value
			},
			address: function (val) {
				this.company.address = val.target.value
			},
			history: function () {
				wx.switchTab({
					url: "../../pages/workbench/main",
					fail: function (res) {
					}
				})
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
				} else {
					this.company.phone = val.target.value
				}
			},
			prompt: function prompt(title) {
				wx.showToast({
					title: title,
					icon: 'none',
					duration: 2000
				});
			},
			update: function () {
				let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (this.company.phone == "") {
					wx.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 1000
					})
				} else if (!reg.test(this.company.phone) || this.company.phone.length < 11) {
					wx.showToast({
						title: '请输入正确的11位手机号',
						icon: 'none',
						duration: 1000
					})
				} else {
					this.$http.post(`/company`, this.company).then(res => {
						this.prompt('更新成功');
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

			}
		},
		mounted() {
			this.$http.get('company').then((res) => {
				this.company = res.data
			})
		}
	};
</script>

<style scoped>
	.content {
		background: #e7e7e7;
	}

	.input {
		text-align: right
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
		margin-top: 10px;
	}

	.remarks-title {
		font-size: 15px;
		margin-bottom: 10px
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
		width: 100%;
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