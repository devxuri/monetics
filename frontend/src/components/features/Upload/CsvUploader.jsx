import React, { useState } from 'react';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import Papa from 'papaparse';
import { uploadStatement } from '../../../services/api';
import AppTheme from '../../shared-theme/AppTheme';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';

export default function CsvUploader({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const chatbotAnswer = 'I can help you analyze your bank statement. You can ask me specific questions about your transactions, like identifying spending patterns, total amounts spent in particular categories, or any other specific information you need. What would you like to know?';

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            Papa.parse(selectedFile, { // Parsing the uploaded bank statement into CSV
                complete: (results) => {
                    console.log('Parsed CSV data:', results.data);
                },
                header: true,
            });

            handleStatementUpload(selectedFile);
        }
    };

    const handleStatementUpload = async (fileToUpload) => {
        if (!fileToUpload) {
            setError('Please select a file'); // Provide feedback to no file selected
            return;
        }

        const formData = new FormData();
        formData.append('file', fileToUpload); // Conversion for api backend acceptance

        setIsLoading(true);
        setError('');

        try {
            const data = await uploadStatement(formData); // API service call for upload
            onUploadSuccess(data);
            sessionStorage.setItem('uploadedStatements', JSON.stringify(data)); // Session storage initialisation
            sessionStorage.setItem('chatbotQuestion', 'What can you do?');
            sessionStorage.setItem('chatbotAnswer', chatbotAnswer);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppTheme>
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <FileUploadRounded />
                            <Typography
                                component="h2"
                                variant="subtitle2"
                                gutterBottom
                                sx={{ fontWeight: '600' }}
                            >
                                Upload a bank statement
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
                                File must be in .csv format
                            </Typography>
                        </Box>
                        <Box>
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
                        </Box>
                    </Box>

                    {file && (
                        <Box
                            sx={{
                                border: '1px solid grey',
                                borderRadius: '4px',
                                padding: '8px',
                                width: '100%',
                                textAlign: 'center',
                                mt: 2,
                            }}
                        >
                            <Typography>{file.name}</Typography>
                        </Box>
                    )}

                    {isLoading && <CircularProgress size={20} sx={{ mt: 2 }} />}

                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </AppTheme>
    );
}