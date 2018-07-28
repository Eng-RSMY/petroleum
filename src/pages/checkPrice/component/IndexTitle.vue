<template>
   <div>
     <div class="title">
      <ul>
        <li v-for="(item,index) in titleList" :key="index">
          {{item.title}}
        </li>
      </ul>
     </div>
   </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    data () {
      return {
        titleList:[{
          title: '序号'
        },
        {
          title: '品类'
        },
        {
          title: '油种'
        },
        {
          title: '单价'
        }]
      }
    },
  };
</script>

<style scoped>
.title {
  width: 100%;
  height: 35px;
  background: #0099FF;
}
.title ul {
  display: flex;
  font-size: 16px;
  color: #fff;
}
.title ul li {
  width: 25%;
  height: 35px;
  line-height: 35px;
  text-align: center;
}
.title ul li:nth-child(-n+3) {
  border-right: 1px solid #fff;
}
</style>
