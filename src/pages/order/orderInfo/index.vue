<template>
	<div class="container">
		<div class="orderInfo">
			<p class="title">订单详情</p>
			<p>
				<span>订单号：</span>
				<span>{{orderInfo.number == null ? "暂无数据" : orderInfo.number}}</span>
			</p>
			<p>
				<span>卡号：</span>
				<span>{{orderInfo.cardNo == null ? "暂无数据" : orderInfo.cardNo}}</span>
			</p>
			<p>
				<span>卡面编号：</span>
				<span>{{orderInfo.cardNumber == null ? "暂无数据" : orderInfo.cardNumber}}</span>
			</p>
			<p>
				<span>订购货物:</span>
				<span>
					{{orderInfo.categoryName}} {{orderInfo.oilName}}
				</span>
			</p>
			<p>
				<span>订购量：</span>
				<span>{{orderInfo.orderWeight == null ? "暂无数据" : orderInfo.orderWeight + "吨"}}</span>
			</p>
			<!-- <p>
				<span>下单价格：</span>
				<span>{{orderInfo.orderPrice}} 元/吨</span>
			</p> -->
			<p>
				<span>货车司机：</span>
				<span>{{orderInfo.driverName == null ? "暂无数据" : orderInfo.driverName}}</span>
			</p>
			<p>
				<span>车牌号：</span>
				<span>{{orderInfo.carNumber == null ? "暂无数据" : orderInfo.carNumber}}</span>
			</p>
			<p>
				<span>司机手机号:</span>
				<span>{{orderInfo.driverPhone == null ? "暂无数据" : orderInfo.driverPhone}}</span>
			</p>
			<p>
				<span>司机身份证号：</span>
				<span>{{orderInfo.driverIdNumber == null ? "暂无数据" : orderInfo.driverIdNumber}}</span>
			</p>
			<p>
				<span>下单时间：</span>
				<span>{{orderInfo.orderedTime == null ? "暂无数据" : orderInfo.orderedTime}}</span>
			</p>
			<p>
				<span>下单用户：</span>
				<span>{{orderInfo.operatorName == null ? "暂无数据" : orderInfo.operatorName}}</span>
			</p>
			<p>
				<span>下单帐号</span>
				<span>{{orderInfo.operatorUsername == null ? "暂无数据" : orderInfo.operatorUsername}}</span>
			</p>
		</div>
		<div class="weui-cell" style="border-top: none;padding: 20px 0px;">
			<div class="weui-cell__bd">
				<p>
					<span>订单状态</span>
					<span style="margin-left:20px;color:#5ad5d4;font-size:16px">{{orderInfo.statusName}}</span>
				</p>
			</div>
			<div class="weui-cell__ft">
				<button class="weui-btn weui-btn_primary button" style="background-color:#6f99fc;"  @click.stop="del()">编辑</button>
			</div>
		</div>
		<div class="js_dialog" id="iosDialog1" v-if="showDialog">
			<div class="weui-mask"></div>
			<div class="weui-dialog" @click="cancel1">
				<div class="weui-dialog__hd"><strong class="weui-dialog__title">修改司机及车辆信息</strong></div>
				<div class="weui-dialog__bd">
					<p>
						<input class="weui-input" type="text" v-model='driverName' max="8" :placeholder="orderInfo.driverName"/>
					</p>
					<p>
						<input class="weui-input" type="idcard"  v-model='driverIdNumber' maxlength="18" :placeholder="orderInfo.driverIdNumber"/>
					</p>
					<p>
						<input class="weui-input" type="number" pattern="[0-9]*" maxlength="11"  v-model='driverIdNumber' :placeholder="orderInfo.driverPhone"/>
					</p>
					<div>
						<div class="c-row-input" contenteditable="true"  @click.stop="showInput">{{carNo}}</div>
					</div>
				</div>
				
				<div class="weui-dialog__ft">
					<button class="weui-dialog__btn weui-dialog__btn_default" @click="concel">取消</button>
					<button class="weui-dialog__btn weui-dialog__btn_primary" @click="sure">保存</button>
				</div>
			</div>
		</div>
    	<!-- 时间线 -->
    <div class="weui-cell" style="border-top: none;padding: 20px 0px;">
      <div class="weui-cell__bd">
        <p>订单流程时间</p>
        <time-axis  :orderStatusFlow="orderStatusFlow" :status='orderStatus'></time-axis>
      </div>
    </div>
		<div class="weui-cell" style="border-top: none;padding: 20px 0px;">
			<div class="weui-cell__bd">
				<p>订购金额</p>
			</div>
			<div class="weui-cell__ft">
				<p style="color: #FF001F;font-size: 17px">¥ {{orderInfo.orderTotalPrice}}</p>
			</div>
		</div>
		<div class="two-bar-codes">
			<p>二维码</p>
			<img :src="url" class="img" style="width:200px;height:200px;margin:0 auto;display:block;" alt="" @click="showBig">
		</div>
		<div class="input-box" v-if="isInputData1Show">
			<div class="i-b-li lf" v-for="(item, index) of inputData1" :key="index" @click="getPro(item)">{{ item }}</div>
			<div class="i-b-del lf" @click="inputClear">清空</div>
			<div class="i-b-close lf" @click="inputClose">关闭</div>
		</div>
		<div class="keyNums" v-if="isInputData2Show">
			<div class="i-b-li lf" v-for="(keyItem, keyIndex) of inputData2" :key="keyIndex" @click="getNum(keyItem)">{{ keyItem }}</div>
			<div class="i-b-ok lf" @click="getOk">确定</div>
			<div class="i-b-d lf" @click="getDel">删除</div>
		</div>
    <div class="mask" v-if="isshow" @click="hideBig">
      <div class="imgMask" @click.stop="showBig">
        <img :src="url"  class="imgBig" >
      </div>
    </div>
	</div>
</template>

<script>
  import timeAxis from "./timeAxis.vue"
export default {
  data() {
    return {
      orderInfo: "",
      orderStatusFlow:{},
      orderStatus:'',
      from: "",
      url: "",
      showDialog: false,
      isshow:false,
      driverName: "",
      driverIdNumber: "",
      driverPhone:"",
      focus: false,
      isFooterShow: true,
      isInputData1Show: false,
      isInputData2Show: false,
      carNo: "",
      inputData1: [
        "京",
        "沪",
        "浙",
        "苏",
        "粤",
        "鲁",
        "晋",
        "冀",
        "豫",
        "川",
        "渝",
        "辽",
        "吉",
        "黑",
        "皖",
        "鄂",
        "津",
        "贵",
        "云",
        "桂",
        "琼",
        "青",
        "新",
        "藏",
        "蒙",
        "宁",
        "甘",
        "陕",
        "闽",
        "赣",
        "湘"
      ],
      inputData2: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M"
      ]
    };
  },
  components: {timeAxis},
  methods: {
    // 查看大图
    showBig(){
      this.isshow = true
    },
    hideBig(){
      this.isshow = false
    },
    showInput() {
      this.focus = false;
      this.carNo = "";
      var that = this;
      if (that.carNo == "") {
        that.isFooterShow = false;
        that.isInputData2Show = false;
        that.isInputData1Show = true;
      } else {
        that.isFooterShow = false;
        that.isInputData1Show = false;
        that.isInputData2Show = true;
      }
    },
    getPro(val) {
      this.carNo = val;
      if (this.carNo != "") {
        this.isInputData1Show = false;
        this.isInputData2Show = true;
      }
    },
    getNum(val) {
      if (this.carNo.length < 6) {
        this.carNo += val;
      } else if (this.carNo.length == 6) {
        this.carNo += val;
        this.isInputData1Show = false;
        this.isInputData2Show = false;
        this.isFooterShow = true;
      }
    },
    inputClose() {
	  this.isInputData1Show = false;
	  this.isInputData2Show = false;
      this.isFooterShow = true;
    },
    inputClear() {
      this.carNo = "";
    },
    del() {
      this.showDialog = !this.showDialog;
    },
    concel: function() {
	  this.showDialog = false;
	  this.carNo = this.orderInfo.carNumber
	  this.inputClose()
	},
	cancel1(){
		 this.carNo = this.orderInfo.carNumber
	  	this.inputClose()
	},
	// 修改订单信息
    sure: function() {
	  this.showDialog = false;
	  this.inputClose
	  var id = this.orderInfo.id;
	  console.log(this.orderInfo)
	  var orderNumber = this.orderInfo.number;
	  var params = {
		  orderNumber:orderNumber,
		  driverRealName:this.driverName,
		  driverIdNumber:this.driverIdNumber,
		  driverPhone:this.driverPhone,
		  carNumber:this.carNo
	  }
      this.$http.post(`/track_order/${id}`,params)
        .then(res => {
			console.log(res);
			if (res.status == "200") {
        this.orderInfo = res.data;
				this.orderInfo.orderedTime = this.orderInfo.orderedTime.replace(
				/T/,
				"  "
				);
				this.url =
				"https://sapi.k780.com/?app=qr.get&data=" +
				res.data.encryptOrderNumber +
				"&level=L&size=7";
			} else {
				wx.showToast({
				title: res.statusText,
				icon: "none",
				duration: 2000
				});
			}
        })
        .catch(res => {
          wx.showToast({
            title: res.response.data.message,
            icon: "none",
            duration: 2000
          });
        });
    }
  },
  mounted() {
    var orderId = this.$root.$mp.query.orderInfo;
    var from = this.$root.$mp.query.from;
    if (from) {
      this.from = from;
    }
    this.$http
      .get(`/orders/${orderId}`)
      .then(res => {
        console.log(res);
        if (res.status == "200") {
          this.orderInfo = res.data;
          this.carNo = res.data.carNumber;
          this.driverPhone=res.data.driverPhone;
          this.driverName=res.data.driverName;
          this.driverIdNumber=res.data.driverIdNumber
          this.orderStatusFlow=res.data.orderStatusFlow
          this.orderStatus=res.data.statusName
          this.orderInfo.orderedTime = this.orderInfo.orderedTime.replace(
            /T/,
            "  "
          );
          this.url =
            "https://sapi.k780.com/?app=qr.get&data=" +
            res.data.encryptOrderNumber +
            "&level=L&size=7";
        } else {
          wx.showToast({
            title: res.statusText,
            icon: "none",
            duration: 2000
          });
        }
      })
      .catch(res => {
        wx.showToast({
          title: res.response.data.message,
          icon: "none",
          duration: 2000
        });
      });
  },
  
};
</script>

	
<style scoped>
.container {
  width: 100%;
  padding: 0px;
  background-color: #efeff4;
  overflow-x: hidden;
}
.mask{
  width:100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top:0px;
  background-color: rgba(0,0,0,0.8);
  z-index:999999999;
}
.imgMask{
  position:absolute;
  width:80%;
  background-color: #fff;
  left: 10%;
  top:25%;
}
.imgBig{
  width:90%;
  margin-left: 5%;
}
.weui-input {
  border: 1px solid #4a4a4a;
  height: 40px;
  border-radius: 20px;
  text-align: left;
  box-sizing: border-box;
  padding-left: 20px;
  margin-bottom: 10px;
  background-color: #fff;
}
.c-row {
  width: 90%;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: space-between;
}

.c-row-input {
  width: 100%;
  border: 1px solid #4a4a4a;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  text-align: left;
  box-sizing: border-box;
  padding-left: 20px;
  margin-bottom: 20px;
}

.c-row-last {
  border: none !important;
}
.title {
  width: 100%;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  height: 50px;
  line-height: 50px;
  padding-left: 5%;
}
.title1 {
  width: 100%;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  padding-left: 5%;
}
.weui-cell__bd {
  padding-left: 5%;
  color: #000;
}

.weui-cell {
  background-color: #fff;
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
}
.button {
  width: 60px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: normal;
}
.weui-cell__ft {
  padding-right: 20px;
}

.orderInfo {
  width: 100%;
  background-color: #fff;
  color: #898989;
}

.orderInfo p {
  width: 100%;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
}

.orderInfo p span:first-child {
  display: inline-block;
  width: 30%;
  padding-left: 40px;
}

.two-bar-codes {
  width: 100%;
  margin-top: 10px;
  background-color: #fff;
}
	.container {
		width: 100%;
		padding: 0px;
		background-color: #efeff4;
		overflow-x: hidden;
	}

	.title {
		width: 100%;
		background-color: #fff;
		color: #000;
		font-size: 14px;
		border-bottom: 1px solid #ddd;
		height: 50px;
		line-height: 50px;
		padding-left: 5%;
	}

	.weui-cell__bd {
		padding-left: 5%;
		color: #000;
	}

	.weui-cell {
		background-color: #fff;
		width: 100%;
		margin-top: 10px;
		font-size: 14px;
	}

	.weui-cell__ft {
		padding-right: 20px
	}

	.orderInfo {
		width: 100%;
		background-color: #fff;
		color: #898989;
	}

	.orderInfo p {
		width: 100%;
		height: 40px;
		font-size: 14px;
		line-height: 40px;
	}

	.orderInfo p span:first-child {
		display: inline-block;
		width: 30%;
		padding-left: 40px;
	}

	.two-bar-codes {
		width: 100%;
		margin-top: 10px;
		background-color: #fff;
	}

	.two-bar-codes p {
		width: 100%;
		text-align: left !important;
		padding-left: 5%;
		font-size: 14px;
		color: #000;
		height: 50px;
		line-height: 50px;
	}

	.two-bar-codes .img {
		width: 200px;
		height: 200px;
		margin: 20px auto
	}

	.two-bar-codes .img img {
		width: 100%;
		height: 100%;
	}
.two-bar-codes p {
  width: 100%;
  text-align: left !important;
  padding-left: 5%;
  font-size: 14px;
  color: #000;
  height: 50px;
  line-height: 50px;
}

.two-bar-codes .img {
  width: 200px;
  height: 200px;
  margin: 20px auto;
}

.two-bar-codes .img img {
  width: 100%;
  height: 100%;
}
/* 车牌号输入 */
.input-box {
  overflow: hidden;
  background-color: #ced3d9;
  padding: 30rpx 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10000;
}

.keyNums {
  overflow: hidden;
  background-color: #ced3d9;
  padding: 30rpx 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10000;
}
.weui-dialog__hd {
  background-color: #fff;
  padding: 0px;
  line-height: 50px;
  border-bottom: 1px solid #4a4a4a;
  margin-bottom: 20px;
}
.weui-dialog {
  top: 40%;
}
.i-b-li {
  font-size: 36rpx;
  height: 70rpx;
  width: 70rpx;
  line-height: 70rpx;
  text-align: center;
  border: 2rpx solid #ddd;
  margin: 5rpx;
  background-color: #fff;
}
.lf {
  float: left;
}

.rt {
  float: right;
}
.i-b-close {
  width: 100rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 32rpx;
  text-align: center;
  background-color: #fff;
  border: 2rpx solid #ddd;
  margin: 5rpx;
}

.i-b-del {
  width: 100rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 32rpx;
  text-align: center;
  background-color: #fff;
  border: 2rpx solid #ddd;
  margin: 5rpx;
}

.i-b-ok {
  width: 100rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 32rpx;
  text-align: center;
  background-color: #fff;
  border: 2rpx solid #ddd;
  margin: 5rpx;
  /* margin-left: 35%; */
}

.i-b-d {
  width: 100rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 32rpx;
  text-align: center;
  background-color: #fff;
  border: 2rpx solid #ddd;
  margin: 5rpx;
}
</style>
