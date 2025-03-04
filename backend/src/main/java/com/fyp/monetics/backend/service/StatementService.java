package com.fyp.monetics.backend.service;
import com.fyp.monetics.backend.exception.InvalidFileException;
import com.fyp.monetics.backend.model.CategorizedTransaction;
import com.fyp.monetics.backend.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class StatementService {

    @Autowired
    private CsvParserService csvParserService;

    @Autowired
    private CategorizationService categorizationService;

    public List<CategorizedTransaction> processStatement(MultipartFile file) throws IOException, InvalidFileException {
        // Step 1: Parse CSV
        List<Transaction> transactions = csvParserService.parseCsv(file);

        // Step 2: Categorize transactions
        return categorizationService.categorizeTransactions(transactions);
    }
}
