import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const uploadStatement = async (formData) => {
    try {
        const response = await api.post('/statements/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (err) {
        console.error('Upload error:', err);
        console.error('Error response:', err.response);
        throw new Error(err.response?.data || err.message || 'Failed to upload file. Please try again.');
    }
};

export const calculateAnalytics = async (transactions) => {
    try {
        const response = await api.post('/analytics/calculate', transactions);
        return response.data;
    } catch (err) {
        console.error('Analytics calculation error:', err);
        console.error('Error response:', err.response);
        throw new Error(err.response?.data || err.message || 'Failed to calculate analytics. Please try again.');
    }
};