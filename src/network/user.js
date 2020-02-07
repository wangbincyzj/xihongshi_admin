/*用户账户相关api*/
import {request} from "@/network/index";

const BASE_URL = "api/user/";
let login = function (username, password) {
    return request.post(BASE_URL + "login/", {
        username,
        password
    })
};

let logout = function (token) {
    return request.post(BASE_URL + "logout/",{
        token
    })
};

let tokenCheck = function (token) {
    return request.post(BASE_URL+ "token_check/", {
        token
    })
};

let changeAvatar = function(avatar){
    return request.post(BASE_URL + "userinfo/",{
        avatar
    })
};

let getAll = function (page=1, size=10) {
    return request.get(BASE_URL + "userinfo/", {
        page, size
    })
};

let user_api = {
    login, logout, tokenCheck, changeAvatar, getAll
};


export {user_api}
