import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3333",
    validateStatus: (status) => {
        return status >= 200 && status < 500; // In order to avoid throwing exceptions on 4xx codes
    },
});

export default api;