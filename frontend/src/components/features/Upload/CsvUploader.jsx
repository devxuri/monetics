import React, { useState } from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import Papa from 'papaparse';
import axios from 'axios';
import AppTheme from '../../shared-theme/AppTheme';

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

            handleUpload(selectedFile);
        }
    };

    const handleUpload = async (fileToUpload) => {
        if (!fileToUpload) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', fileToUpload);

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/statements/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUploadSuccess(response.data);
            sessionStorage.setItem('uploadedStatements', JSON.stringify(response.data));
        } catch (err) {
            console.error('Upload error:', err);
            console.error('Error response:', err.response);
            setError(err.response?.data || err.message || 'Failed to upload file. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppTheme>
            <Box
                sx={{
                    border: '2px dashed grey',
                    padding: '20px',
                    textAlign: 'center',
                    width: '300px',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
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
                {isLoading && <CircularProgress size={20} />}
                {error && <Typography color="error">{error}</Typography>}
            </Box>
        </AppTheme>
    );
}