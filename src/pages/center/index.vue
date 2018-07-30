<template>
	<!-- <div class="container">
		This is a center
	</div> -->
	<div class="container">
		<div class="bbody">
			<div class="header">
				<div class="tuoxiang">
					<div class="touxiang-inner">
						<img src="/static/images/car.png" mode="aspectFill" />
					</div>
				</div>
				<div class="header-words">
					<div class="h-w-inner">
						<p class="h-w-name">某某某</p>
						<p>山东石化石油运输公司</p>
						<p>企业管理员</p>
					</div>
				</div>
			</div>
			<div class="account">
				<div class="a-left">
					<img src="/static/images/zh.png" />
					<span>账号角色</span>
				</div>
				<div class="a-right">
					<span>企业管理员</span>
					<img src="/static/images/more.png" />
				</div>
			</div>
			<div class="account">
				<div class="a-left">
					<img src="/static/images/bdzh.png" />
					<span>绑定手机号</span>
				</div>
				<div class="a-right">
					<span>150****0000</span>
					<img src="/static/images/more.png" />
				</div>
			</div>
			<div class="footer">
				退出登录
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

		created() {
			this.$http.get("/mine")
				.then(res => {
					console.log(res)
				})
		}
	}
</script>

<style scoped>
	.container {
		padding: 0;
		background: #efeff4;
	}
	.bbody {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;
		/* justify-content: space-between; */
		align-items: center;
		box-sizing: border-box;
		background: #efeff4;
		font-size: 14px;
	}
	.header {
		width: 100%;
		height: 120px;
		background: #fff;
	}
	.tuoxiang {
		width: 30%;
		height: 100%;
		display: flex;
		align-items: center;
		float: left;
	}
	.touxiang-inner {
		width:70px;
		height: 70px;
		margin: 0 auto;
		border-radius: 50px;
		overflow: hidden;
	}
	.tuoxiang img {
		width: 70px;
		height: 70px;
	}
	.header-words {
		width: 70%;
		height: 100%;
		float: left;
		display: flex;
		align-items: center;
		/* flex-direction: column; */
	}
	.h-w-inner {
		height: auto;
	}
	.h-w-name {
		font-size: 17px;
	}
	.account {
		width: 100%;
		height: 50px;
		line-height: 50px;
		margin: 10px 0 0 0;
		display: flex;
		justify-content: space-between;
		background: #fff;
	}
	.account img {

	}
	.a-left {
		position: relative;
		margin: 0 0 0 8%;
	}
	.a-left span {
		margin: 0 0 0 10px;
	}
	.a-left img {
		width: 15px;
		height: 20px;
	}
	.a-right {
		position: relative;
		margin: 0 8% 0 0;
	}
	.a-right span {
		margin: 0 10px 0 0;
	}
	.a-right img {
		width: 7.2px;
		height: 12px;
	}
	.footer {
		width: 100%;
		/* height: 45px; */
		line-height: 50px;
		position: fixed;
		bottom: 8px;
		text-align: center;
		color: #FF0000;
		background: #fff;
		font-size: 15px;
	}
</style>