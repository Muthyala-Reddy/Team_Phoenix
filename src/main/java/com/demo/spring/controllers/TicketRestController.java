package com.demo.spring.controllers;

import com.demo.spring.entity.Ticket;
import com.demo.spring.services.TicketService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class TicketRestController {

    private TicketService ticketService;

    public TicketRestController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping(path = "/",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Ticket>> findAllTickets(){
        return ResponseEntity.of(ticketService.getAllTickets());
    }


}
