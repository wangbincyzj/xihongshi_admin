import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import Login from "@/views/Login";
import System from "@/views/System";
import Home from "@/views/home/Home";

/* 数据展示 */
import UserList from "@/views/show/UserList";
import MediaList from "@/views/show/MediaList";
import NewsList from "@/views/show/NewsList";
import LostList from "@/views/show/LostList";
import JobList from "@/views/show/JobList";
import MovieList from "@/views/show/MovieList";
import ShopList from "@/views/show/ShopList";
import EmailList from "@/views/show/EmailList";

/* 数据管理 */
import EmailManage from "@/views/manage/EmailManage";
import JobManage from "@/views/manage/JobManage";
import LostManage from "@/views/manage/LostManage";
import MediaManage from "@/views/manage/MediaManage";
import MovieManage from "@/views/manage/MovieManage";
import NewsManage from "@/views/manage/NewsManage";
import ShopManage from "@/views/manage/ShopManage";
import UserManage from "@/views/manage/UserManage";
import OrderList from "@/views/show/OrderList";
import AccountConfig from "@/views/config/AccountConfig";
import ManagerConfig from "@/views/config/ManagerConfig";

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/system",
        component: System,
        redirect: "/system/home",
        children: [
            {
                path: "home",
                component: Home,
                meta: {
                    breadcrumbInfo: [ "首页"],
                    show: false
                }

            },
            // list-------------------------------------------
            {
                path: "userList",
                component: UserList,
                meta: {
                    breadcrumbInfo: [ "数据展示", "用户列表"]
                }
            },
            {
                path: "mediaList",
                component: MediaList,
                meta: {
                    breadcrumbInfo: [ "数据展示", "签约媒体"]
                }
            },
            {
                path: "newsList",
                component: NewsList,
                meta: {
                    breadcrumbInfo: [ "数据展示", "新闻列表"]
                }
            },
            {
                path: "lostList",
                component: LostList,
                meta: {
                    breadcrumbInfo: [ "数据展示", "失物招领列表"]
                }
            },
            {
                path: "jobList",
                component: JobList,
                meta: {
                    breadcrumbInfo: [ "数据展示", "招聘岗位列表"]
                }
            },
            {
                path: "movieList",
                component: MovieList,
                meta: {
                    breadcrumbInfo: [ "数据展示", "上映电影列表"]
                }
            },
            {
                path: "shopList",
                component: ShopList,
                meta: {
                    breadcrumbInfo: [ "数据展示", "商品列表"]
                }
            },
            {
                path: "emailList",
                component: EmailList,
                meta: {
                    breadcrumbInfo: [ "数据展示", "市长邮件列表"]
                }
            },
            {
                path: "orderList",
                component: OrderList,
                meta: {
                    breadcrumbInfo: [ "数据展示", "订单列表"]
                }
            },
            // manage-------------------------------------------------
            {
                path: "emailManage",
                component: EmailManage,
                meta: {
                    breadcrumbInfo: [ "数据管理", "市长信箱管理"]
                }
            },
            {
                path: "jobManage",
                component: JobManage,
                meta: {
                    breadcrumbInfo: [ "数据管理", "招聘职位管理"]
                }
            },
            {
                path: "lostManage",
                component: LostManage,
                meta: {
                    breadcrumbInfo: [ "数据管理", "失物招领管理"]
                }
            },
            {
                path: "mediaManage",
                component: MediaManage,
                meta: {
                    breadcrumbInfo: [ "数据管理", "签约媒体管理"]
                }
            },
            {
                path: "movieManage",
                component: MovieManage,
                meta: {
                    breadcrumbInfo: [ "数据管理", "院线电影管理"]
                }
            },
            {
                path: "newsManage",
                component: NewsManage,
                meta: {
                    breadcrumbInfo: [ "数据管理", "本地新闻管理"]
                }
            },
            {
                path: "shopManage",
                component: ShopManage,
                meta: {
                    breadcrumbInfo: [ "数据管理", "商品列表贯标"]
                }
            },
            {
                path: "userManage",
                component: UserManage,
                meta: {
                    breadcrumbInfo: [ "数据管理", "注册用户管理"]
                }
            },
            // config------------------
            {
                path: "accountConfig",
                component: AccountConfig,
                meta: {
                    breadcrumbInfo: [ "个人资料设置", "账户信息设置"]
                }
            },
            {
                path: "adminConfig",
                component: ManagerConfig,
                meta: {
                    breadcrumbInfo: [ "管理系统设置", "管理员设置"]
                }
            }
        ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
