<template>
    <div class="item">
        <div class="left">
            <img :src="item.picture" alt="">
        </div>
        <div class="center">
            <h3 class="title">{{item.name}}</h3>
            <div class="sc">观众评分: <span class="rate">{{item.rate|scFilter}}</span></div>
            <div class="star ellipsis">{{item.actors|arrayFilter}}</div>
            <div class="showInfo">{{item.scene}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MovieListItem2",
        props: ["item"],
        data() {
            return {
                loading: false
            }
        },
        computed: {
            imgSrc() {
                return this.item.img.replace("w.h", "300.300")
            }
        },
        filters: {
            scFilter(val) {
                return !val ? "暂无评分" : val;
            },
            arrayFilter(val){
                return JSON.parse(val.replace(/'/g,'"')).join(",")
            }
        },
        methods: {
            buyClick() {
                this.loading = true;
                setTimeout(function () {
                    this.loading = false;
                    this.$toast.fail("购票失败,请检查您的网络")
                }.bind(this), 1500)
            }
        }
    }
</script>

<style scoped lang="scss">
    .item {
        display: flex;
        height: 280px;

        div.left {
            width: 50%;
            display: flex;
            align-items: center;
            img{
                width: 100%;
                height: 100%;
            }
        }

        div.center {
            width: 45%;
            margin-left: 5%;
            .title {
                font-weight: 600;
                font-size: 20px;
                margin-bottom: 10px;
            }

            .sc, .star, .showInfo {
                /*color: var(--el-info);*/
                margin-bottom: 10px;
            }

            .sc .rate {
                color: #faaf00;
                font-weight: 600;
            }
        }
    }
</style>
