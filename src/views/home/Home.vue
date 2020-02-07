<template>
    <div class="home" style="background: #323a5e">
        <div class="data" v-if="homeData">
            <div style="display: table"></div>
            <h3>站点数据统计</h3>
            <ul>
                <li class="title">当日新增数据</li>
                <li><span>{{homeData.date_list[0].data.user}}</span> 注册用户</li>
                <li><span>{{homeData.date_list[0].data.order}}</span> 订单提交</li>
                <li><span>{{homeData.date_list[0].data.news}}</span> 新闻上传</li>
                <li><span>{{homeData.date_list[0].data.job}}</span> 招聘岗位</li>
                <li><span>{{homeData.date_list[0].data.movie}}</span> 电影上线</li>
            </ul>
            <ul>
                <li class="title">总数据</li>
                <li><span>{{homeData.total_data.user}}</span> 注册用户</li>
                <li><span>{{homeData.total_data.order}}</span> 订单提交</li>
                <li><span>{{homeData.total_data.news}}</span> 新闻上传</li>
                <li><span>{{homeData.total_data.job}}</span> 招聘上传</li>
                <li><span>{{homeData.total_data.movie}}</span> 电影上传</li>
            </ul>
        </div>
        <div id="chart"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts'
    import "echarts/lib/chart/bar"
    import "echarts/lib/component/tooltip"
    import "echarts/lib/component/grid"
    import "echarts/lib/component/legend"
    import "echarts/lib/component/dataZoom"

    export default {
        name: "Home",
        data() {
            return {
                option: {
                    loading: true,
                    backgroundColor: '#323a5e',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '4%',
                        bottom: '14%',
                        top: '16%',
                        containLabel: true
                    },
                    legend: {
                        data: ['新增注册用户', '新增商城订单', '新增后台数据'],
                        right: 10,
                        top: 12,
                        textStyle: {
                            color: "#fff"
                        },
                        itemWidth: 12,
                        itemHeight: 10,
                        // itemGap: 35
                    },
                    xAxis: {
                        type: 'category',
                        data: null,
                        axisLine: {
                            lineStyle: {
                                color: 'white'

                            }
                        },
                        axisLabel: {
                            // interval: 0,
                            // rotate: 40,
                            textStyle: {
                                fontFamily: 'Microsoft YaHei'
                            }
                        },
                    },

                    yAxis: {
                        type: 'value',
                        max: '100',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.3)'
                            }
                        },
                        axisLabel: {}
                    },
                    dataZoom: [{
                        "show": true,
                        "height": 12,
                        "xAxisIndex": [
                            0
                        ],
                        bottom: '8%',
                        "start": 10,
                        "end": 90,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: "#d3dee5",

                        },
                        textStyle: {
                            color: "#fff"
                        },
                        borderColor: "#90979c"
                    }, {
                        "type": "inside",
                        "show": true,
                        "height": 15,
                        "start": 1,
                        "end": 35
                    }],
                    series: [{
                        name: '新增注册用户',
                        type: 'bar',
                        barWidth: '15%',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#fccb05'
                                }, {
                                    offset: 1,
                                    color: '#f5804d'
                                }]),
                                barBorderRadius: 12,
                            },
                        },
                        data: [20, 20, 30, 10, 30, 40, 40, 40, 30]
                    },
                        {
                            name: '新增商城订单',
                            type: 'bar',
                            barWidth: '15%',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#8bd46e'
                                    }, {
                                        offset: 1,
                                        color: '#09bcb7'
                                    }]),
                                    barBorderRadius: 11,
                                }

                            },
                            data: [10, 20, 30, 10, 30, 40, 40, 40, 30]
                        },
                        {
                            name: '新增后台数据',
                            type: 'bar',
                            barWidth: '15%',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#248ff7'
                                    }, {
                                        offset: 1,
                                        color: '#6851f1'
                                    }]),
                                    barBorderRadius: 11,
                                }
                            },
                            data: [10, 20, 30, 10, 30, 40, 40, 40, 30]
                        }]
                },
                homeData: null
            }
        },
        created() {
            let timer = setInterval(function () {
                if (this.$store.state.homeInfo) {
                    clearInterval(timer)
                    this.homeData = this.$store.state.homeInfo;
                    console.log(this.homeData);
                    this.initChart();
                }
            }.bind(this), 50)
        },
        computed: {
            dateList() {
                return this.homeData.date_list.map(item => {
                    return item.month + "-" + item.day + "日"
                }).reverse();
            },
            userAddList() { // 用户数据
                return this.homeData.date_list.map(item => {
                    return item.data.user
                }).reverse();
            },
            orderAddList() {  // 订单数据
                return this.homeData.date_list.map(item => {
                    return item.data.order
                }).reverse();
            },
            backendAddList() {  // 后台数据(包括所有)
                return this.homeData.date_list.map(item => {
                    return item.data.order + item.data.user + item.data.news + item.data.job + item.data.movie
                }).reverse();
            }

        },
        methods: {
            initChart() {
                // options中的数据注入
                this.option.xAxis.data = this.dateList;
                this.option.series[0].data = this.userAddList;
                this.option.series[1].data = this.orderAddList;
                this.option.series[2].data = this.backendAddList;

                this.myChart = echarts.init(document.querySelector("#chart"));
                this.myChart.setOption(this.option);
                let app = {
                    currentIndex: -1,
                };
                setInterval(function () {
                    let dataLen = this.option.series[0].data.length;

                    // 取消之前高亮的图形
                    this.myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: app.currentIndex
                    });
                    app.currentIndex = (app.currentIndex + 1) % dataLen;
                    //console.log(app.currentIndex);
                    // 高亮当前图形
                    this.myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: app.currentIndex,
                    });
                    // 显示 tooltip
                    this.myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: app.currentIndex
                    });


                }.bind(this), 1000);
            }
        }
    }
</script>

<style scoped lang="scss">
    .home {
        height: calc(100vh);

        div#chart {
            height: 500px;
            width: 80%;
            margin: 0 auto;
        }
    }

    .data {
        h3 {
            color: white;
            font-weight: 200;
            font-size: 30px;
            text-align: center;
            margin: 50px;
        }

        ul {
            justify-content: center;
            display: flex;

            li {
                line-height: 30px;
                border-radius: 10px;
                text-align: center;
                width: 150px;
                margin: 15px;
                padding: 10px 10px;
                background: rgba(255, 84, 119, 0.41);
                color: rgba(255, 255, 255, 0.87);

                span {
                    font-size: 22px;
                    color: white;
                }
            }

            li.title {
                background: #409EFF;
                color: white;
                line-height: 30px;
                font-size: 20px;
            }
        }
    }
</style>
