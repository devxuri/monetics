package com.fyp.monetics.backend.service;
import com.fyp.monetics.backend.exception.InvalidFileException;
import com.fyp.monetics.backend.model.Transaction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

// CsvParserService.java
@Service
public class CsvParserService {

    public List<Transaction> parseCsv(MultipartFile file) throws IOException, InvalidFileException {
        List<Transaction> transactions = new ArrayList<>();

        try (Reader reader = new InputStreamReader(file.getInputStream());
             CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {

            for (CSVRecord record : csvParser) {
                Transaction transaction = new Transaction();
                transaction.setDate(LocalDate.parse(record.get("Date"))); // Throws DateTimeParseException
                transaction.setDescription(record.get("Description"));
                transaction.setAmount(Double.parseDouble(record.get("Amount"))); // Throws NumberFormatException
                transactions.add(transaction);
            }
        } catch (DateTimeParseException | NumberFormatException e) {
            throw new InvalidFileException("Invalid CSV file format: " + e.getMessage(), e);
        } catch (IOException e) {
            throw new InvalidFileException("Failed to read the file: " + e.getMessage(), e);
        }

        return transactions;
    }
}