<template>
    <div class="manage_page fill_contain">
        <el-row style="height: 100%;">

            <!-- 左侧导航 -->
            <Nav/>

            <!-- 右侧header+routerView -->
            <Main/>

        </el-row>
    </div>
</template>

<script>
    import Nav from "@/views/system/Nav";
    import Main from "@/views/system/Main";
    import {user_api} from "@/network/user";

    export default {
        name: "System",
        components: {
            Nav, Main
        },
        mounted() {
            this.checkLoginStatus();
        },
        methods: {
            checkLoginStatus() {  // 验证登录状态
                let token = localStorage.getItem("token");
                if (!token) {
                    this.$notify.warning("对不起您没有登录,即将跳转至登录页");
                    this.$router.push("/login");
                } else {
                    user_api.tokenCheck(token).then(ret => {
                        if (ret.code === 200) {
                            this.$store.state.token = token;
                            this.$store.state.loginStatus = true;
                            this.$store.state.userType = ret.user_type;
                            this.$store.state.username = ret.username;
                            this.$store.state.avatar = ret.avatar;
                            this.$store.state.createTime = ret.create_time;
                            this.$message.success(`欢迎您:${ret.username}`)
                        } else {
                            localStorage.removeItem("token");
                            this.$notify.info("登录信息失效,前往登录页");
                            this.$router.push("/login")
                        }
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>
