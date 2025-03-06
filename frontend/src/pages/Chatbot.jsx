import * as React from 'react';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/common/AppNavbar';
import Header from '../components/common/Header';
import SideMenu from '../components/common/SideMenu';
import AppTheme from '../components/shared-theme/AppTheme';
import Search from '../components/common/Search';
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

export default function ChatbotPage(props) {
    const bankStatement = JSON.parse(sessionStorage.getItem('uploadedStatements'));

    const [question, setQuestion] = React.useState(
        sessionStorage.getItem('chatbotQuestion') || ''
    );
    const [answer, setAnswer] = React.useState(
        sessionStorage.getItem('chatbotAnswer') || ''
    );

    const handleQuestionChange = (event) => {
        const newQuestion = event.target.value;
        setQuestion(newQuestion);
        sessionStorage.setItem('chatbotQuestion', newQuestion);
    };


    const handleAskQuestion = async () => {
        if (!question.trim()) {
            alert('Please enter a question.');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/ask', {
                bank_statement: bankStatement,
                question: question,
            });
            const newAnswer = response.data.answer;
            setAnswer(newAnswer);
            sessionStorage.setItem('chatbotAnswer', newAnswer);
        } catch (error) {
            console.error('Error fetching data:', error);
            setAnswer('An error occurred while fetching the answer.');
            sessionStorage.setItem('chatbotAnswer', 'An error occurred while fetching the answer.');
        }
    };

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

                        <Box sx={{ width: '100%', maxWidth: '600px', mt: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Search value={question} onChange={handleQuestionChange} />
                                <Button
                                    variant="contained"
                                    onClick={handleAskQuestion}
                                    sx={{ width: '20%', ml: 2 }}
                                >
                                    Ask
                                </Button>
                            </Box>
                        </Box>

                        {answer && (
                            <Box sx={{ width: '100%', maxWidth: '600px', mt: 4 }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Answer:
                                </Typography>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                                    {answer}
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </Box>
            </Box>
        </AppTheme>
    );
}