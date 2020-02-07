<template>
    <div class="item">
        <h3>{{item.category_name}}</h3>
        <ul>
            <li v-for="goods in goodsList" @click="$emit('click', goods)">
                <div class="goods">
                    <div class="img">
                        <img :src="goods.img_url" alt="">
                    </div>
                    <h3>{{goods.product_name}}</h3>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "ShopListItem",
        data() {
            return {
                goodsList: []
            }
        },
        props: ["item"],
        created() {
            this.init()
        },
        methods: {
            init() {
                let category_list = this.item.category_list;
                let haveGoods_list = category_list.filter(item => {
                    return item.view_type = "category_group"
                });
                haveGoods_list.forEach(item => {
                    if(item.body.items){
                        item.body.items.forEach(item=>{
                            if (item.product_name){
                                this.goodsList.push(item)
                            }
                        })
                    }

                });

            }
        }
    }
</script>

<style scoped lang="scss">
    div.item{
        >h3{
            color: white;
            line-height: 30px;
            text-align: center;
            background: #67C23A;
        }
        ul{
            display: flex;
            flex-flow: row wrap;
            li{
                cursor: pointer;
                width: 15%;
                margin: 2.5%;
                box-sizing: border-box;
                background: linear-gradient(rgba(255, 0, 0, 0.02), rgba(0, 0, 255, 0.04));
                div.goods{
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    h3{
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                    div.img{
                        margin-top: 5px;
                        width: 150px;
                        img{
                            width: 100%;
                        }
                    }
                }
            }
        }
    }



</style>
