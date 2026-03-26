package com.demo.spring.Exceptions;

public class TicketNotFoundException extends RuntimeException {
    public TicketNotFoundException(String message) {

        super(message);
    }
}