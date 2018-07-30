<template>
    <div class="title">
      <div v-for="(item, index) in titleList" :key="index" class="title-content">
        {{item}}
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
   display: flex;
   color: #fff;
   font-size: 14px;
   width: 100%;
   text-align: center;
 }
  .title-content{
    width: 33%;
  }
  .title-content:nth-child(2n){
    border-right: 1px solid black;
    border-left: 1px solid black;
  }
</style>
