<template>
    <div class="news_list">
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
                        label="发表日期"
                        width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.create_time|djangoTimeFormat }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="新闻标题"
                >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.title }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        label="上传用户"
                        width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-user"/>
                        <span style="margin-left: 10px">{{ scope.row.pub_user }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="240">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="$router.push('/system/newsManage')">添加
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

    export default {
        name: "NewsList",
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
                        title: "",
                        pub_user: "",
                        features: []
                    }
                ]
            }
        },

        created() {
            this.init()
        },
        methods: {
            init() {
                news_api.getAll(1, 20).then(ret => {
                    this.tableData = ret.data;
                    this.pager.total = ret.total;
                    this.loading = false;
                })
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
                news_api.getAll(page, 20).then(ret => {
                    this.loading = false;
                    this.tableData = ret.data;
                    this.pager.total = ret.total
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    div.news_list {
        div.table_wrapper {
            padding: 20px;
        }
    }

    div.pager {
        text-align: left;
        margin-top: 10px;
        padding-left: 40px;
    }
</style>
