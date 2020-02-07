/*对axios进行二次封装,模拟requests接口*/
import axios from "axios"

const BASE_URL = "********";
const TIMEOUT = 5000;


axios.interceptors.response.use(ret => {
    return ret.data
});
axios.interceptors.request.use(config => {
    if (localStorage.getItem("token")) {
        config.headers.token = localStorage.getItem("token")
    }
    return config;
});

let get = function (url, params = {}, timeout = 0) {
    return axios.get(BASE_URL + url, {
        params,
        timeout: TIMEOUT
    })
};


let post = function (url, data) {
    return axios.post(BASE_URL + url, data, {
        timeout: TIMEOUT
    })
};


let put = function (url, data) {
    return axios.put(BASE_URL + url, data, {
        timeout: TIMEOUT
    })
};

let delete_ = function (url, id) {
    return axios.delete(BASE_URL + url, {
        data: {
            id
        },
        timeout: TIMEOUT
    })
};

let upload = function (file) {
    return  axios.post(BASE_URL + "upload/", file, {
        headers: {'Content-Type': 'multipart/form-data'},
    })
}

let request = {
    get, post, put, delete_
};

export {request}
export {upload}

