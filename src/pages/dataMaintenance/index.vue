<template>
    <div>
      <index-content></index-content>
      <!--<index-bottom></index-bottom>-->
    </div>
</template>

<script>
  import IndexBottom from './component/IndexBottom'
  import IndexContent from './component/IndexContent'
  export default {
    name: "index",
    data () {
      return {

      }
    },
    components: {
      IndexBottom,
      IndexContent
    }
  };
</script>
<style scoped>

</style>
