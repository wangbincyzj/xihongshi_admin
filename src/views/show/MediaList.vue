<template>
    <div class="media_list">


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
                            <el-form-item label="媒体名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="媒体类型">
                                <span>{{ props.row.type }}</span>
                            </el-form-item>
                            <el-form-item label="负责人姓名">
                                <span>{{ props.row.charge_person_name }}</span>
                            </el-form-item>
                            <el-form-item label="负责人电话">
                                <span>{{ props.row.charge_person_phone }}</span>
                            </el-form-item>
                            <el-form-item label="desc">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="LOGO">
                                <span><img class="img" :src="props.row.logo" alt=""></span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="媒体名称"
                        width="400"
                        prop="name">
                    <template #default="scope">
                        <div style="font-weight: 600">{{scope.row.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="地址"
                        prop="address">
                </el-table-column>
                <el-table-column
                        width="150"
                        label="负责人姓名"
                        prop="charge_person_name">
                </el-table-column>
                <el-table-column label="操作" width="210">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="$router.push('/system/mediaManage')">添加
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
                <el-form-item label="媒体名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址  ">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <div class="person">
                    <el-form-item label="负责人 " label-width="80px">
                        <el-input v-model="form.charge_person_name"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话" label-width="90px">
                        <el-input v-model="form.charge_person_phone"></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="注册时间">
                    <el-date-picker
                            disabled
                            v-model="form.create_time"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="媒体类型">
                    <div>
                        <el-radio v-model="form.type" :label="0" border>自媒体</el-radio>
                        <el-radio v-model="form.type" :label="1" border>媒体机构</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="LOGO">
                        <img  v-if="form.logo" :src="form.logo" class="img">
                </el-form-item>

                <el-form-item label="相关备注">
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
    import {media} from "@/network/media";

    export default {
        name: "MediaList",
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
                media.getAll(1, 20).then(ret => {
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
                media.getAll(page, 20).then(ret => {
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

    .el-table__expanded-cell {
        background: rgba(0, 0, 0, 0.1);
    }

    .el-table__expanded-cell:hover {
        background: rgba(66, 185, 131, 0.18) !important;
    }

    .media_list {
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
