<template>
    <div class="bbody">
        <div class="body-inner">
            <!-- 公告信息 -->
            <div class="toptop">
                <div class="t-left">
                    <img src="/static/images/yhgl.png" />
                    <span>name（发布者账号）</span>
                </div>
                <span >发表于2018.5.12</span>
            </div>
            <div class="content">
                <div class="title">
                    公告标题
                </div>
                <div class="words">
                    Nam sodales elementum dolor non semper. Donec ac risus risus. Proin lacus nulla, bibendum aliquam nibh vel, viverra aliquam arcu. Ut eu tempus tellus. Maecenas euismod bibendum nisi, eget mollis urna sagittis sed. Duis molestie, metus ac facilisis pretium, urna nulla varius nisi, in volutpat tellus justo a neque. Sed ac mi dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed lacus dui, laoreet in urna eu, tristique lobortis odio. Donec dignissim erat metus, a molestie lorem vulputate eget. Sed vulputate dignissim purus, ut varius libero elementum at. Curabitur quis diam dui. Nullam a venenatis urna.
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
    background: #fff;
}
.body-inner {
    padding: 3% 2%;
}
.toptop {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #B5B5B5;
}
.t-left {
    width: 50%;
    display: flex;
    align-items: center;
}
.t-left img {
    width: 30px;
    height: 30px;
}
.t-left span {
    margin: 0 0 0 3%;
}
.content {
    width: 100%;
    height: auto;
    margin: 5% 0 0 0;
}
.title {
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #000;
    border-bottom: 2px solid #B5B5B5;
}
.words {
    width: 100%;
    margin: 4% 0 0 0;
    font-size: 14px;
    font-weight: normal;
}
</style>