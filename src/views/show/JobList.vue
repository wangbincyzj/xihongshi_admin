<template>
    <div class="job_list">


        <div class="table_wrapper">
            <el-table
                    v-loading="loading"
                    border
                    :data="tableData"
                    style="width: 100%"
                    :row-style="{height:'30px', color:'black'}"
                    :header-row-style="{lineHeight:'20px', color:'black', padding:'0'}"
                    :cell-style="{padding:'4px 0'}"
            >
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="标题">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="发布人">
                                <span>{{ props.row.pub_user }}</span>
                            </el-form-item>
                            <el-form-item label="发布时间">
                                <span>{{ props.row.create_time }}</span>
                            </el-form-item>
                            <el-form-item label="薪水">
                                <span>{{ props.row.salary }}</span>
                            </el-form-item>
                            <el-form-item label="经验要求">
                                <span>{{ props.row.experience }}</span>
                            </el-form-item>
                            <el-form-item label="学历要求">
                                <span>{{ props.row.education }}</span>
                            </el-form-item>
                            <el-form-item label="岗位职责">
                                <span>{{ props.row.responsibilities }}</span>
                            </el-form-item>
                            <el-form-item label="入职要求">
                                <span>{{ props.row.requirements }}</span>
                            </el-form-item>
                            <el-form-item label="公司福利">
                                <span>{{ props.row.features }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="发布日期"
                        width="200"
                        prop="create_time">
                    <template #default="scope">
                        <div >{{scope.row.create_time|djangoTimeFormat}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        width="150"
                        label="发布人"
                        prop="pub_user">
                </el-table-column>
                <el-table-column
                        label="标题"
                        prop="name">
                    <template #default="scope">
                        <div >{{scope.row.name}}</div>
                    </template>
                </el-table-column>

                <el-table-column
                        width="250"
                        label="公司"
                        prop="company_name">
                </el-table-column>
                <el-table-column label="操作" width="210">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="$router.push('/system/jobManage')">添加
                        </el-button>
                        <el-button
                                size="mini"
                                type="Success"
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

        <el-dialog title="媒体信息更新" :visible.sync="dialogShow" v-if="dialogShow">
            <el-form ref="form" :model="form" label-width="80px" v-if="form">
                <el-form-item label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="公司名称">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <div class="person">
                    <el-form-item label="工作经验" label-width="80px">
                        <el-input v-model="form.experience"></el-input>
                    </el-form-item>
                    <el-form-item label="学历要求" label-width="90px">
                        <el-input v-model="form.education"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="公司福利">
                    <el-input v-model="form.features"></el-input>
                </el-form-item>
                <el-form-item label="职位职责">
                    <el-input  type="textarea" v-model="form.responsibilities"></el-input>
                </el-form-item>
                <el-form-item label="职位要求">
                    <el-input type="textarea" v-model="form.requirements"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onUpdate" >更新数据</el-button>
                    <el-button type="primary" @click="dialogShow=false" >取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


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
    import {job_api} from "@/network/job";

    export default {
        name: "JobList",
        data() {
            return {
                loading: true,
                pager: {
                    currentPage: 1,
                    total: 20
                },
                form:{},
                tableData: [],
                dialogShow: false
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                job_api.getAll(1, 20).then(ret => {
                    this.loading = false;
                    this.tableData = ret.data;
                    this.pager.total = ret.total;
                })
            },
            handleEdit(index, row) {
                this.form = Object.assign({}, row);
                this.dialogShow = true;

            },
            handleDelete(index, row) {
                if (this.$store.state.userType === 1) {
                    this.$message.info("删除功能即将上线")
                } else {
                    this.$message.warning("对不起,权限不足,请联系超级管理员")
                }
            },
            handleCurrentChange(page) {
                this.loading = true;
                this.pager.currentPage = page;
                job_api.getAll(page, 20).then(ret => {
                    this.loading = false;
                    this.tableData = ret.data;
                    this.pager.total = ret.total
                })
            },
            onUpdate() {
                this.$message.warning("对不起,权限不足,请联系超级管理员")
            }
        }
    }
</script>

<style scoped lang="scss">

    .img {
        width: 50px;
        height: 50px;
    }

    div.person{
        display: flex;
    }

    .el-table__expanded-cell {
        background: rgba(0, 0, 0, 0.1);
    }

    .el-table__expanded-cell:hover {
        background: rgba(66, 185, 131, 0.18) !important;
    }

    .job_list {
        .table_wrapper {
            padding: 20px;
        }
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
