<template>
  <div>
    <div class="content">
      <div class="contentList" v-for="item in 10" @click="edit">
        <div>
          <p><span>用户名</span> <span>111</span> </p>
          <p><span>角色</span> <span>111</span> </p>
          <p><span>绑定手机号</span><span>111</span> </p>
        </div>
        <div>
          <button>激活中</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    methods: {
      edit () {
        wx.navigateTo({
          url: "../../pages/modifyUser/main",
          fail: function (res) {
            console.log(res)
          }
        })
      }
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
  }
</style>
