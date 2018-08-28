<template>
  <div class="title">
    <div class="title-content-wrap">
      <div class="title-content" v-for="item in titleList" :key="item.id">
        <span>{{(index+1)}}</span>
        <span>{{item.name}}</span>
        <span @click="toSetRole(item.id)">设置</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    data () {
      return {
        titleList:['序号','角色','设置权限']
      }
    },
    methods: {
		toSetRole(id){
			wx.navigateTo({
  				url: `./setRole/main?id=${id}`
			})

		}
    },
    beforeMount () {
      // 获取角色
      this.$http.get("/users/roles").then((res)=>{
        if (res.status == "200") {
          this.titleList = res.data;
        } else {
          wx.showToast({
            title: res.statusText,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
  };
</script>

<style scoped>
  .title{
    background: #ccc;
    color: #fff;
    font-size: 14px;
    width: 100%;
    text-align: center;
    background: #fff;
    color: black;
  }
  .title-content:nth-child(2n) {
    background: #e7e7e7;
  }
  .title-content{
    height: 30px;
    line-height: 30px;
    display: flex;
  }
  .title-content span {
    width: 33%;
  }
  .title-content span:nth-child(2n){
    border-right: 1px solid black;
    border-left: 1px solid black;
  }
</style>
