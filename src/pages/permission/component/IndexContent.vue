<template>
  <div class="title">
    <div v-for="item in 10" class="title-content-wrap">
      <div class="title-content">
        <span>1</span>
        <span>业务员</span>
        <span>设置</span>
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
    }
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
  .title-content-wrap:nth-child(2n) {
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
