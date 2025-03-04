import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CsvUploader from './CsvUploader';

export default function UploadCard() {
    const [transactions, setTransactions] = useState([]);

    const handleUploadSuccess = (data) => {
        setTransactions(data);
        console.log('Categorized Transactions:', data);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Upload Bank Statement</Typography>
                <CsvUploader onUploadSuccess={handleUploadSuccess} />
            </CardContent>
        </Card>
    );
}