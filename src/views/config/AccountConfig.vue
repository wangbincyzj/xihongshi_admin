<template>
    <div class="account_config" style="overflow: hidden">
        <h3>管理员信息设置</h3>
        <div class="info_wrapper">
            <ul>
                <li>
                    <span>用户账号:</span>
                    <el-input class="input" disabled v-model="form.username"/>
                </li>
                <li>
                    <span>权限:</span>
                    <el-input class="input" disabled v-model="form.userType"/>
                </li>
                <li>
                    <span>注册时间:</span>
                    <el-input class="input" disabled v-model="form.createTime"/>
                </li>
                <li>
                    <span>更换头像</span>
                    <el-upload
                            class="avatar-uploader"
                            :action="$store.state.uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="form.avatar" :src="form.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {user_api} from "@/network/user";

    export default {
        name: "AccountConfig",
        data() {
            return {
                form: {
                    username: "",
                    avatar: "",
                    userType: null,
                    createTime: null,
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.form.username = this.$store.state.username;
                this.form.avatar = this.$store.state.avatar;
                this.form.userType = this.$store.state.userType;
                this.form.createTime = this.$store.state.createTime;
                console.log(this.form)
            },
            handleAvatarSuccess(res, file) {
                this.form.avatar = res.data.filepath;
                this.$store.state.avatar = res.data.filepath;
                user_api.changeAvatar(res.data.filepath).then(ret=>{
                    this.$message.success("更改成功")
                });
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
        }
    }
</script>

<style scoped lang="scss">
    h3 {
        text-align: center;
        margin-top: 50px;
        font-size: 20px;
        font-weight: normal;
    }

    .info_wrapper {
        width: 50%;
        margin: 30px auto;
        line-height: 40px;
        background: #f9fafc;
        padding: 30px;

        ul {

            width: 100%;

            li {
                margin: 10px 0;

                span {
                    width: 100px;
                }

                width: 100%;
                display: flex;
                text-align: center;

                .input {
                    margin: 0 10px;
                }
            }
        }

        .button {
            width: 50%;
            position: relative;
            left: 50%;
            transform: translateX(-50%);

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
