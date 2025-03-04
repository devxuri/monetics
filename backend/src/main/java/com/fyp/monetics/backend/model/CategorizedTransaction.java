package com.fyp.monetics.backend.model;

import java.time.LocalDate;

public class CategorizedTransaction extends Transaction {
    private String spendingCategory; // Renamed to match the CSV column

    public CategorizedTransaction(LocalDate date, String counterParty, String reference, String type,
            double amount, double balance, String notes, String spendingCategory) {
        super(date, counterParty, reference, type, amount, balance, notes);
        this.spendingCategory = spendingCategory;
    }

    public CategorizedTransaction() {
    }

    public CategorizedTransaction(Transaction transaction) {
        super(transaction.getDate(), transaction.getCounterParty(), transaction.getReference(),
                transaction.getType(), transaction.getAmount(), transaction.getBalance(),
                transaction.getNotes());
        this.spendingCategory = ""; // empty initialized
    }

    public String getSpendingCategory() {
        return spendingCategory;
    }

    public void setSpendingCategory(String spendingCategory) {
        this.spendingCategory = spendingCategory;
    }

    @Override
    public String toString() {
        return "CategorizedTransaction{" +
                "date=" + getDate() +
                ", counterParty='" + getCounterParty() + '\'' +
                ", reference='" + getReference() + '\'' +
                ", type='" + getType() + '\'' +
                ", amount=" + getAmount() +
                ", balance=" + getBalance() +
                ", notes='" + getNotes() + '\'' +
                ", spendingCategory='" + spendingCategory + '\'' +
                '}';
    }
}