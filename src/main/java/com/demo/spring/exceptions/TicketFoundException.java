package com.demo.spring.exceptions;

public class TicketFoundException extends RuntimeException {
    public TicketFoundException(String message) {

        super(message);
    }
}