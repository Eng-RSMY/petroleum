<template>
	<div class="container">
		<!-- 选项卡 -->
		<!-- 订单信息 -->
		<!-- 订单金额 -->

	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[{
					orderCode:"2314311484619",
					productType:"92号汽油",
					quantity:"12吨",
					shiji:"啦啦啦",
					orderState:"2",
					carCode:"鲁A415cc",
					orderCreattime:"2018-07-17  14:00:00"
				},{
					orderCode:"2314311484619",
					productType:"95号汽油",
					quantity:"12吨",
					shiji:"啦啦啦",
					carCode:"鲁A911XP",
					orderState:"1",
					orderCreattime:"2018-07-17  14:00:00"
				},{
					orderCode:"2314311484619",
					productType:"97号汽油",
					quantity:"12吨",
					shiji:"啦啦啦",
					orderState:"1",
					carCode:"鲁A415CC",
					orderCreattime:"2018-07-18  14:00:00"
				}]
			}
		},

		components: {
		},

		methods: {

		},

		created() { }
	}
</script>

<style scoped>
	.counter {
		display: inline-block;
		margin: 10px auto;
		padding: 5px 10px;
		color: blue;
		border: 1px solid blue;
	}
</style>