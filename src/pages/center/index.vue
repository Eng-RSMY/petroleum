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
						<p class="h-w-name">{{ personList.realName }}</p>
						<p>{{ personList.companyName }}</p>
						<p>{{ personList.roleName }}</p>
					</div>
				</div>
			</div>
			<div class="account">
				<div class="a-left">
					<img src="/static/images/zh.png" />
					<span>账号角色</span>
				</div>
				<div class="a-right">
					<span>{{ personList.roleName }}</span>
					<img src="/static/images/more.png" />
				</div>
			</div>
			<div class="account">
				<div class="a-left">
					<img src="/static/images/bdzh.png" />
					<span>绑定手机号</span>
				</div>
				<div class="a-right">
					<span>{{ personList.phone }}</span>
					<img src="/static/images/more.png" />
				</div>
			</div>
			<div class="footer" @click="logout">
				退出登录
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				personList: {}
			}
		},

		components: {
		},

		methods: {
			logout () {
				this.personList = {}
				wx.navigateTo({
					url: "../../pages/index/main",
					fail: function (res) {
						console.log(res)
					}
				})
			}
		},

		mounted() {
			this.$http.get("/mine")
				.then(res => {
					if(res.status == "200") {
						this.personList = res.data
						let p = this.personList.phone
						p = p.split("")
						for(let i=3; i < 7; i++) {
							p[i] = "*"
						}
						p = p.join("")
						this.personList.phone = p
					}else {
						console.log("获取个人信息失败")
					}
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
		vertical-align:middle;

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
	.a-left {
		width: 50%;
		position: relative;
		margin: 0 0 0 8%;

	}
	.a-left span {
		margin: 0 0 0 10px;
	}
	.a-left img {
		width: 15px;
		height: 20px;
		vertical-align:middle;

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