<template>
	<div>
		<div class="content">
			<div class="from">
				<div class="input-list">
					<span>公司名称</span>
					<span><input type="text" class="input" readonly :placeholder="company.name" v-model="company.name"></span>
				</div>
				<div class="input-list">
					<span>公司联系人</span>
					<span><input type="text" class="input" :placeholder="company.contact" v-model="company.contact"></span>
				</div>
				<div class="input-list">
					<span>联系人电话</span>
					<span><input type="number" class="input"  @change="panduan" :placeholder="company.phone" v-model="company.phone"></span>
				</div>
				<div class="remarks">
					<view class="remarks-title">公司地址</view>
					<view class="">
						<view class="">
							<view class="">
								<textarea class="" :placeholder="company.address" v-model="address" />
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
				company: '',
				name: '',
				contact: '',
				phone: '',
				address: ''
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
			panduan:function(val){
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
			prompt: function prompt(title) {
				wx.showToast({
					title: title,
					icon: 'none',
					duration: 2000
				});
			},
			update: function () {
				this.$http.post(`/company`, {
					name: this.name || this.company.name,
					contact: this.contact || this.company.name,
					phone: this.phone || this.company.phone,
					address: this.address || this.company.address,
				}).then(res => {
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
		},
		beforeMount() {
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
		font-size: 14px;
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