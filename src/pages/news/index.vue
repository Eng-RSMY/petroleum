<template>
    <div class="bbody">
        <!-- 行消息 -->
        <div class="row" @click="toDetail()">
            <div class="row-inner">
                <div class="title">
                    系统公告
                    <span>8月1日起，原油进行价格调整，每桶优惠2元</span>
                </div>
                <div class="time">
                    发布时间：2018-07-15
                </div>
                <div class="words">
                    8月1日起，原油进行价格调整，每桶优惠2元。8月1日起，原油进行价格调整，每桶优惠2元。8月1日起，原油进行价格调整，每桶优惠2元。
                </div>
            </div>
        </div>
        <div class="row" @click="toDetail()">
            <div class="row-inner">
                <div class="title">
                    系统公告
                    <span>8月1日起，原油进行价格调整，每桶优惠2元</span>
                </div>
                <div class="time">
                    发布时间：2018-07-15
                </div>
                <div class="words">
                    8月1日起，原油进行价格调整，每桶优惠2元。8月1日起，原油进行价格调整，每桶优惠2元。8月1日起，原油进行价格调整，每桶优惠2元。
                </div>
            </div>
        </div>
        <div class="row" @click="toDetail()">
            <div class="row-inner">
                <div class="title">
                    系统公告
                    <span>8月1日起，原油进行价格调整，每桶优惠2元</span>
                </div>
                <div class="time">
                    发布时间：2018-07-15
                </div>
                <div class="words">
                    8月1日起，原油进行价格调整，每桶优惠2元。8月1日起，原油进行价格调整，每桶优惠2元。8月1日起，原油进行价格调整，每桶优惠2元。
                </div>
            </div>
        </div>
        <div class="row" @click="toDetail()">
            <div class="row-inner">
                <div class="title">
                    系统公告
                    <span>8月1日起，原油进行价格调整，每桶优惠2元</span>
                </div>
                <div class="time">
                    发布时间：2018-07-15
                </div>
                <div class="words">
                    8月1日起，原油进行价格调整，每桶优惠2元。8月1日起，原油进行价格调整，每桶优惠2元。8月1日起，原油进行价格调整，每桶优惠2元。
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        methods: {
            toDetail () {
                wx.navigateTo({
					url: "../../pages/newsDetail/main",
					fail: function (res) {
						console.log(res)
					}
				})
            }
        },
        mounted () {

        }
    }
</script>
<style scoped>
.bbody {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #efeff4;
}
.row {
    width: 100%;
    height: auto;
    margin: 7px 0 0 0;
}
.row-inner {
    padding: 2% 5%;
    background: #fff;
}
.title {
    font-size: 13px;
    color: #FF0000;
}
.title span {
    margin: 0 0 0 2%;
    color: #000;
}
.time {
    font-size: 11px;
    color: #9B9B9B;
}
.words {
    margin: 2% 0 0 0;
    font-size: 12px;
    color: #4a4a4a;
}
</style>