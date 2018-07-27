<template>
	<div class="container">
		<div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
			<div class="weui-cell__bd">
				<p>公司名称</p>
			</div>
			<div class="weui-cell__ft">
				<input class="input" type="text" placeholder="请输入公司名称">
			</div>
		</div>
		<div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
			<div class="weui-cell__bd">
				<p>纳税人识别号</p>
			</div>
			<div class="weui-cell__ft">
				<input class="input" type="text" placeholder="请输入纳税人识别号">
			</div>
		</div>
		<div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
			<div class="weui-cell__bd">
				<p>电话号码</p>
			</div>
			<div class="weui-cell__ft">
				<input class="input" type="text" placeholder="请输入电话号码">
			</div>
		</div>
		<div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
			<div class="weui-cell__bd">
				<p>开户行</p>
			</div>
			<div class="weui-cell__ft">
				<input class="input" type="text" placeholder="请输入开户行">
			</div>
		</div>
		<div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
			<div class="weui-cell__bd">
				<p>银行帐号</p>
			</div>
			<div class="weui-cell__ft">
				<input class="input" type="text" placeholder="请输入银行账号">
			</div>
		</div>
		<div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
			<div class="weui-cell__bd">
				<p>公司地址</p>
			</div>
			<div class="weui-cell__ft">
				<input class="input" type="text" placeholder="请输入公司地址">
			</div>
		</div>
		<button class="weui-btn weui-btn_primary button" @click="save">保存并更新</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		components: {
		},

		methods: {
			save: function (orderCode) {
				wx.navigateTo({
					url: "../../pages/order/orderInfo/main?orderCode=" + orderCode,
					fail: function (res) {
						console.log(res)
					}
				})
			}
		},

		created() { }
	}
</script>

<style scoped>
	.container {
		width: 100%;
		overflow-x: hidden;
		padding: 0px;
		background-color: #efeff4;
	}

	.weui-cell__bd {
		padding-left: 5%;
		color: #000;
		width:40%;
	}

	.weui-cell {
		background-color: #fff;
		width: 100%;
		height:50px;
		line-height: 50px;
		margin-top: 10px;
		font-size: 14px;
	}

	.weui-cell__ft {
		padding-right: 27px
	}
	.button{
		position: fixed;
		bottom:20px;
		left:5%;
		width:90%;
	}
</style>