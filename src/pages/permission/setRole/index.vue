<template>
	<div style="margin-top:0px;margin-bottom:80px;">
		<p style="text-align:center;font-size: 12px;height: 40px;line-height:40px">设置该角色下权限(已选中的代表已经设置)</p>
		<div class="weui-cells weui-cells_checkbox" style="margin-top:0px;margin-bottom:80px;">
			<div class="weui-cell weui-check__label" v-for="(item,index) in permission" :key="index" :for="'s1'+(index+1)">
				<div class="weui-cell__hd">
					<input type="checkbox" class="weui-check" :name="'checkbox'+(index+1)" :id="'s1'+(index+1)" :checked="item.checked" :data-id="index"
					 @click="select" />
					<i class="weui-icon-checked"></i>
				</div>
				<div class="weui-cell__bd" style="margin-left:30px">
					<p>{{item.name}}</p>
				</div>
			</div>
		</div>
		<div class="footer" @click="primary">
			<span style="font-size:16px">修改权限</span>
		</div>
		<!-- <button type="primary" class="button" @click="primary"> 修改权限 </button> -->
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
		methods: {
			select(val) {
				this.permission[val.currentTarget.dataset.id].checked = !this.permission[val.currentTarget.dataset.id].checked
			},
			primary() {
				var select = [];
				this.permission.forEach(sel => {
					if (sel.checked) {
						select.push(sel.id);
					}
				});
				var roleId = this.$root.$mp.query.id;
				var params = {
					permissionIdList: select
				}
				this.$http.post(`/users/roles/${roleId}/permissions`, params).then(res => {
					wx.showToast({
						title: "修改成功",
						icon: 'none',
						duration: 2000,
					})

				}).catch(res => {
					wx.showToast({
						title: res.response.data.message,
						icon: 'none',
						duration: 2000
					})
				})
			}
		},
		async mounted() {
		  const roleId = this.$root.$mp.query.id;
      const that=this
		  try {
        let list = await this.$http.get("/users/permissions")
        let key = await this.$http.get(`/users/roles/${roleId}/permissions`)

        if (list.status===200 && key.status===200) {
          this.permission = list.data
          for (var i = 0; i < this.permission; i++) {
            this.$set(this.permission, "checked", "false")
          }
          key.data.forEach(have => {
            that.permission.forEach(all => {
              if (have.name == all.name) {
                this.$set(all, "checked", "true")
              }
            });
          });
        }
      }catch (e) {
        wx.showToast({
          title: "获取信息失败",
          icon: 'none',
          duration: 2000
        })
      }

		},
	}
</script>
<style scoped>
	page {
		background-color: #efeff4;
		height: auto;
		padding-bottom: 80px
	}

	.weui-cell__bd {
		margin-left: 30px
	}

	.weui-cell {
		position: initial;
		border-top: 1px solid #efeff4;
	}

	.button {
		width: 90%;
		position: fixed;
		bottom: 20px;
		left: 5%;
		z-index: 99999;

	}

	.footer {
		width: 100%px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #2E79FF;
		background: #fff;
		border-top: 1px solid #efeff4
	}
</style>
