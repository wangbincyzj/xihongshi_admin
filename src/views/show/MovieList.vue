<template>
    <div class="movie_list">
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="猫眼电影" name="maoyan">
                <ul>
                    <li v-for="item in list" class="flow">
                        <MovieListItem class="item" :item="item"/>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="后台添加" name="second">
                <ul>
                    <li v-for="item in nativeList" class="flow">
                        <MovieListItem2 class="item" :item="item"/>
                    </li>
                </ul>
                <div class="pager">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="pager.currentPage"
                            :page-size="6"
                            layout="total, prev, pager, next"
                            :total="pager.total">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import {maoyan} from "@/network/movie_api";
    import MovieListItem from "@/views/show/MovieListItem";
    import MovieListItem2 from "@/views/show/MovieListItem2";
    import {native_movie_api} from "@/network/native_movie";
    export default {
        name: "MovieList",
        components: {MovieListItem, MovieListItem2},
        data() {
            return{
                activeName: "maoyan",
                list: null,
                nativeList: null,
                pager:{
                    currentPage: 1,
                    total: null
                }
            }
        },
        created() {
            this.init()
        },
        methods:{
            init() {
                maoyan.getAll().then(ret=>{
                    this.list = ret.movieList
                });
                native_movie_api.getAll(1, 6).then(ret=>{
                    this.nativeList = ret.data;
                    this.pager.total = ret.total
                }).catch(reason => {
                })
            },
            handleClick(...args) {
            },
            handleCurrentChange(page) {
                this.pager.currentPage = page;
                native_movie_api.getAll(page, 6).then(ret=>{
                    this.nativeList = ret.data
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .tabs{
        padding: 30px;
    }
    ul{
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        li{
            box-sizing: border-box;
            padding: 30px;
            margin: 10px;
            width: 30%;
            border: 1px solid rgba(255, 215, 0, 0.2);
            box-shadow: 5px 5px 5px 5px gainsboro;
        }
    }
    .flow{
        position: relative;
        transition: all .3s;
        bottom: 0;
    }
    .flow:hover{
        bottom: 5px;
    }
</style>
