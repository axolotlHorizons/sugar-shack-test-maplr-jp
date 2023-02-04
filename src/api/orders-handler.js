import * as apiHandler from './api-handler';

const url = `${API_URL}orders`; // API_URL is defined in vite.config.js

export function addOrder(order) {
    return apiHandler.post(`${url}`, order);
}