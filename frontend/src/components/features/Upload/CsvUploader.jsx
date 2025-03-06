import React, { useState } from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import Papa from 'papaparse';
import { uploadStatement } from '../../../services/api';
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
            const data = await uploadStatement(formData);
            onUploadSuccess(data);
            sessionStorage.setItem('uploadedStatements', JSON.stringify(data));
        } catch (err) {
            setError(err.message);
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