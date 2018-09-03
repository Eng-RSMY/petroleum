<template>
	<div>
		<div class="content" v-if="isshow">
			<div class="contentList" v-for="(item,index) in finance" ::key="index">
				<p>
					<span>时间:</span>
					<span>{{item.ygdzrq}}</span>
				</p>
				<p>
					<span>流水号:</span>
					<span>{{item.pjh}}</span>
				</p>
				<p>
					<span>付款方开户行:</span>
					<span>{{item.arskd_DFKHH}}</span>
				</p>
				<p>
					<span>付款方账户名称:</span>
					<span>{{item.arskd_DFZHMC}}</span>
				</p>
				<p>
					<span>客户编号:</span>
					<span>{{item.dwbh}}</span>
				</p>
				<p>
					<span>客户名称:</span>
					<span>{{item.dwmc}}</span>
				</p>
				<p>
					<span>付款账户:</span>
					<span>{{item.fkzh}}</span>
				</p>
				<p>
					<span>收款银行名称:</span>
					<span>{{item.skyhmc}}</span>
				</p>
				<p>
					<span>收款银行账户:</span>
					<span>{{item.skzh}}</span>
				</p>
				<p>
					<span>款项状态:</span>
					<span>{{item.lx}}</span>
				</p>
				<p>
					<span>实收金额:</span>
					<span>{{item.je}}</span>
				</p>

			</div>
		</div>
		<div v-else>
			<img src="/static/images/none.png" alt="" class="img">
		</div>
		<div v-if="length">
			<div class="footer" v-if="foot1">
				<p @click="loadingMore1">加载更多</p>
			</div>
			<div class="footer" v-else>
				<p>已经到底了</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "IndexTitle",
		data() {
			return {
				page: 0,
				finance: null,
				foot1: true,
				length:false,
				isshow:false
			}
		},
		methods: {
			getFinance() {
				this.$http.get(`/finance?page=${this.page}&size=5`).then(res => {
					console.log(res)
					this.finance = res.data.content;
					if(res.data.content.length<5){
						this.length=false
					}else{
						this.length=true
					}
				})
					.catch(res => {
						console.log(res)
						wx.showToast({
							title: res.response.data.message,
							icon: 'none',
							duration: 2000
						})
					})
			},
			loadingMore1() {
				var page = this.page + 1;
				this.page = page
				this.$http.get(`/finance?page=${this.page}&size=5`).then(res => {
					console.log(res)
					if (res.data.content.length > 0) {
							for (var i = 0; i < res.data.content.length; i++) {
								this.finance.push(res.data.content[i]);
							}
							console.log(this.finance)
						} else {
							this.foot = false
						}
				})
				.catch(res => {
					console.log(res)
					wx.showToast({
						title: res.response.data.message,
						icon: 'none',
						duration: 2000
					})
				})
			}
		},
		mounted() {
			this.getFinance()
		},
	};
</script>

<style scoped>
	.content {
		background: #e7e7e7;
		font-size: 14px;
	}

	.contentList {
		background: #fff;
		padding: 20px;
		margin-top: 10px;
	}

	.contentList p span:nth-child(1) {
		display: inline-block;
		width:170px;
	}

	.contentList p {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
	}

	.contentList p:last-child {
		font-size: 16px;
		font-weight: bold
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
	.img{
		width:200px;
		height: 200px;
		position:fixed;
		left: 50%;
		top: 50%;
		margin-left: -100px;
		margin-top: -100px
	}
</style>