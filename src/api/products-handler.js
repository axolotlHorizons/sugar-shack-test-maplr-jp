import * as apiHandler from './api-handler';

const url = `${API_URL}products`; // API_URL is defined in vite.config.js

export function get(type) {
    return type === undefined ?
        apiHandler.get(`${url}`) :
        apiHandler.get(`${url}?type=${type}`);
}

export function getOne(id) {
    return apiHandler.get(`${url}/${id}`);
}