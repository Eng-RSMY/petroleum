<template>
    <div>
      <index-content :user="user" :address="address" v-if="flag"></index-content>
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
        flag:false,
        address: ''
      }
    },
    components: {
      IndexBottom,
      IndexContent
    },
    mounted() {
      var address = this.$root.$mp.query.address;
      this.$http.get(`/users/${this.$root.$mp.query.id}`).then(res => {
        if (res.status == "200") {
          this.user = res.data;
          this.address = address;
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
