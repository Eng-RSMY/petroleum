<template>
    <div>
      <div class="title">
        查询时间：{{nowDate}}
      </div>
      <index-title></index-title>
      <index-table></index-table>
    </div>
</template>

<script>
  // 标题
  import IndexTitle from './component/IndexTiTle'
  // 列表
  import IndexTable from './component/IndexTable'
  import dayjs from 'dayjs'
  export default {
    name: "index",
    data () {
      return {
        nowDate:""
      }
    },
    components: {
      IndexTitle,
      IndexTable
    },
    mounted(){
      this.nowDate = dayjs().format("YYYY年MM月DD日 HH:mm:ss")
    }
  };
</script>
<style scoped>
  .title {
		width: 100%;
		height: 34px;
		position: fixed;
		left: 0px;
		top: 0px;
		background: #0099FF;
    color: #ffffff;
    font-size: 12px;
    line-height: 35px;
    border-bottom: 1px solid #fff;
    padding-left: 20px
	}
</style>
