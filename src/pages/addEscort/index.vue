<template>
    <div class="bbody">
        <div class="ccontent">
            <div class="c-row">
                <div><span>司机真实姓名</span></div>
                <div><input class="c-row-input" type="text" placeholder="请输入" dir="rtl" :value="realName"/></div>
            </div>
            <div class="c-row">
                <span>绑定手机号</span>
                <input class="c-row-input" type="text" placeholder="请输入" dir="rtl" :value="phone"/>
            </div>
            <div class="c-row">
                <span>身份证号</span>
                <input class="c-row-input" type="idcard" placeholder="请输入" dir="rtl" :value="idNumber"/>
            </div>
            <div class="c-row c-row-last">
                <span>驾驶证号码</span>
                <input class="c-row-input" type="text" placeholder="请输入" dir="rtl" :value="driverNumber"/>
            </div>
        </div>
        <div class="footer" v-if="isFooterShow">
            <span>保存并更新</span>
        </div>
    </div>
</template>
<script>
export default {
    onLoad () {
        var data = this.$root.$mp.query
        if(data != '') {
            this.realName = data.realName
            this.phone = data.phone
            this.idNumber = data.idNumber
            this.driverNumber = data.driverNumber
        }
    },
    data () {
        return {
            focus: false,
            isFooterShow: true,
            realName: '',
            phone: '',
            idNumber: '',
            driverNumber: ''
        }
    },
    methods: {
    }
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
    margin: 0 auto;
    padding: 15px 0 0 0;
    box-sizing: border-box;
    border-bottom: 1px solid #DEDEDE;
    display: flex;
    justify-content: space-between;
}
.c-row-input {
    text-align: right;
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
</style>