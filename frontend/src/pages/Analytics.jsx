import * as React from 'react';
import { useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/common/AppNavbar';
import Header from '../components/common/Header';
import AnalyticsGrid from '../components/features/Analytics/AnalyticsGrid';
import SideMenu from '../components/common/SideMenu';
import AppTheme from '../components/shared-theme/AppTheme';
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
    useEffect(() => {
        const uploadedStatements = sessionStorage.getItem('uploadedStatements');
        if (uploadedStatements) {
            console.log('Uploaded Statements:', JSON.parse(uploadedStatements));
        }
    }, []);
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
                        <AnalyticsGrid />
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}
