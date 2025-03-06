package com.fyp.monetics.backend.controller;

import com.fyp.monetics.backend.model.AnalyticsData;
import com.fyp.monetics.backend.model.Transaction;
import com.fyp.monetics.backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @PostMapping("/calculate")
    public AnalyticsData calculateAnalytics(@RequestBody List<Transaction> transactions) {
        return analyticsService.calculateAnalytics(transactions);
    }
}
