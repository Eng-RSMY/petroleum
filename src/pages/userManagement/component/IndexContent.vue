<template>
  <div>
    <div class="content">
      <div class="contentList" @click="edit(item.id)" v-if="showList" v-for="item in userList" :key="item.id">
        <div>
          <p><span>用户名</span> <span>{{item.username}}</span> </p>
          <p><span>角色</span> <span>{{item.roleName}}</span> </p>
          <p><span>绑定手机号</span><span>{{item.phone}}</span> </p>
        </div>
        <div>
          <button v-if="item.enabled">激活中</button>
          <button class="not" v-else>未激活</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    props:["userList"],
    data () {
    },
    methods: {
      edit (id) {
        wx.navigateTo({
          url: `../../pages/modifyUser/main?id=${id}`,
          fail: function (res) {
          }
        })
      }
    },
    computed: {
      showList () {
        return this.userList.length
      }
    },
     onShow () {
    }
  };
</script>

<style scoped>
  .content{
    background: #e4e4e4;
    padding-top: 1px;
  }
  .contentList{
    margin-top: 10px;
    width: 100%;
    height: 70px;
    background: #fff;
    padding: 20px 0;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
  }
  .contentList p span:nth-child(1) {
    width: 100px;
    display: inline-block;
  }
  .contentList button {
    border: 1px solid #33CCCC;
    background: none;
    font-size: 14px;
    color:#33CCCC ;
  }
  .contentList button.not {
    border: 1px solid #FF6633;
    color: #FF6633;
  }
</style>
