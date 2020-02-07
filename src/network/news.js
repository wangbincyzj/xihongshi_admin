/*本地新闻相关api*/
import {request} from "@/network/index";
const url = "api/native_news/news/";


let getAll = function (page=1, size=10) {
    return request.get(url, {page, size})
};


let getById = function (id) {
    return request.get(url+id)
};

let post = function (data) {
    return request.post(url, data)
};

let put = function (id, data) {
    return request.get(url, {id, data})
};


let delete_ = function (id) {
    return request.delete_(url, id)
};


export let news_api = {
    getAll, getById, post, put, delete_
}

