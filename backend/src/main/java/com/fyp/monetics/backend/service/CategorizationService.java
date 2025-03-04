package com.fyp.monetics.backend.service;
import com.fyp.monetics.backend.model.CategorizedTransaction;
import com.fyp.monetics.backend.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CategorizationService {

    private static final Map<String, List<String>> CATEGORY_RULES = Map.of(
            "Groceries", List.of("supermarket", "grocery", "mart"),
            "Entertainment", List.of("cine", "netflix", "spotify"),
            "Utilities", List.of("electric", "water", "gas")
    );

    public List<CategorizedTransaction> categorizeTransactions(List<Transaction> transactions) {
        return transactions.stream()
                .map(transaction -> {
                    CategorizedTransaction categorized = new CategorizedTransaction(transaction);
                    categorized.setCategory(determineCategory(transaction.getDescription()));
                    return categorized;
                })
                .collect(Collectors.toList());
    }

    private String determineCategory(String description) {
        return CATEGORY_RULES.entrySet().stream()
                .filter(entry -> entry.getValue().stream()
                        .anyMatch(keyword -> description.toLowerCase().contains(keyword)))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse("Uncategorized");
    }
}
