<template>
	<div>

		<button class="weui-btn weui-btn_primary button" @click="save">保存并更新</button>

	</div>
</template>

<script>
	export default {
		name: "IndexTitle",
		data() {
			return {
			}
		},
		methods: {
		}
	};
</script>

<style scoped>
	.button{
		position: fixed;
		bottom:20px;
		left:5%;
		width:90%;
	}
</style>