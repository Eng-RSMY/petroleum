<template>
    <div>
      <index-tab></index-tab>
      <index-content></index-content>
    </div>
</template>

<script>
  import IndexTab from './component/IndexTab'
  import IndexContent from './component/IndexContent'
  export default {
    name: "index",
    data () {
      return {

      }
    },
    components: {
      IndexTab,
      IndexContent
    }
  };
</script>
<style scoped>

</style>
