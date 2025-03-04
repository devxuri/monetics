package com.fyp.monetics.backend.model;

import java.time.LocalDate;

// CategorizedTransaction.java (extends Transaction)
public class CategorizedTransaction extends Transaction {
    private String category;

    public CategorizedTransaction(LocalDate date, String description, double amount, String category) {
        super(date, description, amount);
        this.category = category;
    }
    public CategorizedTransaction() {}

    public CategorizedTransaction(Transaction transaction) {
    }

    @Override
    public String getCategory() {
        return category;
    }

    @Override
    public void setCategory(String category) {
        this.category = category;
    }
}
