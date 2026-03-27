package com.demo.spring.exceptions;

public class TicketResourceException extends RuntimeException{
    public TicketResourceException() {
    }

    public TicketResourceException(String message) {
        super(message);
    }
}