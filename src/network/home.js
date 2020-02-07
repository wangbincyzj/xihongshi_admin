import {request} from "@/network/index";



let getHomeInfo = function () {
    return request.get("api/user/home_info/")
};




export {getHomeInfo}
