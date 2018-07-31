<template>
  <div>
    <div class="bottom">
      <div>
        <button>取消编辑</button>
        <button>保存并更新</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    data () {
      return {
      }
    },
    methods: {
    }
  };
</script>

<style scoped>
  .bottom{
    padding: 20px 20px;
  }
  .bottom button {
    margin-top: 10px;
  }
  .bottom button:nth-child(1) {
    color: red;
  }
</style>
