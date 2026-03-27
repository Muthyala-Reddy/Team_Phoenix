package com.demo.spring.exceptions;

import com.demo.spring.util.ResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MyExceptionHandler {

    @ExceptionHandler(TicketResourceException.class)
    public ResponseEntity<ResponseMessage> handleTicketException(TicketResourceException e) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ResponseMessage(e.getMessage()));
    }
}