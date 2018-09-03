<template>
	<div class="bbody">
		<article class="weui-article">
			<h1 class="title">
				{{bulletin.title}}
			</h1>
			<h2 class="title1">
				{{bulletin.subtitle}}
			</h2>
			<div class="toptop">
				发表于{{bulletin.publishTime}}
			</div>
			<section>
				<img :src="bulletin.coverUri" mode="widthFix" alt="" class="img">
				<section v-text="bulletin.content">

				</section>
			</section>
		</article>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				bulletin:{
					title:"",
					subtitle:"",
					content:"",
					publishTime:"",
				},
			}
		},
		methods: {

		},
		beforeMount() {
			console.log(this.$root.$mp.query)
			var id = this.$root.$mp.query.id
			this.$http.get(`/bulletin/${id}`).then(res => {
				console.log(res)
				this.bulletin = res.data;
				console.log(this.bulletin)
			}).catch(res => {
				console.log(res)
				// .response.data.message
				wx.showToast({
					title: res.response.data.message,
					icon: 'none',
					duration: 2000
				})
			})
		}
	}
</script>
<style scoped>
	.bbody {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #fff;
	}

	.body-inner {
		padding: 3% 2%;
	}

	.toptop {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: space-between;
		align-items: right;
		font-size: 14px;
		color: #B5B5B5;
		text-align: right;
		margin-bottom:20px;
	}

	.t-left {
		width: 50%;
		display: flex;
		align-items: center;
	}

	.t-left img {
		width: 30px;
		height: 30px;
	}

	.t-left span {
		margin: 0 0 0 3%;
	}

	.content {
		width: 100%;
		height: auto;
		margin: 5% 0 0 0;
	}

	.title {
		padding-bottom: 10px;
		font-size: 20px;
		font-weight: bold;
		color: #000;
	}
	.title1{
		padding-bottom: 10px;
		font-size: 16px;
		color: #000;
		border-bottom: 2px solid #B5B5B5;
	}

	.words {
		width: 100%;
		margin: 4% 0 0 0;
		font-size: 14px;
		font-weight: normal;
	}
	.img{
		width: 96%;
		margin-left: 2%;
	
	}
</style>