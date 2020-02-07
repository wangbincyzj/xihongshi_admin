import {request} from "@/network/index";

const URL = "api/movie/";

let getAll = function (page = 1, size = 10) {
    return request.get(URL, {
        page, size
    })
};


let post = function (data) {
    return request.post(URL, data)
};



export let native_movie_api = {
    getAll, post
}
