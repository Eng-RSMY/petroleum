<template>
	<div class="bbody">
		<div class="ccontent">
			<div class="c-row">
				<div>
					<span>车辆名称</span>
				</div>
				<div><input class="c-row-input" type="text" placeholder="请输入" dir="rtl" v-model.lazy="carName" /></div>
			</div>
			<div class="c-row">
				<span>车牌号</span>
				<div class="c-row-input" contenteditable="true"  style="width: 100px" @click.stop="showInput">{{carNo}}</div>
			</div>
			<div class="c-row">
				<span>行驶证号</span>
				<input class="c-row-input" type="text" placeholder="请输入" maxlength="16" @change="wancheng" dir="rtl" v-model.lazy="driveNum" />
			</div>
			<div class="c-row c-row-last">
				<span>危险品运输证号</span>
				<input class="c-row-input" type="text" placeholder="请输入" dir="rtl" maxlength="20" v-model.lazy="dangerNum" />
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
		</div>
		<div class="footer" v-if="isFooterShow" @click="save">
			<span style="font-size:16px">保存并更新</span>
		</div>
	</div>
</template>
<script>

	export default {

		data() {
			return {
				router: "",
				key: "",
				focus: false,
				isFooterShow: true,
				isInputData1Show: false,
				isInputData2Show: false,
				carName: '',
				carNo: '请输入',
				driveNum: '',
				dangerNum: '',
				inputData1: ["京", "沪", "浙", "苏", "粤", "鲁",
					"晋", "冀", "豫", "川", "渝", "辽", "吉", "黑", "皖",
					"鄂", "津", "贵", "云", "桂", "琼", "青", "新", "藏", "蒙",
					"宁", "甘", "陕", "闽", "赣", "湘"
				],
				inputData2: ["0", "1", "2", "3", "4", "5", "6",
					"7", "8", "9", "Q", "W", "E", "R", "T", "Y", "U",
					"P", "A", "S", "D", "F", "G", "H", "J", "K", "L",
					"Z", "X", "C", "V", "B", "N", "M"
				]
			}
		},
		methods: {
			showInput() {
				this.focus = false
				this.carNo="";
				var that = this
				if (that.carNo == '') {
					that.isFooterShow = false
					that.isInputData2Show = false
					that.isInputData1Show = true
				} else {
					that.isFooterShow = false
					that.isInputData1Show = false
					that.isInputData2Show = true
				}
			},
			getPro(val) {
				this.carNo = val
				if (this.carNo != '') {
					this.isInputData1Show = false
					this.isInputData2Show = true
				}
			},
			getNum(val) {
				if (this.carNo.length < 6) {
					this.carNo += val
				}else if (this.carNo.length == 6){
					this.carNo += val
					this.isInputData1Show = false
					this.isInputData2Show = false
					this.isFooterShow = true
				}

			},
			wancheng:function(val){
				console.log(val)
				this.driverNumber=val.target.value
				if(val.target.value.length !=16){
					wx.showToast({
						title: '请输入正确的16位证件号',
						icon: 'none',
						duration: 1000
					})
				}
			},
			inputClose() {
				this.isInputData1Show = false
				this.isFooterShow = true
			},
			inputClear() {
				this.carNo = ''
			},
			getOk() {
				this.isInputData1Show = false
				this.isInputData2Show = false
				this.isFooterShow = true
			},
			getDel() {
				if (this.carNo.length > 1) {
					let cc = this.carNo.split("")
					cc.splice(this.carNo.length - 1, 1)
					this.carNo = cc.join("")
				} else if (this.carNo.length === 1) {
					this.isInputData2Show = false
					this.isInputData1Show = true
				} else {
					console.log("别删除了，都没了")
				}
			},
			save: function () {
				var that =this;
				var params = {
					carNumber: this.carNo,
					drivingNumber: this.driveNum,
					transportNumber: this.dangerNum,
					remark: this.carName,
				};
				if (this.key == "") {
					this.$http.post(`/cars`, params)
						.then(res => {
							console.log(res)
							if (res.status == "200") {
								that.carName= ''
								that.carNo= '请输入'
								that.driveNum=''
								that.dangerNum=''
								wx.showToast({
									title: "车辆添加成功",
									icon: "success",
									success: function () {
										wx.redirectTo({
											url: '../../pages/selectCar/main?from=' + that.router
										})
									}
								})

							}
						})
						.catch(res => {
							console.log(res)
							// .response.data.message
							wx.showToast({
								title: res.response.data.message,
								icon: 'none',
								duration: 2000
							})
						})
				} else {
					params.id = this.key
					this.$http.post(`/cars`, params)
						.then(res => {
							console.log(res)
							if (res.status == "200") {
								wx.showToast({
									title: "车辆修改成功",
									icon: "success",
								})
							}
						})
						.catch(res => {
							console.log(res)
							// .response.data.message
							wx.showToast({
								title: res.response.data.message,
								icon: 'none',
								duration: 2000
							})
						})
				}
			}
		},
		mounted() {
			var data = this.$root.$mp.query;
			console.log(data.key)
			this.router = data.from
			if (data.key) {
				this.key = data.key;
				this.$http.get(`/cars/${data.key}`)
					.then(res => {
						console.log(res)
						if (res.status == "200") {
							this.carName = res.data.remark
							this.carNo = res.data.carNumber
							this.driveNum = res.data.drivingNumber
							this.dangerNum = res.data.transportNumber
						}
					})
					.catch(res => {
						console.log(res)
						// .response.data.message
						wx.showToast({
							title: res.response.data.message,
							icon: 'none',
							duration: 2000
						})
					})
			}
		},
	}
</script>
<style scoped>
	.bbody {
		width: 100%;
		height: 100%;
		position: absolute;
		background: #efeff4;
		font-family: PingFang;
		font-size: 14px;
	}

	.ccontent {
		width: 100%;
		height: 203px;
		background: #fff;
	}

	.c-row {
		width: 90%;
		height: 50px;
		line-height: 50px;
		margin: 0 auto;
		padding: 0;
		box-sizing: border-box;
		border-bottom: 1px solid #DEDEDE;
		display: flex;
		justify-content: space-between;
	}

	.c-row-input {
		text-align: right;
		height: 100%;
		line-height: 50px;
	}

	.c-row-last {
		border: none !important;
	}

	.footer {
		width: 375px;
		height: 50px;
		line-height: 50px;
		position: fixed;
		bottom: 0;

		text-align: center;
		color: #2E79FF;
		background: #fff;
		align-self: flex-end;
	}

	.lf {
		float: left;
	}

	.rt {
		float: right;
	}

	.input-box {
		overflow: hidden;
		background-color: #CED3D9;
		padding: 30rpx 0;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10000;
	}

	.keyNums {
		overflow: hidden;
		background-color: #CED3D9;
		padding: 30rpx 0;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10000;
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