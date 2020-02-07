import {request} from "@/network/index";


let getAll = function () {
    return request.get("spider/maoyan/ajax/movieOnInfoList")
};


export const maoyan = {
    getAll
};
