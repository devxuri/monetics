package com.fyp.monetics.backend.exception;

// Custom exception for invalid file uploads
public class InvalidFileException extends Exception {

    // Constructor with a custom error message
    public InvalidFileException(String message) {
        super(message);
    }

    // Constructor with a custom error message and a cause (for chaining exceptions)
    public InvalidFileException(String message, Throwable cause) {
        super(message, cause);
    }
}