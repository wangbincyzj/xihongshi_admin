<template>
    <div class="news_manage">
        <el-row>
            <el-col :span="6" class="infos" >
                <el-form class="form" ref="form" :model="form"  :rules="rules" label-width="80px">
                    <el-form-item label="新闻标题"  prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻来源" prop="source">
                        <el-select v-model="form.source" placeholder="请选择媒体来源">
                            <el-option label="西虹市新闻网" value="西虹市新闻网"></el-option>
                            <el-option label="西虹市广播台" value="西虹市广播台"></el-option>
                            <el-option label="西虹之光" value="西虹之光"></el-option>
                            <el-option label="西虹交通广播" value="西虹交通广播"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布时间" prop="pubtime">
                        <el-date-picker
                                v-model="form.pubtime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="封面图片" prop="picture">
                        <el-upload
                                class="avatar-uploader"
                                :action="$store.state.uploadUrl"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.picture" :src="form.picture" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="新闻特点">
                        <el-checkbox-group v-model="form.features">
                            <el-checkbox label="热点新闻" name="type"></el-checkbox>
                            <el-checkbox label="独家新闻" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="其他备注">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-col>


            <el-col :span="18" class="content">
                <mavon-editor
                        v-loading="loading"
                        v-model="form.md_content"
                        class="editor"
                        ref="writer"
                        @change="change"
                        @imgAdd="$imgAdd"
                />
            </el-col>


        </el-row>
    </div>
</template>

<script>
    import {upload} from "@/network";
    import {news_api} from "@/network/news";

    export default {
        name: "NewsManage",
        data() {
            return {
                loading: false,
                value: "",
                form: {
                    title: '',
                    pubtime: '',
                    picture: '',
                    content: '',
                    features: [],
                    source: "",
                    desc: '',
                    md_content: "",
                },
                rules: {
                    title: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
                    ],
                    pubtime:[
                        {required: true, message: '请选择时间', trigger: 'blur'},
                    ],
                    picture:[
                        {required: true, message: '请选择封面图', trigger: 'blur'},
                    ],
                    source:[
                        {required: true, message: '请选择新闻来源', trigger: 'blur'},
                    ]

                }
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.form.picture = res.data.filepath;
            },
            change(value, render) {
                this.form.content = render
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            onSubmit() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        // 数据验证通过,发送请求
                        this.loading = true;
                        news_api.post(this.form).then(ret => {
                            this.loading = false;
                            if (ret.code === 200) {
                                this.$message.success("发表成功");
                                this.$notify.info({
                                    title: '提醒',
                                    message: '避免重复提交,将清空数据'
                                });
                                this.$refs["form"].resetFields();
                            } else {
                                this.$message.error(ret.msg)
                            }
                        })
                    } else {
                       this.$message.error("请输入正确的数据")
                    }
                });
            },
            $imgAdd(pos, $file) {
                // 第一步.将图片上传到服务器.
                let formdata = new FormData();
                formdata.append('file', $file);
                upload(formdata).then(ret => {
                    this.$refs.writer.$img2Url(pos, ret.data.filepath);
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .news_manage {
        .infos {
            height: calc(100vh - 60px);
            padding: 30px 10px;

            .form {
                box-sizing: border-box;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
                height: 100%;
                padding: 10px;
                overflow: hidden;
            }
        }

        .content {
            height: calc(100vh - 60px);
            padding: 30px;

            .editor {
                height: 100%;
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
