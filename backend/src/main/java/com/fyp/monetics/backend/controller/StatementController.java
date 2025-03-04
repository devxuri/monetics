package com.fyp.monetics.backend.controller;

import com.fyp.monetics.backend.exception.InvalidFileException;
import com.fyp.monetics.backend.model.CategorizedTransaction;
import com.fyp.monetics.backend.service.StatementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/statements")
@CrossOrigin(origins = "http://localhost:3000")
public class StatementController {

    @Autowired
    private StatementService statementService;

    @GetMapping("/test")
    public ResponseEntity<Boolean> getTest() {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/upload")
    public ResponseEntity<List<CategorizedTransaction>> uploadStatement(
            @RequestParam("file") MultipartFile file) {
        try {
            List<CategorizedTransaction> transactions = statementService.processStatement(file);
            return ResponseEntity.ok(transactions);
        } catch (InvalidFileException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    
    
    
}