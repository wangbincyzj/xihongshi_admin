<template>
    <div class="login_page">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p>西虹市信息管理系统</p>
                </div>
                <el-form  v-loading="loading" :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名" ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login" class="submit_btn">登陆</el-button>
                    </el-form-item>
                </el-form>
                <p class="tip">温馨提示：</p>
                <p class="tip">未登录过的新用户，自动注册</p>
                <p class="tip">注册过的用户可凭账号密码登录</p>
            </section>
        </transition>
    </div>
</template>

<script>
    import {user_api} from "@/network/user";

    export default {
        name: "Login",

        data() {
            return {
                loading: false,
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
                showLogin: false,
            }
        },

        mounted() {
            this.init();
        },

        methods: {
            init() {
                this.showLogin = true;
                this.tokenCheck();
            },
            login() {
                this.loading = true;
                this.checkLoginForm(this.loginForm).then(ret=>{
                    user_api.login(this.loginForm.username, this.loginForm.password).then(ret=>{
                        if (ret.code===200){
                            // 登录成功,获取token
                            this.loading = false;
                            this.$message.success("登录成功");
                            let token = ret.data.token;
                            localStorage.setItem("token", token);
                            this.$store.state.token = token;
                            // token验证,
                            user_api.tokenCheck(token).then(ret => {
                                if (ret.code === 200) {
                                    // token验证成功 获取username和usertype
                                    this.$store.state.avatar = ret.avatar;
                                    this.$store.state.loginStatus = true;
                                    this.$store.state.createTime = ret.create_time;
                                    this.$store.state.username = ret.username;
                                    this.$store.state.userType = ret.user_type;
                                    this.$message.success("进入系统中");
                                    this.$router.push("/system")
                                }else {
                                    // token验证失败
                                    this.$message.warning("系统异常,请稍后登录");
                                    localStorage.removeItem("token")
                                }
                            }).catch(reason => {
                                this.$message.warning("异常")
                            })
                        }else{
                            this.$message.warning("用户名/密码不正确");
                            this.loading = false
                        }
                    })
                })
            },
            checkLoginForm(form) {
                return new Promise((resolve, reject) => {
                    if (!form.username || !form.password) reject("数据不能为空");
                    resolve("校验成功")
                })
            },
            tokenCheck() {
                // 1.从本地拿token: 有->远程验证->成功->vuex注入数据  失败->删除token->提醒失效要登录
                // 2.没有token: 登录-> 本地存储token,vuex注入数据
                let token = localStorage.getItem("token");
                if (token) {
                    this.loading = true;
                    user_api.tokenCheck(token).then(ret => {
                        this.loading = false;
                        // todo 代码冗余
                        if (ret.code === 200) {
                            this.$store.state.token = token;
                            this.$store.state.loginStatus = true;
                            this.$store.state.userType = ret.user_type;
                            this.$store.state.username = ret.username;
                            this.$store.state.loginStatus = true;
                            this.$store.state.createTime = ret.create_time;
                            this.$message.info("检测到您已登录,进入系统中...")
                            this.$router.push("/system")
                        }else {
                            this.$message.warning("登录信息失效请重新登录");
                            localStorage.removeItem("token")
                        }
                    }).catch(reason => {
                        this.loading = false;
                        this.$message.warning(reason.msg)
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "src/assets/css/mixin";

    .login_page {
        background: linear-gradient(90deg , #b6abff, pink);
        width: 100%;
        height: 100%;
    }

    .manage_tip {
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;

        p {
            font-size: 34px;
            color: #fff;
        }
    }

    .form_contianer {
        @include wh(320px, 210px);
        @include all_center_wh(320px, 210px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;

        .submit_btn {
            width: 100%;
            font-size: 16px;
        }
    }

    .tip {
        font-size: 12px;
        color: red;
    }

    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }

    .form-fade-enter, .form-fade-leave-active {
        transform: translateY(-100px);
        opacity: 0;
    }
</style>
