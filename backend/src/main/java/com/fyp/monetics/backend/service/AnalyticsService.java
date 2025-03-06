package com.fyp.monetics.backend.service;

import com.fyp.monetics.backend.model.AnalyticsData;
import com.fyp.monetics.backend.model.DateInfo;
import com.fyp.monetics.backend.model.Transaction;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.time.YearMonth;

@Service
public class AnalyticsService {
    private double roundToTwoDecimalPlaces(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

    private double calculatePercentageChange(double initialValue, double finalValue) {
        if (initialValue == 0) {
            return 0.0; // Avoid division by zero
        }

        return Math.round(Math.abs((finalValue - initialValue) / initialValue) * 100);
    }

    private Map<String, Double> calculatePercentageContributionByCategory(Map<String, Double> overallSpendingByCategory) {
        double totalExpenses = overallSpendingByCategory.values().stream()
                .mapToDouble(Double::doubleValue)
                .sum();

        Map<String, Double> percentageContributionByCategory = new HashMap<>();
        for (Map.Entry<String, Double> entry : overallSpendingByCategory.entrySet()) {
            String category = entry.getKey();
            double spending = entry.getValue();
            double percentageContribution = (spending / totalExpenses) * 100;
            percentageContributionByCategory.put(category, roundToTwoDecimalPlaces(percentageContribution));
        }

        return percentageContributionByCategory;
    }

    public AnalyticsData calculateAnalytics(List<Transaction> transactions) {
        AnalyticsData analyticsData = new AnalyticsData();

        // Sort transactions by date
        transactions.sort(Comparator.comparing(Transaction::getDate));

        LocalDate firstDate = transactions.get(0).getDate();
        int month = firstDate.getMonthValue();
        int year = firstDate.getYear();

        analyticsData.setDate(new DateInfo(month, year));

        YearMonth yearMonth = YearMonth.from(firstDate);
        int daysInMonth = yearMonth.lengthOfMonth();

        Map<LocalDate, Double> dailyBalance = new LinkedHashMap<>();
        Map<LocalDate, Double> dailySpending = new LinkedHashMap<>();
        Map<LocalDate, Integer> dailyTransactionCount = new LinkedHashMap<>();
        Map<LocalDate, Double> dailyIncome = new LinkedHashMap<>();
        Map<LocalDate, Double> dailyExpense = new LinkedHashMap<>();


        for (int day = 1; day <= daysInMonth; day++) {
            LocalDate date = yearMonth.atDay(day);
            dailyBalance.put(date, 0.0);
            dailySpending.put(date, 0.0);
            dailyTransactionCount.put(date, 0);
            dailyIncome.put(date, 0.0);
            dailyExpense.put(date, 0.0);
        }

        // Process transactions
        for (Transaction t : transactions) {
            LocalDate date = t.getDate();
            double amount = t.getAmount();

            dailyBalance.put(date, t.getBalance());

            if (amount < 0) {
                dailySpending.put(date, dailySpending.get(date) + Math.abs(amount));
            }

            dailyTransactionCount.put(date, dailyTransactionCount.get(date) + 1);

            if (amount > 0) {
                dailyIncome.put(date, dailyIncome.get(date) + amount);
            } else {
                dailyExpense.put(date, dailyExpense.get(date) + Math.abs(amount));
            }
        }

        // Net Balance Growth
        List<Double> netBalanceGrowth = new ArrayList<>();
        double lastBalance = 0.0;
        for (int day = 1; day <= daysInMonth; day++) {
            LocalDate date = yearMonth.atDay(day);
            double balance = dailyBalance.get(date);

            if (balance == 0.0) {
                balance = lastBalance;
            } else {
                lastBalance = balance;
            }

            netBalanceGrowth.add(roundToTwoDecimalPlaces(balance));
        }

        double netBalanceInitial = netBalanceGrowth.getFirst();
        double netBalanceFinal = netBalanceGrowth.getLast();
        double netBalancePercentageChange = calculatePercentageChange(netBalanceInitial, netBalanceFinal);
        String netBalanceTrend = netBalanceFinal > netBalanceInitial ? "up" : (netBalanceFinal < netBalanceInitial ? "down" : "neutral");

        analyticsData.setNetBalanceGrowth(netBalanceGrowth);
        analyticsData.setNetBalancePercentageChange(roundToTwoDecimalPlaces(netBalancePercentageChange));
        analyticsData.setNetBalanceTrend(netBalanceTrend);

        // Cumulative Spending
        List<Double> cumulativeSpending = new ArrayList<>();
        double cumulativeSum = 0;
        for (double spending : dailySpending.values()) {
            cumulativeSum += spending;
            cumulativeSpending.add(roundToTwoDecimalPlaces(cumulativeSum));
        }

        double cumulativeSpendingInitial = cumulativeSpending.get(0);
        double cumulativeSpendingFinal = cumulativeSpending.get(cumulativeSpending.size() - 1);
        double cumulativeSpendingPercentageChange = calculatePercentageChange(cumulativeSpendingInitial, cumulativeSpendingFinal);
        String cumulativeSpendingTrend = cumulativeSpendingFinal > cumulativeSpendingInitial ? "up" : (cumulativeSpendingFinal < cumulativeSpendingInitial ? "down" : "neutral");

        analyticsData.setCumulativeSpending(cumulativeSpending);
        analyticsData.setCumulativeSpendingPercentageChange(roundToTwoDecimalPlaces(cumulativeSpendingPercentageChange));
        analyticsData.setCumulativeSpendingTrend(cumulativeSpendingTrend);

        // Daily Transactions
        List<Integer> dailyTransactions = new ArrayList<>(dailyTransactionCount.values());

        int dailyTransactionsInitial = dailyTransactions.get(0);
        int dailyTransactionsFinal = dailyTransactions.get(dailyTransactions.size() - 1);
        double dailyTransactionsPercentageChange = calculatePercentageChange(dailyTransactionsInitial, dailyTransactionsFinal);
        String dailyTransactionsTrend = dailyTransactionsFinal > dailyTransactionsInitial ? "up" : (dailyTransactionsFinal < dailyTransactionsInitial ? "down" : "neutral");

        analyticsData.setDailyTransactions(dailyTransactions);
        analyticsData.setDailyTransactionsPercentageChange(roundToTwoDecimalPlaces(dailyTransactionsPercentageChange));
        analyticsData.setDailyTransactionsTrend(dailyTransactionsTrend);

        // Income vs Expense Over Time (Cumulative)
        Map<String, List<Double>> incomeVsExpense = new HashMap<>();
        List<Double> cumulativeIncome = new ArrayList<>();
        List<Double> cumulativeExpense = new ArrayList<>();
        double incomeSum = 0;
        double expenseSum = 0;
        for (LocalDate date : dailyIncome.keySet()) {
            incomeSum += dailyIncome.get(date);
            expenseSum += dailyExpense.get(date);
            cumulativeIncome.add(roundToTwoDecimalPlaces(incomeSum));
            cumulativeExpense.add(roundToTwoDecimalPlaces(expenseSum));
        }
        incomeVsExpense.put("Income", cumulativeIncome);
        incomeVsExpense.put("Expense", cumulativeExpense);
        analyticsData.setIncomeVsExpense(incomeVsExpense);

        // Weekly Spending by Category
        Map<String, Map<Integer, Double>> weeklySpendingByCategory = new HashMap<>();

        Set<String> categories = transactions.stream()
                .map(Transaction::getSpendingCategory)
                .collect(Collectors.toSet());

        for (String category : categories) {
            Map<Integer, Double> weeklyData = new HashMap<>();
            for (int week = 1; week <= 5; week++) {
                weeklyData.put(week, 0.0);
            }
            weeklySpendingByCategory.put(category, weeklyData);
        }

        // Process transactions
        for (Transaction t : transactions) {
            if (t.getAmount() < 0) {
                LocalDate date = t.getDate();
                int weekOfMonth = (date.getDayOfMonth() - 1) / 7 + 1;
                String category = t.getSpendingCategory();
                double amount = Math.abs(t.getAmount());

                weeklySpendingByCategory.get(category).merge(weekOfMonth, roundToTwoDecimalPlaces(amount), Double::sum);
            }
        }

        analyticsData.setWeeklySpendingByCategory(weeklySpendingByCategory);

        // Overall Spending by Category
        Map<String, Double> overallSpendingByCategory = transactions.stream()
                .filter(t -> t.getAmount() < 0)
                .collect(Collectors.groupingBy(
                        Transaction::getSpendingCategory,
                        Collectors.collectingAndThen(
                                Collectors.summingDouble(t -> Math.abs(t.getAmount())),
                                this::roundToTwoDecimalPlaces
                        )
                ));
        analyticsData.setOverallSpendingByCategory(overallSpendingByCategory);

        // Percentage Contribution by Category
        Map<String, Double> percentageContributionByCategory = calculatePercentageContributionByCategory(overallSpendingByCategory);
        analyticsData.setPercentageContributionByCategory(percentageContributionByCategory);

        return analyticsData;
    }
}
