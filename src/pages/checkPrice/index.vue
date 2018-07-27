<template>
    <div>
      <index-title></index-title>
      <index-table></index-table>
    </div>
</template>

<script>
  // 标题
  import IndexTitle from './component/IndexTiTle'
  // 列表
  import IndexTable from './component/IndexTable'
  export default {
    name: "index",
    data () {
      return {

      }
    },
    components: {
      IndexTitle,
      IndexTable
    }
  };
</script>
<style scoped>

</style>
