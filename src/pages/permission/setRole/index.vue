<template>
	<div>
		<p style="text-align:center;font-size: 12px;height: 40px;line-height:40px">设置该角色下权限(已选中的代表已经设置)</p>
		<div class="weui-cells weui-cells_checkbox" style="margin-top:0px;margin-bottom:80px;">
			<label class="weui-cell weui-check__label" v-for="(item,index) in permission" :key="index" :for="'s1'+(index+1)">
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" :name="'checkbox'+(index+1)" :id="'s1'+(index+1)" :checked="item.checked" :data-id="index" @click="select"/>
                    <i class="weui-icon-checked"></i>
                </div>
                <div class="weui-cell__bd" style="margin-left:30px">
                    <p>{{item.name}}</p>
                </div>
            </label>
		</div>
		<button type="primary" class="button" @click="primary"> 修改权限 </button>
		<!-- <button type="primary" class="button"> 修改权限 </button> -->
	</div>
</template>
<script>
	export default {
		data() {
			return {
				permission: [],
			}
		},
		methods:{
			select(val){
				console.log(val)
				this.permission[val.currentTarget.dataset.id].checked=!this.permission[val.currentTarget.dataset.id].checked
			},
			primary(){
				var select=[];
				console.log(this.permission)
				this.permission.forEach(sel=> {
					if(sel.checked){
						select.push(sel.id);
					}
				});
				console.log(select,"选中的id")
				var roleId = this.$root.$mp.query.id;
				var params={
					permissionIdList:select
				}
				this.$http.post(`/users/roles/${roleId}/permissions`,params).then(res => {
					console.log(res)
					wx.showToast({
						title: "修改成功",
						icon: 'none',
						duration: 2000,
					})
					
				}).catch(res => {
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
			this.$http.get("/users/permissions").then(res => {
				console.log(res)
				this.permission = res.data
				for(var i=0;i<this.permission;i++){
					this.$set(this.permission,"checked","false")
				}
			}).catch(res => {
				console.log(res)
				wx.showToast({
					title: res.response.data.message,
					icon: 'none',
					duration: 2000
				})
			})
			var roleId = this.$root.$mp.query.id;
			var that=this;
			this.$http.get(`/users/roles/${roleId}/permissions`).then(res => {
				console.log(res)
				res.data.forEach(have => {
					that.permission.forEach(all => {
						if(have.name == all.name){
							// all.checked=true
							this.$set(all,"checked","true")
						}
					});
				});
			}).catch(res => {
				console.log(res)
				wx.showToast({
					title: res.response.data.message,
					icon: 'none',
					duration: 2000
				})
			})
		},
	}
</script>
<style scoped>
	.weui-cell__bd{
		margin-left: 30px
	}
	.button{
		width:90%;
		position: fixed;
		bottom: 20px;
		left: 5%;
		z-index:99999;

	}
</style>