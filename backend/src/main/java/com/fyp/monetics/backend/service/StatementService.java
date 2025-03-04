package com.fyp.monetics.backend.service;
import com.fyp.monetics.backend.exception.InvalidFileException;
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

    public List<Transaction> processStatement(MultipartFile file) throws IOException, InvalidFileException {

        List<Transaction> transactions = csvParserService.parseCsv(file);
        return categorizationService.categorizeTransactions(transactions);
    }
}
