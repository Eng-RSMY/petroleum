<template>
	<div>
		<div class="table">
			<ul v-for="(item,index) in tableList" :key="index">
				<li>{{item.categoryName==null ? "暂无数据" : item.categoryName }}</li>
				<li>{{item.oilName ==null ? "暂无数据" : item.oilName}}</li>
				<li>{{item.price ==null ? "暂无数据" : item.price}}</li>
				<li>{{item.fixed ==null ? "暂无数据" : item.fixed+"吨"}}</li>
				<li>{{item.stock ==null ? "暂无数据" : item.stock+"吨"}}</li>
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
					if (res.status == "200") {
						this.tableList = res.data
					}

				})
				.catch(res => {
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
		width: 20%;
		line-height: 35px;
		text-align: center;
		color: black;
		font-size: 12px;
	}

	.table ul li:nth-child(-n+4) {
		border-right: 1px solid #ccc;
	}
</style>
