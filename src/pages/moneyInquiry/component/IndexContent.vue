<template>
  <div>
    <div class="content">
      <div class="contentList" v-for="item in 10">
        <p>
          <span>时间:</span>
          <span>2018-0909</span>
        </p>
        <p>
          <span>汇入账号:</span>
          <span>2018-0909</span>
        </p>
        <p>
          <span>汇入户名:</span>
          <span>2018-0909</span>
        </p>
        <p>
          <span>汇出账号:</span>
          <span>2018-0909</span>
        </p>
        <p>
          <span>汇入户名:</span>
          <span>2018-0909</span>
        </p>
        <p>
          <span>款项状态:</span>
          <span>已确认收款</span>
        </p>
        <p>
          <span>实收金额:</span>
          <span>2018-0909</span>
        </p>
        <p>
          <span>流水号:</span>
          <span>2018-0909</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    data () {
    },
  };
</script>

<style scoped>
  .content{
    background: #e7e7e7;
    font-size: 14px;
  }
  .contentList{
    background: #fff;
    padding: 20px;
    margin-top: 10px;
  }
  .contentList p span:nth-child(1){
    width: 100px;
    display: inline-block;
  }
</style>
