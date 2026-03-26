package com.demo.spring.Exceptions;

public class TicketFoundException extends RuntimeException {
    public TicketFoundException(String message) {

        super(message);
    }
}