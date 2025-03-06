package com.fyp.monetics.backend.model;

import java.util.List;
import java.util.Map;

public class AnalyticsData {
    private List<Double> netBalanceGrowth;
    private double netBalancePercentageChange;
    private String netBalanceTrend;

    private List<Double> cumulativeSpending;
    private double cumulativeSpendingPercentageChange;
    private String cumulativeSpendingTrend;

    private List<Integer> dailyTransactions;
    private double dailyTransactionsPercentageChange;
    private String dailyTransactionsTrend;

    private Map<String, List<Double>> incomeVsExpense;
    private Map<String, Map<Integer, Double>> weeklySpendingByCategory;
    private Map<String, Double> overallSpendingByCategory;

    private Map<String, Double> percentageContributionByCategory;

    private DateInfo date;

    // Getters and setters
    public AnalyticsData() {
    }

    public Map<String, Double> getPercentageContributionByCategory() {
        return percentageContributionByCategory;
    }

    public void setPercentageContributionByCategory(Map<String, Double> percentageContributionByCategory) {
        this.percentageContributionByCategory = percentageContributionByCategory;
    }

    public DateInfo getDate() {
        return date;
    }

    public void setDate(DateInfo date) {
        this.date = date;
    }

    public List<Double> getNetBalanceGrowth() {
        return netBalanceGrowth;
    }
    public void setNetBalanceGrowth(List<Double> netBalanceGrowth) {
        this.netBalanceGrowth = netBalanceGrowth;
    }
    public List<Double> getCumulativeSpending() {
        return cumulativeSpending;
    }
    public void setCumulativeSpending(List<Double> cumulativeSpending) {
        this.cumulativeSpending = cumulativeSpending;
    }
    public List<Integer> getDailyTransactions() {
        return dailyTransactions;
    }
    public void setDailyTransactions(List<Integer> dailyTransactions) {
        this.dailyTransactions = dailyTransactions;
    }
    public Map<String, List<Double>> getIncomeVsExpense() {
        return incomeVsExpense;
    }
    public void setIncomeVsExpense(Map<String, List<Double>> incomeVsExpense) {
        this.incomeVsExpense = incomeVsExpense;
    }
    public Map<String, Map<Integer, Double>> getWeeklySpendingByCategory() {
        return weeklySpendingByCategory;
    }
    public void setWeeklySpendingByCategory(Map<String, Map<Integer, Double>> weeklySpendingByCategory) {
        this.weeklySpendingByCategory = weeklySpendingByCategory;
    }
    public Map<String, Double> getOverallSpendingByCategory() {
        return overallSpendingByCategory;
    }
    public void setOverallSpendingByCategory(Map<String, Double> overallSpendingByCategory) {
        this.overallSpendingByCategory = overallSpendingByCategory;
    }
    public double getNetBalancePercentageChange() {
        return netBalancePercentageChange;
    }
    public void setNetBalancePercentageChange(double netBalancePercentageChange) {
        this.netBalancePercentageChange = netBalancePercentageChange;
    }
    public double getCumulativeSpendingPercentageChange() {
        return cumulativeSpendingPercentageChange;
    }
    public void setCumulativeSpendingPercentageChange(double cumulativeSpendingPercentageChange) {
        this.cumulativeSpendingPercentageChange = cumulativeSpendingPercentageChange;
    }
    public double getDailyTransactionsPercentageChange() {
        return dailyTransactionsPercentageChange;
    }
    public void setDailyTransactionsPercentageChange(double dailyTransactionsPercentageChange) {
        this.dailyTransactionsPercentageChange = dailyTransactionsPercentageChange;
    }
    public String getNetBalanceTrend() {
        return netBalanceTrend;
    }
    public void setNetBalanceTrend(String netBalanceTrend) {
        this.netBalanceTrend = netBalanceTrend;
    }
    public String getCumulativeSpendingTrend() {
        return cumulativeSpendingTrend;
    }
    public void setCumulativeSpendingTrend(String cumulativeSpendingTrend) {
        this.cumulativeSpendingTrend = cumulativeSpendingTrend;
    }
    public String getDailyTransactionsTrend() {
        return dailyTransactionsTrend;
    }
    public void setDailyTransactionsTrend(String dailyTransactionsTrend) {
        this.dailyTransactionsTrend = dailyTransactionsTrend;
    }
}
