import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const uploadStatement = (formData) => {
    return api.post('/statements/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};