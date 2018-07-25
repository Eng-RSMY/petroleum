<template>
	<div class="container">
		<div class="top">
			<p>公司名称：山东xxxxx化学品运输公司</p>
			<div class="weui-flex top_maddle">
				<div class="weui-flex__item">
					<div class="placeholder">52134</div>
					<div class="placeholder1">账户余额</div>
				</div>
				<div class="weui-flex__item">
					<div class="placeholder">46789</div>
					<div class="placeholder1">已下单</div>

				</div>
				<div class="weui-flex__item">
					<div class="placeholder">4561</div>
					<div class="placeholder1">可用金额</div>

				</div>
			</div>
		</div>
		
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

		},

		created() { }
	}
</script>

<style scoped>
	.container {
		width:100%;
		padding: 0px;
		background-color: #efeff4;
		overflow-x:hidden;
	}
	.weui-cell__bd {
		margin-left: 10px;
	}
	.weui-cell {
		background-color: #fff;
	}
	.top {
		background-color: #fff;
		height: 150px;
		color: #4a4a4a;
		width: 100%;
	}
	.top p {
		text-align: center;
		font-size: 16px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.weui-flex__item {
		text-align: center;
		font-size: 22px;
		color: #2E79FF;
	}
	.placeholder1 {
		font-size: 14px;
		margin-top: 10px;
	}
</style>