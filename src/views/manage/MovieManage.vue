<template>
    <div class="movie_manage">
        <div class="wrapper">
            <h3>电影添加</h3>
            <el-form
                    ref="form"
                    :model="form"
                    label-width="80px"
                    v-if="form">
                <el-form-item label="影片名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="演员" prop="address">
                    <el-tag
                            :key="tag"
                            v-for="tag in form.actors"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">新增</el-button>
                </el-form-item>
                <el-form-item label="影片海报" prop="time">
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

                <el-form-item label="场次">
                    <el-input type="textarea" v-model="form.scene"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" >添加数据</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {native_movie_api} from "@/network/native_movie";

    export default {
        name: "MovieManage",
        data() {
            return{
                form:{
                    name: "",  // 片名
                    picture: "", // 影片图片
                    rate: "",  // 观众评分?为什么是管理员填写?
                    scene: "", // 场次
                    actors: [],
                },

                inputVisible: false,
                inputValue: ''
            }
        },
        created() {
            this.init()
        },
        methods:{
            init() {

            },
            handleClose(tag) {
                this.form.actors.splice(this.form.actors.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.form.actors.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            handleAvatarSuccess(res, file) {
                this.form.picture = res.data.filepath;
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            onSubmit() {
                native_movie_api.post(this.form).then(ret=>{
                    if(ret.code===200){
                        this.$message.success("添加成功!为避免重复提交,将清空表单");
                        for (let formKey in this.form) {
                            this.form[formKey] = null
                        }
                    }else{
                        this.$message.error("添加失败")
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .movie_manage{
        .wrapper{
            width: 50%;
            background: rgba(217, 217, 217, 0.05);
            box-shadow: 5px 5px 20px blanchedalmond;
            margin: 30px auto;
            padding: 30px;
            h3{
                text-align: center;
                margin-bottom: 20px;
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
        width: 114px;
        height: 160px;
        display: block;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
