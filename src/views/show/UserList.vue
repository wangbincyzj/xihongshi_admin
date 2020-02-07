<template>
    <div class="user_list">
        <div class="table_wrapper">
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    style="width: 100%;"
                    border
                    :row-style="{height:'30px', color:'black'}"
                    :header-row-style="{lineHeight:'20px', color:'black', padding:'0'}"
                    :cell-style="{padding:'4px 0'}"
                    class="table"
            >

                <el-table-column
                        label="用户名"
                        width="400">
                    <template slot-scope="scope">
                        <i class="el-icon-user"/>
                        <span style="margin-left: 10px">{{scope.row.username}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="注册时间"
                >
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.create_time|djangoTimeFormat }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="最后登录"
                        width="400">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.update_time|djangoTimeFormat }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="240">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleAdd">添加
                        </el-button>
                        <el-button
                                size="mini"
                                type="info"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pager">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="pager.currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="pager.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {news_api} from "@/network/news";
    import {user_api} from "@/network/user";

    export default {
        name: "UserList",
        data() {
            return {
                loading: true,
                pager: {
                    currentPage: 1,
                    total: 20
                },
                tableData: [
                    {
                        create_time: "",
                        update_time: "",
                        username: "",
                    }
                ]
            }
        },

        created() {
            this.init()
        },
        methods: {
            init() {
                user_api.getAll(1, 20).then(ret => {
                    this.tableData = ret.data;
                    this.pager.total = ret.total;
                    this.loading = false;
                })
            },
            handleAdd(){
                this.$message.warning("对不起,权限不足,请联系超级管理员")
            },
            handleEdit(index, row) {
                if(this.$store.state.userType===1){
                    this.$message.info("重新编辑功能即将上线")
                }else {
                    this.$message.warning("对不起,权限不足,请联系超级管理员")
                }
            },
            handleDelete(index, row) {
                if(this.$store.state.userType===1){
                    this.$message.info("删除功能即将上线")
                }else {
                    this.$message.warning("对不起,权限不足,请联系超级管理员")
                }
            },
            handleCurrentChange(page) {
                this.loading = true;
                this.pager.currentPage = page;
                user_api.getAll(page, 20).then(ret => {
                    this.loading = false;
                    this.tableData = ret.data;
                    this.pager.total = ret.total
                })
            },
        }
    }
</script>

<style scoped>
    div.table_wrapper {
        padding: 20px;
    }
    div.pager {
        text-align: left;
        margin-top: 10px;
        padding-left: 40px;
    }
</style>
