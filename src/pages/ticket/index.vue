<template>
  <div class="container">
    <div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
      <div class="weui-cell__bd">
        <p>公司名称</p>
      </div>
      <div class="weui-cell__ft input-div">
        <div class="input-div" :disabled="disabled">{{companyInfo.fullName}}</div>
      </div>
    </div>
    <div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
      <div class="weui-cell__bd">
        <p>纳税人识别号</p>
      </div>
      <div class="weui-cell__ft">
        <textarea
          class="input-textarea"
          auto-height
          v-model.lazy="companyInfo.taxpayerNumber"
          maxlength="40"
		  placeholder="请输入"
		  style="text-align:left"
        />
      </div>
    </div>
    <div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
      <div class="weui-cell__bd">
        <p>电话号码</p>
      </div>
      <div class="weui-cell__ft">
        <input
          class="input"
          type="number"
          v-model.lazy="companyInfo.contactNumber"
          placeholder="请输入"
		  style="text-align:left"
        >
      </div>
    </div>
    <div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
      <div class="weui-cell__bd">
        <p>开户行</p>
      </div>
      <div class="weui-cell__ft">
        <textarea
          class="input-textarea"
          auto-height
          maxlength="40"
          v-model.lazy="companyInfo.bankName"
          placeholder="请输入"
		  style="text-align:left"
        />
      </div>
    </div>
    <div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
      <div class="weui-cell__bd">
        <p>银行帐号</p>
      </div>
      <div class="weui-cell__ft">
        <input class="input" type="number" v-model.lazy="companyInfo.bankAccount" placeholder="请输入">
      </div>
    </div>
    <div class="weui-cell" style="border-bottom: 1px solid #ddd;position: relative;">
      <div class="weui-cell__bd">
        <p>公司地址</p>
      </div>
      <div class="weui-cell__ft">
        <textarea
          class="input-textarea"
          auto-height
          maxlength="40"
          v-model.lazy="companyInfo.companyAddress"
		  placeholder="请输入"
		  style="padding:5px;text-align:left"
        />
      </div>
    </div>
    <!-- <button class="weui-btn weui-btn_primary button" @click="save">保存并更新</button> -->
    <div class="footer" @click="save">
      <span>保存并更新</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyInfo: "",
      disabled: true
    };
  },

  components: {},

  methods: {
    save: function(orderCode) {
      this.$http.post("/invoice", this.companyInfo).then(res => {
        if (res.status == "200") {
          this.companyInfo = res.data;
        } else {
          wx.showToast({
            title: res.statusText,
            icon: "none",
            duration: 2000
          });
        }
      });
    }
  },

  mounted() {
    // 获取企业开票信息
    this.$http.get("/invoice").then(res => {
      if (res.status == "200") {
        this.companyInfo = res.data;
      } else {
        wx.showToast({
          title: res.statusText,
          icon: "none",
          duration: 2000
        });
      }
    });
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  overflow-x: hidden;
  padding: 0px;
  background-color: #efeff4;
  display: inherit;
}

.weui-cell__bd {
  color: #000;
}
.weui-cell {
  background-color: #fff;
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: 10px;
  font-size: 14px;
}

.weui-cell__ft {
  padding-right: 27px;
  text-align: left
}
.input-div {
  line-height: 40rpx;
  float: left;
  flex: initial;
  width: 400rpx;
  color: #000;
}

.input-textarea {
  color: #000;
  line-height: 40rpx;
  width: 400rpx;
  /* height: 50px !important; */
}

.input {
  color: #000;
  text-align: left;
  width: 400rpx;
}

.button {
  position: fixed;
  bottom: 20px;
  left: 5%;
  width: 90%;
}
.footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  text-align: center;
  color: #2e79ff;
  background: #fff;
  align-self: flex-end;
}
</style>
