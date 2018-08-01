<template>
    <div>
      <index-tab></index-tab>
      <index-content :userList="userList"></index-content>
    </div>
</template>

<script>
  import IndexTab from './component/IndexTab'
  import IndexContent from './component/IndexContent'
  export default {
    name: "index",
    data () {
      return {
        userList: ''
      }
    },
    components: {
      IndexTab,
      IndexContent
    },
    async beforeMount () {
      await this.$http.get("/users/").then(res => {
        if (res.status == "200") {
          this.userList = res.data.content;
        } else {
          wx.showToast({
            title: res.statusText,
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  };
</script>
<style scoped>

</style>
