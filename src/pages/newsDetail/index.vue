<template>
	<div class="bbody">
		<article class="weui-article">
			<h1 class="title">
				{{bulletin.title}}
			</h1>
      <div class="toptop">
        发表于{{bulletin.publishTime}}
      </div>

			<section>
				<img v-show="bulletin.coverUri" :src="bulletin.coverUri" mode="widthFix" alt="" class="img">
				<section class="content" v-html="bulletin.content"></section>
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
      Object.assign(this.$data, this.$options.data());
			var id = this.$root.$mp.query.id
			this.$http.get(`/bulletin/${id}`).then(res => {
				this.bulletin = res.data;
        this.bulletin.content=this.bulletin.content.replace(/\<img/gi,   '<img style="max-width:100%;height:auto" ' );
        this.bulletin.publishTime=this.bulletin.publishTime.replace(/T/,"  ")
			}).catch(res => {
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
		min-height: 100%;
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
		font-size: 32rpx;
		color: #898989;
    border-bottom: 1rpx solid #898989;
		text-align: right;
		margin-bottom:20px;
		padding:16rpx 0;
	}
  .content{
    font-size: 28rpx;
  }

  .rich-img{
    width: 100%;
    height: auto;
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
		font-size: 34rpx;
		font-weight: bold;
		color: #000;
		margin-bottom: 0px;
	}
	.title1{
		padding-bottom: 10px;
		font-size: 18px;
		color: #898989;
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
	.weui-article ._section{
		word-wrap:break-word;
	}
</style>
