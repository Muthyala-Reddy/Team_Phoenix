package com.demo.spring.Exceptions;

public class TicketResourceException extends RuntimeException{
    public TicketResourceException() {
    }

    public TicketResourceException(String message) {
        super(message);
    }
}