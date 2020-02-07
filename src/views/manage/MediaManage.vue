<template>
    <div class="media_manage">
        <el-row>
            <!--左侧list-->
            <el-col :span="8" class="list">
                <el-button class="addBtn" size="mini" type="success" :disabled="userType===null" @click="create">添加数据
                </el-button>
                <div class="list_search">
                    <span>按名称搜索</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="mediaName"
                            clearable>
                    </el-input>
                </div>
                <div class="list_container">
                    <el-table
                            v-loading="list_loading"
                            ref="singleTable"
                            :data="tableData"
                            highlight-current-row
                            @current-change="handleCurrentChange">
                        <el-table-column
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                property="name"
                                label="名称"
                        >
                        </el-table-column>
                        <el-table-column
                                property="charge_person_name"
                                label="责任人"
                                width="80">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pager">
                    <el-pagination
                            small
                            layout="prev, pager, next"
                            :page-size="10"
                            :current-page="pager.currentPage"
                            :total="pager.total"
                            @current-change="pageChange"
                    >
                    </el-pagination>
                </div>
            </el-col>

            <!--右侧 修改|添加-->
            <el-col :span="16" class="form">
                <el-form
                        ref="form"
                        :model="form"
                        label-width="80px"
                        :disabled="!editMode"
                        :rules="rules"
                        v-if="form">
                    <el-form-item label="媒体名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="地址  " prop="address">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <div class="person">
                        <el-form-item label="负责人 " label-width="80px" prop="charge_person_name">
                            <el-input v-model="form.charge_person_name"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人电话" label-width="120px" prop="charge_person_phone">
                            <el-input v-model="form.charge_person_phone"></el-input>
                        </el-form-item>
                    </div>

                    <el-form-item label="注册时间" prop="time">
                        <el-date-picker
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
                    <el-form-item label="LOGO" prop="time">
                        <el-upload
                                class="avatar-uploader"
                                :action="$store.state.uploadUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.logo" :src="form.logo" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="相关备注">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" v-if="addMode">添加数据</el-button>
                        <el-button type="primary" @click="onUpdate" v-else>更新数据</el-button>
                        <el-button v-if="!addMode" @click="onDelete">删除</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {media} from "@/network/media";
    import {utils} from "@/utils";

    export default {
        name: "MediaManage",
        data() {
            return {
                list_loading: true,
                editMode: false,
                addMode: false,
                mediaName: "",
                rules: {
                    name: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    charge_person_name: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                        {min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'}
                    ],
                    charge_person_phone: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                        {pattern: /^1\d{10}$/, message: '请输入正确的格式', trigger: 'blur'}
                    ],
                    logo: [
                        {required: true, message: '请选择LOGO', trigger: 'blur'},
                    ],

                },
                pager: {
                    total: 1,
                    currentPage: 1
                },
                tableData: [{
                    date: '',
                    name: '',
                    address: ''
                }],
                form: {
                    id: null,
                    create_time: "",
                    name: '',
                    address: "",
                    type: null,
                    desc: "",
                    charge_person_name: "",
                    charge_person_phone: "",
                    logo: ""
                },
                blank: {
                    id: null,
                    create_time: "",
                    name: '',
                    address: "",
                    type: null,
                    desc: "",
                    charge_person_name: "",
                    charge_person_phone: "",
                    logo: ""
                },
            }
        },
        computed: {
            userType() {
                return this.$store.state.userType;
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                media.getAll(1, 10).then(ret => {
                    this.list_loading = false;
                    this.pager.total = ret.total;
                    this.tableData = utils.DeepClone(ret.data)
                })
            },
            handleCurrentChange(val) {
                // 如果是超级管理员,可开启编辑模式,其他权限不能编辑只能浏览
                this.addMode = false;
                this.editMode = this.userType === 1;
                this.form = utils.DeepClone(val)

            },
            onSubmit() {
                media.post(this.form).then(ret => {
                    if (ret.code === 200) {
                        this.$message.success("添加成功");
                        this.init();
                        this.$message.info("为避免重复提交,将清空输入");
                        this.form = this.blank;
                    } else {
                        this.$message.error("添加失败:" + ret.msg)

                    }
                })
            },
            onDelete() {
                media.delete_(this.form.id).then(ret => {
                    if (ret.code === 200) {
                        this.$message.success("删除成功");
                        this.init();
                    } else {
                        this.$message.info(ret.msg)
                    }
                })
            },
            onUpdate() {
                media.put(this.form.id, this.form).then(ret => {
                    if (ret.code === 200) {
                        this.$message.success("更新成功");
                        this.init();
                    } else {
                        this.$message.info(ret.msg)
                    }
                })

            },
            handleAvatarSuccess(res, file) {
                this.form.logo = res.data.filepath;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            resetForm() {
                this.form = this.blank;
            },
            create() {
                this.resetForm();
                this.editMode = true;
                this.addMode = true;
            },
            pageChange(page) {
                // this.resetForm();
                this.pager.currentPage = page;
                this.list_loading = true;
                media.getAll(page, 10).then(ret => {
                    this.list_loading = false;
                    this.tableData = utils.DeepClone(ret.data)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .list {
        height: calc(100vh - 60px);
        overflow-y: scroll;

        .addBtn {
            display: block;
            margin: 10px auto;
            width: 95%;
        }

        div.list_search {
            padding: 10px 10px;
            display: flex;
            align-items: center;

            span {
                width: 100px;
                color: var(--el-info);
                font-size: 14px;
                font-weight: 600;
            }
        }

        div.pager {
            margin: 10px;
        }
    }

    .form {
        padding: 30px 40px 0;

        .person {
            display: flex;
            width: 100%;

            > * {
                width: 50%;
            }

            :nth-child(2) {
                margin-left: 20px;
            }

        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
