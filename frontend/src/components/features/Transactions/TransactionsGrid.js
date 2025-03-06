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

const data = [
    {
        title: 'Users',
        value: '14k',
        interval: 'Last 30 days',
        trend: 'up',
        data: [
            200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
            360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
        ],
    },
    {
        title: 'Conversions',
        value: '325',
        interval: 'Last 30 days',
        trend: 'down',
        data: [
            1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
            780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
        ],
    },
    {
        title: 'Event count',
        value: '200k',
        interval: 'Last 30 days',
        trend: 'neutral',
        data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
            520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
        ],
    },
];

export default function TransactionsGrid() {
    const uploadedStatements = JSON.parse(sessionStorage.getItem('uploadedStatements')) || [];

    const handleExport = () => {
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
