/*爬虫api接口地址不同*/
import {request} from "@/network/index";

const BASE_URL = "http://127.0.0.1:8000/spider/xiaomi_mall/";


let getCategory = function () {
    return request.post("spider/xiaomi_mall/home/category_v2", {
        client_id: 180100031051,
        channel_id: "",
        webp: 1,
    });
};

let getDetail = function (pid) {
    return request.post("spider/xiaomi_mall/miproduct/view", {
        pid: pid,
        commodity_id: pid
    });
};

let commit = function (username, data, token) {
    return request.post("api/mall/", {
        username:username,
        data: data
    }, token)
};

let getOrderList = function (page=1, size=10) {
    return request.get("api/mall/",{
        page,
        size
    })
}


export {getDetail, getCategory, commit, getOrderList}
