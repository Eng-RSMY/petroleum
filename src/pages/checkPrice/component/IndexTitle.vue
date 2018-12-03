<template>
	<div>
		<div class="title">
			<ul>
				<li v-for="(item,index) in titleList" :key="index">
					{{item.title =="null" ? "暂无信息" : item.title}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "IndexTitle",
		data() {
			return {
				titleList: [
				{
					title: '品类'
				},
				{
					title: '油种'
				},
				{
					title: '单价(元/吨)'
				},
				{
					title: '定量值'
				},
				{
					title: '余量值'
				}]
			}
		},
	};
</script>

<style scoped>
	.title {
		width: 100%;
		height: 35px;
		position: fixed;
		left: 0px;
		top: 35px;
		background: #0099FF;
	}

	.title ul {
		display: flex;
		font-size: 12px;
		color: #fff;
	}

	.title ul li {
		width: 20%;
		height: 35px;
		line-height: 35px;
		text-align: center;
	}

	.title ul li:nth-child(-n+4) {
		border-right: 1px solid #fff;
	}
</style>
