package com.fyp.monetics.backend.model;

public class DateInfo {
    private int month;
    private int year;

    public DateInfo(int month, int year) {
        this.month = month;
        this.year = year;
    }

    // Getters and setters
    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
