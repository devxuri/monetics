package com.fyp.monetics.backend.model;

import java.time.LocalDate;

public class Transaction {
    private LocalDate date;
    private String counterParty;
    private String reference;
    private String type;
    private double amount;
    private double balance;
    private String notes;
    private String spendingCategory;

    public Transaction(LocalDate date, String counterParty, String reference, String type,
                       double amount, double balance, String notes) {
        this.date = date;
        this.counterParty = counterParty;
        this.reference = reference;
        this.type = type;
        this.amount = amount;
        this.balance = balance;
        this.notes = notes;
        this.spendingCategory = "";
    }

    public Transaction() {}

    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCounterParty() {
        return counterParty;
    }
    public void setCounterParty(String counterParty) {
        this.counterParty = counterParty;
    }

    public String getReference() {
        return reference;
    }
    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getBalance() {
        return balance;
    }
    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getSpendingCategory() {
        return spendingCategory;
    }
    public void setSpendingCategory(String spendingCategory) {
        this.spendingCategory = spendingCategory;
    }
}