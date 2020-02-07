<template>
    <el-col :span="4"  style="min-height: 100%; background-color: #324057">
        <h3 class="title">数据管理系统</h3>
        <el-menu default-active="/manage" style="min-height: 100%; width: 100%" router
                 background-color=#324057
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 unique-opened
        >
            <el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-document"></i>数据展示</template>
                <el-menu-item index="userList">用户列表</el-menu-item>
                <el-menu-item index="mediaList">签约媒体</el-menu-item>
                <el-menu-item index="newsList">新闻列表</el-menu-item>
                <!--<el-menu-item index="lostList">失物招领列表</el-menu-item>-->
                <el-menu-item index="jobList">招聘岗位列表</el-menu-item>
                <el-menu-item index="movieList">上映电影列表</el-menu-item>
                <el-menu-item index="shopList">商品列表</el-menu-item>
                <el-menu-item index="orderList">订单列表</el-menu-item>
                <!--<el-menu-item index="emailList">市长邮件列表</el-menu-item>-->
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                <!--<el-menu-item index="userManage">注册用户管理</el-menu-item>-->
                <el-menu-item index="mediaManage">签约媒体管理</el-menu-item>
                <el-menu-item index="newsManage">本地新闻管理</el-menu-item>
                <!--<el-menu-item index="lostManage">失物招领管理</el-menu-item>-->
                <el-menu-item index="jobManage">招聘岗位管理</el-menu-item>
                <el-menu-item index="movieManage">上映电影管理</el-menu-item>
                <!--<el-menu-item index="categoryManage">商品管理</el-menu-item>-->
                <!--<el-menu-item index="emailManage">市长邮箱分类管理</el-menu-item>-->
            </el-submenu>
            <el-submenu index="4" disabled>
                <template slot="title"><i class="el-icon-star-on"></i>数据图表</template>
                <el-menu-item index="userChart">用户增长</el-menu-item>
                <el-menu-item index="newsChart">新闻数据</el-menu-item>
                <el-menu-item index="mallChart">商城数据</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-edit"></i>资料设置</template>
                <el-menu-item index="accountConfig">账户信息设置</el-menu-item>
            </el-submenu>
            <el-submenu index="6" >
                <template slot="title"><i class="el-icon-setting"></i>项目介绍</template>
                <el-menu-item index="adminConfig">项目介绍</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
    export default {
        name: "MainNav"
    }
</script>

<style scoped>
    h3.title{
        text-align: center;
        line-height: 3;
        width: 100%;
        color: var(--el-success);
    }
</style>
