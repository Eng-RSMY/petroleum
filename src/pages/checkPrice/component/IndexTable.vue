<template>
	<div>
		<div class="table">
			<ul v-for="(item,index) in tableList" :key="index">
				<li>{{(index+1)}}</li>
				<li>{{item.categoryName==null ? "暂无数据" : item.categoryName }}</li>
				<li>{{item.oilName ==null ? "暂无数据" : item.oilName}}</li>
				<li>{{item.price ==null ? "暂无数据" : item.price}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "IndexTitle",
		data() {
			return {
				tableList: ""
			}
		},
		mounted() {
			this.$http.get("/prices")
				.then(res => {
					 
					console.log(res)
					if (res.status == "200") {
						this.tableList = res.data
					}

				})
				.catch(res => {
					 
					console.log(res)
				})
		},
	};
</script>

<style scoped>
	.table {
		width: 100%;
		margin-top: 40px;
		padding-bottom: 30px;
	}

	.table ul {
		display: flex;
		font-size: 16px;
		background: #fff;
	}

	.table ul:nth-child(2n) {
		background: #F6F6F6;
	}

	.table ul li {
		width: 25%;
		line-height: 35px;
		text-align: center;
		color: black;
		font-size: 12px;
	}

	.table ul li:nth-child(-n+3) {
		border-right: 1px solid #ccc;
	}
</style>