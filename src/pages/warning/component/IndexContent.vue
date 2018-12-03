<template>
  <div>
    <div class="content">
      <div class="contentList" @click="edit(item.id)" v-if="showList" v-for="item in userList" :key="item.id">
        <div>
          <p><span>预警名称：</span> <span>{{item.name}}</span> </p>
          <p><span>预警级别：</span> <span>{{item.jibie}}</span> </p>
          <p><span>预警内容：</span><span>{{item.content}}</span> </p>
          <p><span>预警声音：</span><span>{{item.audio}}</span> </p>
          <p><span>接收预警的部门：</span><span>{{item.department}}</span> </p>
        </div>
        <div>
          <button v-if="item.enabled">发起预警</button>
          <button class="not" v-else>已发起</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexTitle",
    props:["userList"],
    data () {
    },
    methods: {
      edit (id) {
        wx.showModal({
		title: '警告',
		content: '发起预警后，所有相关部门员工都将接收到报警电话',
		confirmText:"发起预警",
		success: function(res) {
			if (res.confirm) {
			} else if (res.cancel) {
			}
		}
		})
      }
    },
    computed: {
      showList () {
        return this.userList.length
      }
    },
     onShow () {
    }
  };
</script>

<style scoped>
  .content{
    background:#efeff4;
    padding-top: 1px;
	margin-top: 40px
  }
  .contentList{
    margin-top: 10px;
    width: 100%;
    /* height: 70px; */
    background: #fff;
    padding: 20px 0;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
  }
  .contentList p span:nth-child(1) {
    width: 120px;
	padding-left: 10px;
	box-sizing: border-box;
    display: inline-block;
  }
  .contentList button {
    border: 1px solid #33CCCC;
    background: none;
    font-size: 14px;
    color:#33CCCC ;
  }
  .contentList button.not {
    border: 1px solid #FF6633;
    color: #FF6633;
  }
</style>
