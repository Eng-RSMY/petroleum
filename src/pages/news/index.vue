<template>
	<div class="bbody">
		<!-- 行消息 -->
		<div v-if="ishave">
			<div class="row" v-for="(item,index) in bulletin" :key="index" @click="toDetail(item.id)">
				<div class="row-inner">
					<div class="title">
						<span>{{item.title}}</span>
					</div>
					<div class="subtitle">
						<span>{{item.subtitle}}</span>
					</div>
					<div class="time">
						{{item.publishTime}}
					</div>
					<div class="words">
						{{item.content}}
					</div>
				</div>
			</div>
			<div v-if="isshow">
				<div class="footer" v-if="foot">
					<p @click="loadingMore">加载更多</p>
				</div>
				<div class="footer" v-else>
					<p>已经到底了</p>
				</div>
			</div>
		</div>
		<div v-else>
			<img src="/static/images/none.png" alt="" class="img">
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				bulletin: [],
				foot: true,
				page: 0,
				isshow: true,
				ishave: false
			}
		},
		methods: {
			toDetail(id) {
				wx.navigateTo({
					url: `../../pages/newsDetail/main?id=${id}`,
					fail: function (res) {
						console.log(res)
					}
				})
			},
			getBulletin() {
				this.$http.get(`/bulletin?page=${this.page}&size=5`).then(res => {
					// this.bulletin
					console.log(res)
					if (res.data.content.length > 0) {
						this.ishave = true
						for (var i = 0; i < res.data.content.length; i++) {
							this.bulletin.push(res.data.content[i]);
						}
					}
					if (res.data.content.length > 0 && res.data.content.length < 5) {
						this.isshow = false
					} else if (res.data.content.length = 5) {
						this.isshow = true
						this.foot = true
					}
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
			loadingMore: function () {
				var page = this.page + 1;
				this.page = page
				this.getBulletin();
			}
		},
		mounted() {
			this.getBulletin();
		}
	}
</script>
<style scoped>
	.bbody {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #efeff4;
	}

	.row {
		width: 100%;
		height: auto;
		margin: 7px 0 0 0;
	}

	.row-inner {
		padding: 2% 5%;
		background: #fff;
	}

	.title {
		font-size: 16px;
		color: #FF0000;
		margin-bottom: 10px;
	}

	.title span {
		color: #000;
	}

	.subtitle {
		font-size: 12px;
		margin-bottom: 10px;
	}

	.time {
		font-size: 14px;
		color: #565656;

	}

	.words {
		margin: 2% 0 0 0;
		font-size: 12px;
		color: #4a4a4a;
	}

	.footer {
		width: 375px;
		height: 50px;
		color: #898989;
		background: #efeff4;
		font-size: 13px;
		text-align: center;
	}

	.footer p {
		padding: 11px 0 0 0;
	}

	.img {
		width: 200px;
		height: 200px;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-left: -100px;
		margin-top: -100px
	}
</style>