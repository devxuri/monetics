import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/common/AppNavbar';
import Header from '../components/common/Header';
import AnalyticsGrid from '../components/features/Analytics/AnalyticsGrid';
import SideMenu from '../components/common/SideMenu';
import AppTheme from '../components/shared-theme/AppTheme';
import { calculateAnalytics } from '../services/api';
import {
    chartsCustomizations,
    dataGridCustomizations,
    datePickersCustomizations,
    treeViewCustomizations,
} from '../components/theme/customizations';

const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
};

export default function DashboardPage(props) {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const transactions = JSON.parse(sessionStorage.getItem('uploadedStatements')) || [];
        console.log('Transactions:', transactions);

        const fetchAnalytics = async () => {
            try {
                const data = await calculateAnalytics(transactions);
                setAnalyticsData(data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (analyticsData) {
        console.log(analyticsData);
    }

    return (
        <AppTheme {...props} themeComponents={xThemeComponents}>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                <SideMenu />
                <AppNavbar />
                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : alpha(theme.palette.background.default, 1),
                        overflow: 'auto',
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <AnalyticsGrid analyticsData={analyticsData} />
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}
