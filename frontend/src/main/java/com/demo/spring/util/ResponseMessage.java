package com.demo.spring.util;

public class ResponseMessage {

    private String ticketStatus;

    public ResponseMessage() {
    }

    public ResponseMessage(String ticketStatus) {
        this.ticketStatus = ticketStatus;
    }

    public String getTicketStatus() {
        return ticketStatus;
    }

    public void setTicketStatus(String ticketStatus) {
        this.ticketStatus = ticketStatus;
    }
}
