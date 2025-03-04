package com.fyp.monetics.backend.service;

import com.fyp.monetics.backend.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CategorizationService {

    private static final Map<String, List<String>> CATEGORY_RULES = Map.of(
            "Groceries", List.of("tesco", "fresh", "supermarket", "morrisons"),
            "Entertainment", List.of("cine", "netflix", "spotify", "ice skating"),
            "Transport", List.of("tfl", "travel", "train"),
            "Restaurants", List.of("pizza", "domino", "udon", "pret", "subway", "rice and curry")
    );

    public List<Transaction> categorizeTransactions(List<Transaction> transactions) {
        return transactions.stream()
                .map(transaction -> {
                    String category = determineCategory(transaction.getType(), transaction.getCounterParty(), transaction.getReference());
                    transaction.setSpendingCategory(category);
                    System.out.println("Transaction: "
                            + transaction.getCounterParty() + " -> Category: " + category);

                    return transaction;
                })
                .collect(Collectors.toList());
    }

    private String determineCategory(String type, String counterParty, String reference) {
        // RULE 1: Check type priority
        if ("CARD SUBSCRIPTION".equalsIgnoreCase(type)) {
            return "Subscription";
        } else if ("FASTER PAYMENT".equalsIgnoreCase(type)) {
            return "Payments";
        }

        // RULE 2: Match counterParty & reference against category rules
        String combinedText = (counterParty + " " + reference).toLowerCase();
        String matchedCategory = CATEGORY_RULES.entrySet().stream()
                .filter(entry -> entry.getValue().stream()
                        .anyMatch(keyword -> combinedText.contains(keyword)))
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);

        // RULE 3: Default uncat if none matches
        return matchedCategory != null ? matchedCategory : "Uncategorized";
    }
}