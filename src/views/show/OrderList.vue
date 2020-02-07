<template>
    <div>
        <div class="table_wrapper">
            <el-table
                    class="el_table"
                    v-loading="loading"
                    border
                    :data="list"
                    style="width: 100%"
                    :row-style="{height:'30px', color:'black'}"
                    :header-row-style="{lineHeight:'20px', color:'black', padding:'0'}"
                    :cell-style="{padding:'4px 0'}"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">  <!--数据props.row-->
                        <div class="expand_table">
                            <el-table
                                    :data="props.row.data"
                                    style="width: 100%">
                                <el-table-column
                                        prop="date"
                                        label="商品">
                                    <template #default="scope">
                                        <div class="nameImage" >
                                            <img :src="scope.row.picture" alt="">
                                            <div class="name">{{scope.row.name}}</div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="num"
                                        label="数量"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        width="180"
                                        prop="price"
                                        label="单价">
                                </el-table-column>
                                <el-table-column
                                        width="180"
                                        prop="price"
                                        label="总价">
                                    <template #default="scope">
                                        <div v-text="scope.row.price * scope.row.num"></div>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <h3>总价格: <span v-text="getTotalPrice(props.row)" ></span></h3>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="订单编号"
                        width="200"
                        prop="create_time">
                    <template #default="scope">
                        <div >{{scope.row.id}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="150"
                        label="用户名"
                        prop="name">
                </el-table-column>
                <el-table-column
                        label="下单时间">
                    <template #default="scope">
                        <div >{{scope.row.time|djangoTimeFormat}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="250"
                        label="总数量"
                        prop="company_name">
                    <template #default="scope">
                        <div  v-text="getCount(scope.row)"></div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="250"
                        label="总价格"
                        prop="company_name">
                    <template #default="scope">
                        <div  v-text="getTotalPrice(scope.row)"></div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="210">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pager">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="pager.currentPage"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="pager.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {getOrderList, getDetail} from "@/network/xiaomi_mall_api";

    export default {
        name: "OrderList",
        data() {
            return {
                loading: false,
                pager: {
                    currentPage: 1,
                    total: null
                },
                list: []
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.list = this.dataInject(1)
                // getOrderList().then(ret => {
                //     this.pager.total = ret.total
                //     ret.data.forEach(item => {
                //         let newObj = {
                //             id: item.id,
                //             name: JSON.parse(item.data.replace(/'/g, '"')).username,
                //             time: item.create_time,
                //             data: JSON.parse(item.data.replace(/'/g, '"')).data,
                //         };
                //         this.list.push(newObj)
                //     });
                // })
            },
            dataInject(page) {
                this.loading = true;
                let list = [];
                getOrderList(page, 10).then(ret => {
                    this.loading = false;
                    this.pager.total = ret.total;
                    ret.data.forEach(item => {
                        let newObj = {
                            id: item.id,
                            name: JSON.parse(item.data.replace(/'/g, '"')).username,
                            time: item.create_time,
                            data: JSON.parse(item.data.replace(/'/g, '"')).data,
                        };
                        list.push(newObj)
                    });
                });
                return list;
            },
            getCount(item){
                return item.data.reduce((total,item)=>{
                    return total + item.num
                }, 0)
            },
            getTotalPrice(item){
                return item.data.reduce((total,item)=>{
                    return total + item.num * (item.price * 1)
                }, 0)
            },
            handleDelete(index, item) {
                this.$message.warning("无权限")
            },
            handleCurrentChange(page) {
                this.pager.currentPage = page;
                this.list = this.dataInject(page)
            }
        }
    }
</script>

<style scoped lang="scss">
    .el_table{
    }
    .expand_table{
        h3{
            text-align: right;
            margin-top: 20px;
        }
        .nameImage{
            display: flex;
            align-items: center;
            img{
                height: 60px;
            }
        }

    }

</style>


























