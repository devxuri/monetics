import React, { useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { uploadStatement } from '../../../services/api';

export default function CsvUploader({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadStatement(formData);
            onUploadSuccess(response.data);
        } catch (err) {
            setError('Failed to upload file. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
    );
}