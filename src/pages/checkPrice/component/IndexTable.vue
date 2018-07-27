<template>
  <div>
    <div class="table">
      <ul v-for="(item,index) in tableList" :key="index">
        <li>{{item.serialNumber}}</li>
        <li>{{item.category}}</li>
        <li>{{item.type}}</li>
        <li>{{item.price}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    data () {
      return {
        tableList:[{
          serialNumber: '1',
          category: '97#',
          type: '92#',
          price:'100'
          },
          {
            serialNumber: '1',
            category: '97#',
            type: '92#',
            price:'100'
          },
          {
            serialNumber: '1',
            category: '97#',
            type: '92#',
            price:'100'
          },
          {
            serialNumber: '1',
            category: '97#',
            type: '92#',
            price:'100'
          },
          {
            serialNumber: '1',
            category: '97#',
            type: '92#',
            price:'100'
          },
          {
            serialNumber: '1',
            category: '97#',
            type: '92#',
            price:'100'
          },]
      }
    },
  };
</script>

<style scoped>
  .table {
    width: 100%;
    height: 35px;
  }
  .table ul {
    display: flex;
    font-size: 16px;
    background: #fff;
  }
  .table ul:nth-child(2n){
    background: #F6F6F6;
  }
  .table ul li {
    width: 25%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: black;
  }
  .table ul li:nth-child(-n+3) {
    border-right: 1px solid #ccc;
  }
</style>
