package com.fyp.monetics.backend.controller;

import com.fyp.monetics.backend.model.Transaction;
import com.fyp.monetics.backend.service.CsvParserService;
import com.fyp.monetics.backend.service.StatementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/statements")
@CrossOrigin(origins = "http://localhost:3000")
public class StatementController {
    private static final Logger logger = LoggerFactory.getLogger(StatementController.class);

    @Autowired
    private StatementService statementService;

    @Autowired
    private CsvParserService csvParserService;

    @GetMapping("/test")
    public ResponseEntity<Boolean> getTest() {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/upload")
    public ResponseEntity<List<Transaction>> uploadStatement(
            @RequestParam("file") MultipartFile file) {
        try {
            List<Transaction> transactions = statementService.processStatement(file);
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/test-upload")
    public ResponseEntity<String> testUpload(@RequestParam("file") MultipartFile file) {
        try {
            logger.info("Received file: {}", file.getOriginalFilename());
            return ResponseEntity.ok("File received successfully: " + file.getOriginalFilename());
        } catch (Exception e) {
            logger.error("Error receiving file: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }


    
    
    
}