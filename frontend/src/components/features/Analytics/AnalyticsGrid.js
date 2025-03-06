import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HighlightedCard from './HighlightedCard';
import StatCard from './StatCard';
import WeeklySpendingBarChart from './WeeklySpendingBarChart';
import CategorySpendingPieChart from './CategorySpendingPieChart';
import IncomeExpenseLineChart from './IncomeExpenseLineChart';
import { Button } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function AnalyticsGrid({ analyticsData }) {
  if (!analyticsData) {
    return <Typography>No analytics data found</Typography>;
  }

  const lastCumulativeSpending = analyticsData.cumulativeSpending[analyticsData.cumulativeSpending.length - 1];

  const statCardsData = [
    {
      title: 'Net Balance Growth',
      value: `£${analyticsData.netBalanceGrowth[analyticsData.netBalanceGrowth.length - 1].toFixed(2)}`,
      interval: `Over ${analyticsData.dailyTransactions.length} days`,
      trend: `${analyticsData.netBalanceTrend}`,
      trendValue: `${analyticsData.netBalancePercentageChange}`,
      data: analyticsData.netBalanceGrowth,
      daysMonth: analyticsData.netBalanceGrowth.length,
      date: analyticsData.date
    },
    {
      title: 'Cumulative Spending',
      value: `£${analyticsData.cumulativeSpending[analyticsData.cumulativeSpending.length - 1].toFixed(2)}`,
      interval: `Over ${analyticsData.dailyTransactions.length} days`,
      trend: `down`,
      trendValue: `${analyticsData.cumulativeSpendingPercentageChange}`,
      data: analyticsData.cumulativeSpending,
      daysMonth: analyticsData.cumulativeSpending.length,
      date: analyticsData.date
    },
    {
      title: 'Daily Transactions',
      value: analyticsData.dailyTransactions.reduce((sum, count) => sum + count, 0).toString(),
      interval: `Over ${analyticsData.dailyTransactions.length} days`,
      trend: `neutral`,
      trendValue: `${analyticsData.dailyTransactionsPercentageChange}`,
      data: analyticsData.dailyTransactions,
      date: analyticsData.date
    },
  ];

  const handleExportPDF = async () => {
    const input = document.getElementById('analytics-grid');
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('analytics-report.pdf');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Analytics
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleExportPDF}
            sx={{ mb: 2 }}
          >
            Export Analytics (.pdf)
          </Button>
        </Grid>
      </Grid>

      <Box id="analytics-grid">
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <HighlightedCard />
          </Grid>

          {statCardsData.map((card, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard {...card} />
            </Grid>
          ))}

          <Grid size={{ xs: 12, md: 6 }}>
            <IncomeExpenseLineChart daysMonth={analyticsData.dailyTransactions.length} date={analyticsData.date} incomeVsExpense={analyticsData.incomeVsExpense} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <WeeklySpendingBarChart weeklySpendings={analyticsData.weeklySpendingByCategory} daysMonth={analyticsData.dailyTransactions.length} />
          </Grid>
          <CategorySpendingPieChart overallSpendingsByCategory={analyticsData.overallSpendingByCategory} totalSpendings={lastCumulativeSpending} percentageContributions={analyticsData.percentageContributionByCategory} />
        </Grid>
      </Box>
    </Box>
  );
}