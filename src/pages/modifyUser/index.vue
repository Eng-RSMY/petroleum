<template>
    <div>
      <index-content :user="user" v-if="flag"></index-content>
      <!--<index-bottom></index-bottom>-->
    </div>
</template>

<script>
  import IndexBottom from './component/IndexBottom'
  import IndexContent from './component/IndexContent'
  export default {
    name: "index",
    data () {
      return {
        user: '',
        flag:false
      }
    },
    components: {
      IndexBottom,
      IndexContent
    },
    beforeMount () {
      this.$http.get(`/users/${this.$root.$mp.query.id}`).then(res => {
        if (res.status == "200") {
          this.user = res.data;
          this.flag = true;
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
