<template>
	<div>
		<transition name="fade" mode="out-in">
			<div v-if="login" class="animated" :key="1">
				<div class="container">
					<div class="title">欢迎使用</div>
					<div class="login-form">
						<div class="subtitle">使用手机号登录</div>
						<div class="input-frame">
							<span class="prefix">+86</span>
							<input type="number" placeholder="手机号" v-model="phone" class="input1" @change="inputFinish">
						</div>
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="picker">
								{{pickSelect }}
							</view>
						</picker>
						<div class="checkbox" v-if="select" @click="isselect">
							<img class="img" src="/static/images/selected.png" alt="" align="middle">
							<span class="span">记住公司名称</span>
						</div>
						<div class="checkbox" v-else @click="isselect">
							<img class="img" src="/static/images/select.png" alt="" align="middle">
							<span class="span">记住公司名称</span>
						</div>
						<div class="input-title" v-if="select1" @click="isselect1">
							<img class="img" src="/static/images/selected.png" alt="" align="middle">
							<span class="span"> 同意《垦利石化小程序服务条款》</span>
						</div>
						<div class="input-title" v-else @click="isselect1">
							<img class="img" src="/static/images/select.png" alt="" align="middle">
							<span class="span"> 同意《垦利石化小程序服务条款》</span>
						</div>
						<!-- <button type="primary" size="default" style="height: 50px;background-color: #f1f1f1;height: 40px;line-height: 40px" v-if="isEnty">下一步</button> -->
						<button type="primary" size="default" @click="nextStep" style="height: 50px;background-color: #2E79FF;height: 40px;line-height: 40px" >下一步</button>

					</div>
				</div>
			</div>
			<div v-if="!login" class="animated" :key="2">
				<div class="container">
					<div class="title1">短信已发送至{{phone}}</div>

					<div class="subtitle1">请输入验证码</div>
					<view class="code">
						<view class="input-content-wrap">
							<view @click="set_Focus" class="input-code-wrap">
								<view :class="length==1||length==0?'input':'input_none'">
									<text>{{code[0]}}</text>
								</view>
								<view :class="length==2?'input':'input_none'">
									<text>{{code[1]}}</text>
								</view>
								<view :class="length==3?'input':'input_none'">
									<text>{{code[2]}}</text>
								</view>
								<view :class="length==4?'input':'input_none'">
									<text>{{code[3]}}</text>
								</view>
								<view :class="length==5?'input':'input_none'">
									<text>{{code[4]}}</text>
								</view>
								<view :class="length==6?'input':'input_none'">
									<text>{{code[5]}}</text>
								</view>
							</view>
						</view>
						<input @input="get_code" class="input-content" type="number" :focus="code_isFocus" maxlength="6" />
					</view>
					<div class="time color" v-show="show" @click="reset">重新获取验证码</div>
					<div class="time" v-show="!show">重新发送短信({{count}}秒)</div>
					<button type="primary" size="default" @click="sureStep" class="sure">登录</button>

				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import cookies from 'weapp-cookie'
	export default {
		data() {
			return {
				select: true,
				select1: true,
				isEnty: true,
				pickSelect: "公司名称请选择",
				index: 0,
				array: [],
				array1: null,
				phone: "",
				height: "",
				login: true,
				value: "",
				show: true,
				count: "",
				timer: null,
				mask: false,
				popup: "请输入手机号",
				phoneNumber: "",
				code: null,
				code_isFocus: true,//控制input 聚焦
				code: [],
				focus_status: [],
				length: 0,//已经输入的长度
				company:""
			};
		},

		components: {
		},
		watch: {
			isEnty: function (val) {
				cpnsole.log(val)
				if (this.phone != "" && this.pickSelect != "公司请选择" && this.select == true && this.select1 == true) {
					this.isEnty = false
				}
			}
		},
		methods: {
			inputFinish: function (val) {
				console.log(val)
				var phone = val.target.value
				var params={
					phone,
				}
				this.$http.get(`/public/companies`,params).then(res => {
					console.log(res)
					for (let item of res.data) {
						this.array.push(item.name)
					}
					this.array1 = res.data;
				}).catch(res => {
					console.log(res)
					// .response.data.message
					wx.showToast({
						title: res.response.data.message,
						icon: 'none',
						duration: 2000
					})
				})
			},
			isselect: function () {
				this.select == true ? this.select = false : this.select = true;
			},
			isselect1: function () {
				this.select1 == true ? this.select1 = false : this.select1 = true;
			},
			bindPickerChange: function (e) {
				console.log(e)
				this.company=this.array1[e.mp.detail.value]
				this.pickSelect = this.array[e.mp.detail.value];
			},
			getCode() {
				var params = {
					mobile: this.phone,
				}
				this.$http.post("/public/login_code", params).then(res => {
					console.log(res)
					wx.showToast({
						title: "验证码发送成功",
						icon: 'none',
						duration: 2000
					})
				}).catch(res => {
					console.log(res)
					// .response.data.message
					wx.showToast({
						title: res.response.data.message,
						icon: 'none',
						duration: 2000
					})
				})
			},
			nextStep: function () {
				let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (this.phone == "") {
					wx.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 1000
					})
				} else if (!reg.test(this.phone) || this.phone.length < 11) {
					wx.showToast({
						title: '请输入正确的11位手机号',
						icon: 'none',
						duration: 1000
					})
				} else {
					this.login = false;
					this.timeout();
					this.getCode()
				}
			},
			sureStep: function () {
				var params = {
					grant_type: "mobile",
					username: this.phone,
					password: this.code,
					company:this.company.id
				}
				this.$http.post("/oauth/token", params)
					.then(res => {
						console.log(res)
						wx.setStorageSync('access_token', res.data.access_token)
						wx.setStorageSync('token_type',res.data.token_type)
						wx.setStorageSync('refresh_token',res.data.refresh_token)
						// cookies.set("access_token",res.data.access_token)
						// cookies.set("token_type",res.data.token_type)
						wx.switchTab({
							url: "../../pages/workbench/main",
							fail: function (res) {
								console.log(res)
							}
						})
					})
					.catch(res => {
						console.log(res)
						// .response.data.message
						wx.showToast({
							title: res.response.data.message,
							icon: 'none',
							duration: 2000
						})
					})

			},
			reset: function () {
				this.show = false;
				this.timeout();
				// 获取验证码
				this.getCode()
			},
			timeout() {
				const TIME_COUNT = 90;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000);
				}
			},
			get_code: function (e) {
				console.log(e)
				var that = this;
				that.code = e.mp.detail.value
				if (that.code.length == 0) {
					that.focus_status = "100000"

				}
				if (that.code.length == 1) {
					that.length = e.mp.detail.value.length,
						that.focus_status = "010000"

				}
				if (that.code.length == 2) {
					that.length = e.mp.detail.value.length,
						that.focus_status = "001000"
				}
				if (that.code.length == 3) {
					that.length = e.mp.detail.value.length,
						that.focus_status = "000100"
				}
				if (that.code.length == 4) {
					that.length = e.mp.detail.value.length,
						that.focus_status = "00010"
				}
				if (that.code.length == 5) {
					that.length = e.mp.detail.value.length,
						that.focus_status = "00001"

				}
				if (that.code.length == 6) {
					that.length = e.mp.detail.value.length,
						console.log(that.code)
						this.code_isFocus = false


				}
			},
			set_Focus() { //聚焦input
				this.code_isFocus = true

			},

		},

		mounted() {
			
		}
	}
</script>

<style scoped>
	.container {
		height: 100%;
		padding-top: 20px;
		background-color: #fff;
	}

	.title,
	.title1 {
		width: 100%;
		box-sizing: border-box;
		text-align: left;
		padding-left: 30px;
		color: #000;
		height: 75px;
		line-height: 75px;
		font-size: 36px;
		margin-bottom: 20px;
	}

	.title1 {
		font-size: 24px;
	}

	.subtitle,
	.subtitle1 {
		width: 100%;
		box-sizing: border-box;
		text-align: left;
		color: #565656;
		font-size: 16px;
		margin-bottom: 10px
	}

	.subtitle1 {
		padding-left: 30px;
	}

	.login-form {
		width: 84%;
		margin: 0 auto
	}

	.input-frame {
		border: 1px solid #4a4a4a;
		margin-bottom: 25px;
	}

	.checkbox {
		font-size: 14px;
		color: #2E79FF;
		margin: 15px 0px 30px 0px;
	}

	.prefix {
		display: inline-block;
		color: #4a4a4a;
		height: 45px;
		line-height: 45px;
		width: 20%;
		border-right: 1px solid #4a4a4a;
		text-align: center;
		box-sizing: border-box;
		vertical-align: middle
	}

	.input1 {
		display: inline-block;
		height: 45px;
		line-height: 45px;
		width: 76%;
		background-color: #fff;
		padding-left: 16px;
		box-sizing: border-box;
		color: #565656;
		vertical-align: middle
	}

	.input-title {
		text-align: center;
		font-size: 14px;
		color: #4a4a4a;
		margin-top: 130px;
		margin-bottom: 30px;

	}


	.picker {
		display: inline-block;
		height: 45px;
		line-height: 45px;
		width: 100%;
		background-color: #fff;
		padding-left: 16px;
		box-sizing: border-box;
		color: #565656;
		border: 1px solid #4a4a4a;
	}

	.input-code {
		position: absolute;
		left: 0px;
		top: 0px;
		width: 0;
		height: 0;
		opacity: 0;
		overflow: visible;
		z-index: -1;
	}

	.index-nav-bar {
		display: none;
	}

	.time {
		width: 84%;
		font-size: 14px;
		color: #898989;
		text-align: left;
	}

	.color {
		color: #2E79FF;
	}

	.sure {
		width: 84%;
		margin-top: 100px;
		height: 40px;
		line-height: 40px;
		background-color: #2E79FF;
		color: #fff;
		border: none;
	}

	page .code .input-content-wrap .input-code-wrap {
		display: flex;
		align-items: center;
		justify-content: center1;
		height: 150rpx;
	}

	page .code .input-content-wrap .input-code-wrap .code_dot {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #000;
		background-color: #fff;
		box-sizing: border-box;
		width: 124rpx;
		height: 150rpx;
		border: #dfdfdf solid 1rpx;
		border-left: none 0;
		font-size: 60rpx;
	}

	page .code .input-content-wrap .input-code-wrap .code_dot:nth-child(1) {
		border-left: 2rpx solid #ddd;
	}

	page .code .input-content-wrap .input-code-wrap .code_dot i {
		/* background: #000; */
		border-radius: 50%;
		width: 20rpx;
		height: 20rpx;
		display: flex;
		align-items: center;
	}

	page .code .input-content {
		position: absolute;
		opacity: 0;
		left: -100%;
		top: 600rpx;
		background: #f56;
		z-index: -999;
		text-align: center;
	}

	page .code .input-content.active {
		z-index: -99;
	}

	.input {
		height: 40px;
		width: 40px;
		flex: 1;
		background-color: #fff;
		color: #262626;
		font-size: 48rpx;
		margin: 0 10rpx 0 10rpx;
		border: 1rpx #4287ff solid;
		position: relative;
		box-sizing: border-box
	}

	.input_none {
		height: 40px;
		width: 40px;
		flex: 1;
		background-color: #fff;
		color: #262626;
		font-size: 48rpx;
		margin: 0 10rpx 0 10rpx;
		border: 1rpx #dfdfdf solid;
		position: relative;
		box-sizing: border-box
	}

	.input text {
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.input_none text {
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.img {
		width: 16px;
		height: 16px;
		display: inline-block;
		margin-right: 5px;
		vertical-align: middle
	}

	.span {
		display: inline-block;
		height: 100%;
		line-height: 16px;
	}
</style>