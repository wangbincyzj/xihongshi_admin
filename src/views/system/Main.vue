<template>
    <el-col :span="20" style="height: 100%;overflow: auto; position: relative">
        <div class="header" v-if="this.$route.meta.show!==false">
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.meta.breadcrumbInfo">
                <el-breadcrumb-item :to="{ path: '/system' }">管理系统</el-breadcrumb-item>
                <el-breadcrumb-item v-for="item in $route.meta.breadcrumbInfo">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar :src="$store.state.avatar"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>用户等级:{{$store.state.userType}}</el-dropdown-item>
                    <el-dropdown-item>登录状态:{{$store.state.loginStatus}}</el-dropdown-item>
                    <el-dropdown-item>用户名:{{$store.state.username}}</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="content">
            <router-view/>
        </div>
    </el-col>
</template>

<script>
    export default {
        name: "Main",
        methods: {
            logout() {
                localStorage.removeItem("token");
                this.$router.push("/login")
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        height: 60px;
        display: flex;
        padding: 0 20px;
        justify-content: space-between;
        align-items: center;
        background: #eff2f7;

        .el-avatar {
            border: 1px solid var(--el-info);
        }
    }

    .content {
        height: calc(100vh - 60px);
        /*overflow: hidden;*/
    }
</style>
