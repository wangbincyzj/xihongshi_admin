import {request} from "@/network/index";

const URL = "api/job/";


let getAll = function (page=1, size=10) {
    return request.get(URL, {page, size})
};

let getById = function (id) {
    return request.get(URL+id)
};

let post = function (data) {
    return request.post(URL, data)
};

let put = function (id, data) {
    return request.put(URL, {
        id, data
    })
};

let delete_ = function (id) {
    return request.delete_(URL, id)
};


export const job_api = {
    getAll, getById, post, put, delete_
};
