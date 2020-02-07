/*签约媒体相关api*/
import {request} from "@/network/index";

const url = "api/native_news/media/";

let getAll = function (page=1,size=10) {
    return request.get(url, {page, size})
};

let post = function(data){
    return request.post(url, data)
};

let put = function(id, data){
    return request.put(url, {id, data})
};

let delete_ = function(id){
    return request.delete_(url, id);
};



let media = {
    getAll, post, put, delete_
};


export {media}
