import React, { useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { uploadStatement } from '../../../services/api';
import Papa from 'papaparse';
import axios from 'axios';
import AppTheme from '../../shared-theme/AppTheme';
import App from '../../../App';

export default function CsvUploader({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            Papa.parse(selectedFile, {
                complete: (results) => {
                    console.log('Parsed CSV data:', results.data);
                },
                header: true,
            });
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/statements/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUploadSuccess(response.data);
        } catch (err) {
            console.error('Upload error:', err);
            console.error('Error response:', err.response);
            setError(err.response?.data || err.message || 'Failed to upload file. Please try again.');
        }
    };

    return (
        <AppTheme>
            <div>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    disabled={isLoading}
                    style={{ display: 'none' }}
                    id="csv-upload"
                />
                <label htmlFor="csv-upload">
                    <Button variant="contained" component="span" disabled={isLoading}>
                        Choose File
                    </Button>
                </label>
                {file && <Typography>{file.name}</Typography>}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!file || isLoading}
                    startIcon={isLoading && <CircularProgress size={20} />}
                >
                    Upload
                </Button>
                {error && <Typography color="error">{error}</Typography>}
            </div>
        </AppTheme>
    );
}