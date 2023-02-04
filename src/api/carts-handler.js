import * as apiHandler from './api-handler';

const url = `${API_URL}carts`; // API_URL is defined in vite.config.js

export function get() {
    return apiHandler.get(`${url}`);
}

export function add(product) {
    return apiHandler.put(`${url}`, product);
}

export function clean() {
    return apiHandler.onDelete(`${url}`);
}