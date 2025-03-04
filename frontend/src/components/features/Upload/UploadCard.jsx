import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CsvUploader from './CsvUploader';
import AppTheme from '../../shared-theme/AppTheme';

export default function UploadCard() {
    const [transactions, setTransactions] = useState([]);

    const handleUploadSuccess = (data) => {
        setTransactions(data);
        console.log('Categorized Transactions:', data);
    };

    return (
        <AppTheme>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Upload File
                    </Typography>
                    <CsvUploader onUploadSuccess={handleUploadSuccess} />
                </CardContent>
            </Card>
        </AppTheme>
    );
}