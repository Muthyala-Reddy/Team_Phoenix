package com.demo.spring.exceptions;

public class TicketNotFoundException extends RuntimeException {
    public TicketNotFoundException(String message) {

        super(message);
    }
}