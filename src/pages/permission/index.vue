<template>
    <div>
      <index-title></index-title>
      <index-content></index-content>
    </div>
</template>

<script>
  import IndexTitle from './component/IndexTitle'
  import IndexContent from './component/IndexContent'
  export default {
    name: "index",
    data () {
      return {

      }
    },
    components: {
      IndexTitle,
      IndexContent
    }
  };
</script>
<style scoped>

</style>
