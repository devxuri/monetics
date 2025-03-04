package com.fyp.monetics.backend.service;
import com.fyp.monetics.backend.exception.InvalidFileException;
import com.fyp.monetics.backend.model.Transaction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CsvParserService {
    private static final Logger logger = LoggerFactory.getLogger(CsvParserService.class);
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    public List<Transaction> parseCsv(MultipartFile file) throws IOException, InvalidFileException {
        logger.info("Parsing CSV file: {}", file.getOriginalFilename());

        List<Transaction> transactions = new ArrayList<>();

        try (Reader reader = new InputStreamReader(file.getInputStream());
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            for (CSVRecord record : csvParser) {
                logger.debug("Processing record: {}", record);
                Transaction transaction = new Transaction();

                if (record.isSet("Date") && !record.get("Date").isEmpty()) {
                    try {
                        transaction.setDate(LocalDate.parse(record.get("Date"), DATE_FORMATTER));
                    } catch (DateTimeParseException e) {
                        logger.error("Invalid date format in record: {}", record.get("Date"), e);
                        throw new InvalidFileException("Invalid date format: " + record.get("Date"), e);
                    }
                } else {
                    transaction.setDate(null);
                }

                transaction.setCounterParty(record.isSet("Counter Party") ? record.get("Counter Party") : "");
                transaction.setReference(record.isSet("Reference") ? record.get("Reference") : "");
                transaction.setType(record.isSet("Type") ? record.get("Type") : "");
                transaction.setAmount(record.isSet("Amount (GBP)") ? Double.parseDouble(record.get("Amount (GBP)")) : 0.0);
                transaction.setBalance(record.isSet("Balance (GBP)") ? Double.parseDouble(record.get("Balance (GBP)")) : 0.0);
                transaction.setNotes(record.isSet("Notes") ? record.get("Notes") : "");
                transaction.setSpendingCategory("");
                transactions.add(transaction);
            }
        } catch (Exception e) {
            logger.error("Error parsing CSV file: {}", e.getMessage(), e);
            throw new InvalidFileException("Invalid CSV file format: " + e.getMessage(), e);
        }

        logger.info("Successfully parsed {} transactions", transactions.size());
        return transactions;
    }
}