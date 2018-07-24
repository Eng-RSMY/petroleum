<template>
	<div>
		<transition name="fade" mode="out-in">
			<div v-if="login" class="animated" :key="1">
				<div class="container">
					<div class="title">欢迎使用</div>
					<div class="subtitle">使用手机号登录</div>
					<div class="login-form">
						<div class="input-frame">
							<div class="prefix">+86</div>
							<input type="text" placeholder="手机号" v-model="phone" class="input">
						</div>
						<!-- <picker bindchange="bindPickerChange" placeholder="请选择公司" value="{{index}}" range="{{array}}"> -->
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="picker">
								{{pickSelect}}
							</view>
						</picker>
						<div class="input-title">
							<span>同意 </span>
							<checkbox value="1" checked="true" /> 《垦利石化小程序服务条款》
						</div>
						<button type="primary" size="default" @click="nextStep">提交</button>

					</div>
				</div>
			</div>
			<div v-if="!login" class="animated" :key="2">
				<div class="container" >
					<div class="title1">请输入验证码</div>
					<div class="subtitle1">验证码已发送至+86 {{phone}}</div>
					<div class="security-code-wrap">
						<label for="code">
							<ul class="security-code-container">
								<li class="field-wrap" v-for="(item, index) in number" :key="index">
									<i class="char-field">{{value[index] || placeholder}}</i>
								</li>
							</ul>
						</label>
						<input ref="input" focus="true" class="input-code" @keyup="handleInput($event)" v-model="value" id="code" name="code" type="tel" :maxlength="number"
						 autocorrect="off" autocomplete="off" autocapitalize="off">
					</div>
					<div class="time color" v-show="show" @click="reset">重新获取验证码</div>
					<div class="time" v-show="!show">{{count}}秒后可重新获取</div>
					<!-- <a href="javascript:;" class="weui_btn weui_btn_primary" @click="sureStep">确定</a> -->
					<button type="primary" size="default" @click="sureStep" class="sure">提交</button>

				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: {
			number: {
				type: Number,
				default: 6
			},
			placeholder: {
				type: String,
				default: ""
			},
		},
		data() {
			return {
				pickSelect: "公司名称请选择",
				index: 0,
				array: ['美国', '中国', '巴西', '日本'],
				phone: "",
				height: "",
				login: true,
				value: "",
				show: true,
				count: "",
				timer: null,
				mask: false,
				popup: "请输入手机号",
			};
		},

		components: {
		},

		methods: {
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
					this.reset();
				}
			},
			sureStep: function () {
				wx.switchTab({
					url: "../../pages/workbench/main",
					fail: function (res) {
						console.log(res)
					}
				})
			},
			bindPickerChange: function (e) {
				console.log('picker发送选择改变，携带值为', e)
				this.pickSelect = this.array[e.mp.detail.value]
			},
			reset: function () {
				this.show = false;
				this.timeout();
				// 获取验证码
			},
			timeout() {
				const TIME_COUNT = 60;
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
			// 唤起键盘 
			showKeyboard(){
				console.log("唤起")
				document.activeElement.focus(); // ios唤起键盘
				this.$refs.input.focus();
			},
			hideKeyboard() {
				// 输入完成隐藏键盘
				document.activeElement.blur(); // ios隐藏键盘
				this.$refs.input.blur(); // android隐藏键盘
			},
			handleSubmit() {
				this.$emit("input", this.value);
			},
			handleInput(e) {
				console.log(e)
				this.handleSubmit();
				this.$refs.input.value = this.value;
				if (this.value.length >= this.number) {
					this.hideKeyboard();
				}
				// this.handleSubmit();
			}
		},

		created() {
			
		 }
	}
</script>

<style scoped>
	.container {
		height: 100%;
		padding-top: 60px;
		background-color: #fff;
	}

	.title,
	.title1 {
		width: 100%;
		box-sizing: border-box;
		text-align: left;
		padding-left: 30px;
		color: #E2BF85;
		height: 75px;
		line-height: 75px;
		font-size: 36px;
	}

	.subtitle,
	.subtitle1 {
		width: 100%;
		box-sizing: border-box;
		text-align: left;
		padding-left: 30px;
		color: rgb(94, 92, 92);
		font-size: 14px;
		margin-bottom: 30px
	}

	.login-form {
		width: 75%;
		margin: 0 auto
	}

	.input-frame {
		border: 1px solid #8E8E8E;
		margin-bottom: 30px;
	}

	.prefix {
		display: inline-table;
		color: #000;
		height: 32px;
		line-height: 32px;
		width: 20%;
		border-right: 1px solid #8E8E8E;
		text-align: center;
		box-sizing: border-box
	}

	.input {
		display: inline-table;
		height: 32px;
		line-height: 32px;
		width: 76%;
		background-color: #fff;
		padding-left: 16px;
		box-sizing: border-box;
		color: #000;
	}

	.input-title {
		text-align: center;
		font-size: 14px;
		color: #aaa;
		margin-top: 130px;
		margin-bottom: 30px;

	}

	._checkbox {
		width: 16px;
		height: 16px;
	}

	.picker {
		display: inline-table;
		height: 32px;
		line-height: 32px;
		width: 100%;
		background-color: #fff;
		padding-left: 16px;
		box-sizing: border-box;
		color: #aaa;
		border: 1px solid #8E8E8E;
	}

	.security-code-wrap {
		overflow: hidden;
		width: 75%;
		margin: 0 auto;
	}

	.security-code-container {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
	}

	.security-code-container .field-wrap {
		text-align: center;
		list-style: none;
		display: block;
		width: 40px;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		background-color: #fff;
		margin: 2px;
		border: 1px solid #8E8E8E;
		color: #fff;

	}

	.security-code-container .field-wrap .char-field {
		font-style: normal;
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
		font-size: 16px;
		color: #E8E8E8;
		margin-top:30px;
		text-align: center;
	}
	.color {
		color: #E2BF85;
	}

	.sure {
		width: 75%;
		margin-left: 12.5%;
		margin-top:100px;
		height: 50px;
		line-height: 50px;
		background-color: #E2BF85;
		color: #fff;
		border: none;
	}
</style>