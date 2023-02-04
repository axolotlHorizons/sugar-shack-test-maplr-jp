import axios from 'axios';

const computeHeaders = () => {
    return {'Content-Type': 'application/json'};
};

export function get(url) {
    return axios({
        method: 'get',
        url: url,
        headers: computeHeaders(),
    });
}

export function onDelete (url, data = {}) {
    return axios({
        method: 'delete',
        url: url,
        headers: computeHeaders()
    });
}

export function post (url, data = {}) {
    return axios({
        method: 'post',
        url: url,
        headers: computeHeaders(),
        data
    });
}

export function put (url, data = {}) {
    return axios({
        method: 'put',
        url: url,
        headers: computeHeaders(),
        data
    });
}