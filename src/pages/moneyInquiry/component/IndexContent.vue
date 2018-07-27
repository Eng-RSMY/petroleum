<template>
  <div>
    <div class="wrap">
      <div class="wrap-list">
        <ul v-for="item in 10" :key="item">
          <li>
            <p><span>时间: </span><span>2018-01-11</span></p>
            <p><span>汇入账号: </span><span>6224072330500504030</span></p>
            <p><span>汇入户名: </span><span>刘强东</span></p>
            <p><span>汇出账号: </span><span>6224072330500504030</span></p>
            <p><span>汇出户名: </span><span>马云</span></p>
            <p><span>款项状态: </span><span>正常</span></p>
            <p><span>实收金额: </span><span>1000.00</span> </p>
            <p><span>实收金额: </span><span>4324343241232</span></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'IndexContent',
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .wrap{
    background: #efeff4;
  }
  .wrap-list{
    height: auto;
    margin: 0 0 10px 0;
  }
  .wrap-list ul {
    margin-top: 10px;
    background: #fff;
    padding: 20px;
    font-size: 14px;
  }
  .wrap-list li span {
    margin-left: 20px;
  }
  .wrap-list li span:nth-child(1) {
    width: 80px;
    display: inline-block;
  }
</style>
