<template>
	<div class="bbody">
		<div class="body-inner">
			<div class="weui-cell" style="position: relative;" @click="call">
				<div class="weui-cell__bd">
					<p>垦利1号客服电话</p>
				</div>
				<div class="weui-cell__ft">
					<p>15666440735</p>
				</div>
			</div>
			<!-- <div class="row">

				<div class="row-left">
					<p>垦利1号客服电话</p>
					<p>400-010-0302</p>
				</div>
				<div class="row-right">
					<img src="" alt="" />
				</div>
			 </div> -->

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			call: function () {
				wx.makePhoneCall({
					phoneNumber: '15666440735' //仅为示例，并非真实的电话号码
				})
			}
		},
		mounted() {

		}
	}
</script>
<style scoped>
	.bbody {
		width: 100%;
		height: 100%;
		position: absolute;

	}

	.weui-cell {
		background-color: #fff;
		margin-top: 10px
	}


	.row {
		width: 100%;
		height: 20%;
		padding-bottom: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #B5B5B5;
		font-size: 16px;
	}

	.row-left {
		line-height: 2;
	}

	.row-right img {
		width: 30px;
		height: 30px;
	}
</style>