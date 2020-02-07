<template>
    <div class="shop_list">
        <el-dialog
                :visible.sync="dialogVisible"
                v-if="item"
        >

            <div class="product">

                <div class="left">
                    <img :src="item.goods_info[0].image_share" alt="">
                </div>

                <div class="right">
                    <h3>{{item.product_info.name}}</h3>
                    <p class="price">¥{{item.goods_info[0].price}}</p>
                </div>
            </div>

        </el-dialog>
        <div class="wrapper">
            <ul v-if="list">
                <li v-for="item in list">
                    <ShopListItem @click="click" :item="item"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getCategory, getDetail} from "@/network/xiaomi_mall_api";
    import ShopListItem from "@/views/show/ShopListItem";

    export default {
        name: "ShopList",
        components: {ShopListItem},
        data() {
            return {
                list: null,
                dialogVisible: false,
                item: null,
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                getCategory().then(ret => {
                    this.list = ret.data
                })
            },
            click(item) {
                getDetail(item.action.path * 1).then(ret => {

                    this.dialogVisible = true;
                    this.item = ret.data;
                    console.log(this.item)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .product {
        display: flex;
        justify-content: center;
        /*height: 500px;*/

        .left {
            width: 50%;
            /*padding: 20px;*/
            img {
                width: 100%;
            }
        }
        .right {
            width: 50%;
            p{
                margin-top: 10px;
            }
        }
    }
</style>
