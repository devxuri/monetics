import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TransactionsDataGrid from './TransactionsDataGrid';
import CategoriesView from './CategoriesView';
import { Button } from '@mui/material';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';


export default function TransactionsGrid() {
    const handleExport = () => {
        const uploadedStatements = JSON.parse(sessionStorage.getItem('uploadedStatements')) || [];
        if (uploadedStatements.length === 0) {
            return;
        }
        const csv = Papa.unparse(uploadedStatements, {
            header: true,
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'monetics-statements.csv');
    };

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                        Transactions
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={handleExport}
                        sx={{ mb: 2 }}
                    >
                        Export Transactions (.csv)
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <TransactionsDataGrid />
                </Grid>
                <Grid size={{ xs: 12, lg: 3 }}>
                    <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
                        <CategoriesView />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
